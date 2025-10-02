
const $  = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

const form = $('#feedbackForm');
const submitBtn = $('#btnSubmit');


const firstName   = $('#firstName');
const lastName    = $('#lastName');
const emailId     = $('#emailId');
const phoneNumber = $('#phoneNumber');
const zipcode     = $('#zipcode');
const comments    = $('#comments');


const titleRadios = $$('input[name="title"]');
const sourceChecks= $$('input[name="source"]');


const err = {
  title:       $('#error-title'),
  firstName:   $('#error-firstName'),
  lastName:    $('#error-lastName'),
  emailId:     $('#error-emailId'),
  phoneNumber: $('#error-phoneNumber'),
  zipcode:     $('#error-zipcode'),
  source:      $('#error-source'),
  comments:    $('#error-comments'),
};


const rules = {
  title:     { required: true, group: 'radio' },
  firstName: { required: true, min: 2, max: 30, pattern: /^[A-Za-z ]+$/, patternMsg: 'Letters/spaces only' },
  lastName:  { required: true, min: 2, max: 30, pattern: /^[A-Za-z ]+$/, patternMsg: 'Letters/spaces only' },
  emailId:   { required: true, min: 6, max: 60, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, patternMsg: 'Enter a valid email' },
  phoneNumber: { required: true, pattern: /^\d{3}-\d{3}-\d{4}$/, patternMsg: 'Use xxx-xxx-xxxx' },
  zipcode:     { required: true, pattern: /^\d{6}$/, patternMsg: 'Enter 6 digits' },
  source:    { required: true, group: 'checkbox' },
  comments:  { required: true, min: 15, max: 300 },
};


const validityMap = {
  title: false,
  firstName: false,
  lastName: false,
  emailId: false,
  phoneNumber: false,
  zipcode: false,
  source: false,
  comments: false,
};


function setInvalid(inputOrGroupEl, key, message) {
  err[key].textContent = message || 'Invalid';
  if (inputOrGroupEl && inputOrGroupEl.classList) inputOrGroupEl.classList.add('invalid');
  validityMap[key] = false;
  updateSubmit();
}

function setValid(inputOrGroupEl, key) {
  err[key].textContent = '';
  if (inputOrGroupEl && inputOrGroupEl.classList) inputOrGroupEl.classList.remove('invalid');
  validityMap[key] = true;
  updateSubmit();
}

function updateSubmit() {
  const allValid = Object.values(validityMap).every(Boolean);
  submitBtn.disabled = !allValid;
}


function validateField(key) {
  const r = rules[key];


  if (r.group === 'radio') {
    const anyChecked = titleRadios.some(r => r.checked);
    if (!anyChecked && r.required) return setInvalid(null, key, 'Please choose a title');
    return setValid(null, key);
  }
  if (r.group === 'checkbox') {
    const count = sourceChecks.filter(c => c.checked).length;
    if (count < 1 && r.required) return setInvalid(null, key, 'Select at least one option');
    return setValid(null, key);
  }


  const el = getElementByKey(key);
  let val = (el.value || '').trim();


  if (r.required && val.length === 0) {
    return setInvalid(el, key, 'This field is required');
  }


  if (r.min != null && val.length < r.min) {
    return setInvalid(el, key, `Min ${r.min} characters`);
  }


  if (r.max != null && val.length > r.max) {
    return setInvalid(el, key, `Max ${r.max} characters`);
  }


  if (r.pattern && !r.pattern.test(val)) {
    return setInvalid(el, key, r.patternMsg || 'Invalid format');
  }

  return setValid(el, key);
}

function getElementByKey(key) {
  switch (key) {
    case 'firstName': return firstName;
    case 'lastName': return lastName;
    case 'emailId': return emailId;
    case 'phoneNumber': return phoneNumber;
    case 'zipcode': return zipcode;
    case 'comments': return comments;
    default: return null;
  }
}


function maskPhone(e) {
  const el = e.target;
 
  let digits = el.value.replace(/\D/g, '').slice(0, 10);
  let out = '';
  if (digits.length <= 3) {
    out = digits;
  } else if (digits.length <= 6) {
    out = digits.slice(0,3) + '-' + digits.slice(3);
  } else {
    out = digits.slice(0,3) + '-' + digits.slice(3,6) + '-' + digits.slice(6);
  }
  el.value = out;
  validateField('phoneNumber'); 
}


function wireEvents() {
 
  firstName.addEventListener('input', () => validateField('firstName'));
  lastName.addEventListener('input',  () => validateField('lastName'));
  emailId.addEventListener('input',   () => validateField('emailId'));
  zipcode.addEventListener('input',   () => validateField('zipcode'));
  comments.addEventListener('input',  () => validateField('comments'));

  
  phoneNumber.addEventListener('input', maskPhone);

 
  titleRadios.forEach(r => r.addEventListener('change', () => validateField('title')));


  sourceChecks.forEach(c => c.addEventListener('change', () => validateField('source')));

  
  Object.keys(validityMap).forEach(validateField);

  
  form.addEventListener('submit', (e) => {
    e.preventDefault();

   
    Object.keys(validityMap).forEach(validateField);
    const ok = Object.values(validityMap).every(Boolean);
    if (!ok) return;

    alert('Form submitted successfully!');
    form.reset();

  
    Object.keys(err).forEach(k => err[k].textContent = '');
    $$('input, textarea').forEach(el => el.classList && el.classList.remove('invalid'));

    Object.keys(validityMap).forEach(k => validityMap[k] = false);
    updateSubmit();
  });

  
  $('#btnReset').addEventListener('click', () => {
    Object.keys(err).forEach(k => err[k].textContent = '');
    $$('input, textarea').forEach(el => el.classList && el.classList.remove('invalid'));
    Object.keys(validityMap).forEach(k => validityMap[k] = false);
    updateSubmit();
  });
}

document.addEventListener('DOMContentLoaded', wireEvents);
