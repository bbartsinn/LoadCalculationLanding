"""Check static pages, local links, metadata and sitemap with Python's standard library."""
from collections import Counter
from html.parser import HTMLParser
import json
from pathlib import Path
from urllib.parse import unquote, urlsplit
import xml.etree.ElementTree as ET

ROOT = Path(__file__).resolve().parents[1]
SITE = "https://realworldelectric.com"


class Page(HTMLParser):
    def __init__(self, path):
        super().__init__(convert_charrefs=True)
        self.path = path
        self.ids, self.refs = [], []
        self.headings, self.titles, self.canonicals, self.descriptions = 0, 0, [], []
        self.structured_data = []
        self.json_buffer = None
        self.feed(path.read_text(encoding="utf-8-sig"))

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if "id" in attrs:
            self.ids.append(attrs["id"])
        self.headings += tag == "h1"
        self.titles += tag == "title"
        self.refs.extend(attrs[key] for key in ("href", "src") if attrs.get(key))
        if tag == "link" and attrs.get("rel") == "canonical":
            self.canonicals.append(attrs.get("href"))
        if tag == "meta" and attrs.get("name") == "description":
            self.descriptions.append(attrs.get("content", ""))
        if tag == "script" and attrs.get("type") == "application/ld+json":
            self.json_buffer = ""

    def handle_data(self, data):
        if self.json_buffer is not None:
            self.json_buffer += data

    def handle_endtag(self, tag):
        if tag == "script" and self.json_buffer is not None:
            self.structured_data.append(json.loads(self.json_buffer))
            self.json_buffer = None


def route(path):
    return "/" + path.relative_to(ROOT).as_posix().removesuffix("index.html")


def main():
    # Public pages use directory index files; the legacy OG image authoring
    # utility is not a public content page or sitemap entry.
    pages = {path.resolve(): Page(path) for path in ROOT.rglob("index.html")}
    errors, checked, incoming = [], 0, Counter()
    for path, page in pages.items():
        label = path.relative_to(ROOT).as_posix()
        if page.headings != 1 or page.titles != 1:
            errors.append(f"{label}: expected one H1 and one title")
        if page.canonicals != [SITE + route(path)]:
            errors.append(f"{label}: canonical does not match its route")
        if len(page.descriptions) != 1 or not page.descriptions[0].strip():
            errors.append(f"{label}: missing description")
        if len(set(page.ids)) != len(page.ids):
            errors.append(f"{label}: duplicate IDs")
        for ref in page.refs:
            url = urlsplit(ref)
            if url.scheme and url.scheme not in ("http", "https"):
                continue
            if url.netloc and url.hostname not in ("realworldelectric.com", "www.realworldelectric.com"):
                continue
            target = (ROOT / unquote(url.path).lstrip("/")) if url.path.startswith("/") else (path.parent / unquote(url.path))
            if not url.path:
                target = path
            if target.is_dir():
                target /= "index.html"
            target = target.resolve()
            checked += 1
            if not target.is_relative_to(ROOT) or not target.is_file():
                errors.append(f"{label}: missing local target {ref}")
            elif url.fragment and target in pages and unquote(url.fragment) not in pages[target].ids:
                errors.append(f"{label}: missing anchor {ref}")
            elif target in pages and target != path:
                incoming[route(target)] += 1

    xml = ET.parse(ROOT / "sitemap.xml")
    locations = [element.text for element in xml.findall(".//{*}loc")]
    expected = {SITE + route(path) for path in pages}
    if len(locations) != len(set(locations)) or set(locations) != expected:
        errors.append("sitemap.xml: URLs do not match the HTML pages")
    for path in pages:
        if path != ROOT / "index.html" and not incoming[route(path)]:
            errors.append(f"{route(path)}: no incoming local links")

    print(json.dumps({"pages": len(pages), "local_references_checked": checked,
                      "incoming_links": dict(incoming), "errors": errors}, indent=2))
    raise SystemExit(bool(errors))


if __name__ == "__main__":
    main()
