(() => {
  'use strict';
  const form = document.querySelector('#sld-request-form');
  const status = document.querySelector('#request-status');
  const draft = document.querySelector('#request-draft');
  const draftText = document.querySelector('#draft-text');
  const emailLink = document.querySelector('#open-email-draft');
  const stepTitle = document.querySelector('#request-step-title');
  const instructions = document.querySelector('#request-instructions');
  const email = 'Bart@Realworldelectric.com';
  const project = form.elements.projectType;
  const distribution = document.querySelector('#distribution-details');
  const solar = document.querySelector('#solar-details');

  function announce(message, error = false) {
    status.textContent = message;
    status.classList.toggle('error', error);
  }

  function refreshProjectFields() {
    distribution.hidden = project.value !== 'Customer-owned distribution / subdivision';
    solar.hidden = project.value !== 'Solar / battery';
    for (const group of [distribution, solar]) {
      group.querySelectorAll('input, select, textarea').forEach(field => {
        field.disabled = group.hidden;
      });
    }
  }

  function invalidateDraft() {
    form.hidden = false;
    draft.hidden = true;
    draftText.value = '';
    emailLink.removeAttribute('href');
    stepTitle.textContent = 'Request a diagram';
    instructions.hidden = false;
    announce('');
  }

  document.querySelector('#edit-request').addEventListener('click', () => {
    invalidateDraft();
    stepTitle.focus();
  });

  form.addEventListener('input', event => {
    if (typeof event.target.setCustomValidity === 'function') event.target.setCustomValidity('');
    invalidateDraft();
  });
  form.addEventListener('change', () => {
    refreshProjectFields();
    invalidateDraft();
  });

  form.addEventListener('submit', event => {
    event.preventDefault();
    for (const field of form.querySelectorAll('[required]')) {
      field.setCustomValidity(field.value.trim() ? '' : 'Please complete this field.');
    }
    if (!form.checkValidity()) {
      invalidateDraft();
      announce('Please complete the required fields and enter a valid email address.', true);
      form.reportValidity();
      return;
    }

    const fields = new FormData(form);
    const value = name => String(fields.get(name) || '').trim();
    const lines = [
      'Single-line diagram request',
      '',
      `Name: ${value('name')}`,
      `Reply email: ${value('email')}`,
      `Project: ${value('projectType')}`,
      `Address / municipality: ${value('location')}`,
      `Utility: ${value('utility')}`,
      '',
      'Project description and drawing request:',
      value('description'),
    ];
    for (const [name, label] of [
      ['phone', 'Phone'],
      ['requestedBy', 'Drawing requested by'],
      ['distributionScope', 'Drawing scope'],
      ['lots', 'Lots / buildings / meters'],
      ['generation', 'Solar / inverter / storage details'],
      ['electricalDetails', 'Voltage / phase / service amps'],
      ['utilityReference', 'Utility or permit reference'],
      ['documents', 'Existing drawings / site plan / load calculation'],
      ['desiredDate', 'Requested date'],
    ]) {
      if (value(name)) lines.push(`${label}: ${value(name)}`);
    }
    lines.push('', 'Please confirm scope, fee and timing before starting.');
    const text = lines.join('\n');
    draftText.value = text;
    emailLink.href = `mailto:${email}?subject=${encodeURIComponent('Single-line diagram request: ' + value('projectType'))}&body=${encodeURIComponent(text)}`;
    form.hidden = true;
    instructions.hidden = true;
    stepTitle.textContent = 'Review your request';
    draft.hidden = false;
    announce('Draft ready. Your request has not been sent.');
    stepTitle.focus();
  });

  document.querySelector('#copy-request').addEventListener('click', async () => {
    const copiedText = draftText.value;
    try {
      if (!navigator.clipboard?.writeText) throw new Error('Clipboard unavailable');
      await navigator.clipboard.writeText(copiedText);
      if (draft.hidden || draftText.value !== copiedText) return;
      announce(`Copied. Email it to ${email}. Nothing has been sent.`);
    } catch {
      if (draft.hidden || draftText.value !== copiedText) return;
      announce('Copy was unavailable. Select the request below and copy it manually, then email it to Bart@Realworldelectric.com.', true);
      draftText.focus();
      draftText.select();
    }
  });

  refreshProjectFields();
  form.hidden = false;
})();
