const $  = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];


const form        = $('#feedbackForm');
const submitBtn   = $('#btnSubmit');

const firstName   = $('#firstName');
const lastName    = $('#lastName');
const emailId     = $('#emailId');
const phoneNumber = $('#phoneNumber');
const zipcode     = $('#zipcode');
const comments    = $('#comments');
const address1    = $('#address1');
const address2    = $('#address2');

const titleRadios  = $$('input[name="title"]');
const sourceChecks = $$('input[name="source"]');

const err = {
  title:       $('#error-title'),
  firstName:   $('#error-firstName'),
  lastName:    $('#error-lastName'),
  emailId:     $('#error-emailId'),
  phoneNumber: $('#error-phoneNumber'),
  zipcode:     $('#error-zipcode'),
  address1:    $('#error-address1'),
  address2:    $('#error-address2'),
  source:      $('#error-source'),
  comments:    $('#error-comments'),
  listBox:     $('#error-listBox'),
};

const listBox         = $('#listBox');
const dynamicBox      = $('#dynamicBox');
const dynamicTextSlot = $('#dynamicTextSlot');


const rules = {
  title:       { required: true, group: 'radio' },
  firstName:   { required: true, min: 2, max: 30, pattern: /^[A-Za-z ]+$/,              patternMsg: 'Letters/spaces only' },
  lastName:    { required: true, min: 2, max: 30, pattern: /^[A-Za-z ]+$/,              patternMsg: 'Letters/spaces only' },
  emailId:     { required: true, min: 6, max: 60, pattern: /^[A-Za-z0-9._%+-]+@northeastern\.edu$/i, patternMsg: 'Use your @northeastern.edu email' },
  
  phoneNumber: { required: true, pattern: /^\(\d{3}\) \d{3}-\d{4}$/,                    patternMsg: 'Use (123) 456-7890' },
  zipcode:     { required: true, pattern: /^\d{5}$/,                                   patternMsg: 'Enter 5 digits' },
  source:      { required: true, group: 'checkbox' },
  listBox:     { required: true, single: true },
  comments:    { required: true, min: 15, max: 300 },
  address1:    { required: true, min: 5,  max: 60, pattern: /^[A-Za-z0-9 #.,-]+$/,      patternMsg: 'Letters/digits/ #.,- only' },
  address2:    { required: false,         max: 20, pattern: /^[A-Za-z0-9 #.,-]*$/,      patternMsg: 'Letters/digits/ #.,- only' },
  dynamicText: { required: false, min: 2, max: 40, pattern: /^[A-Za-z0-9 ]+$/,          patternMsg: 'Alphanumeric only' }, 
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
  listBox: false,
  address1: false,
  address2: true,     
  dynamicText: true,  
};

function updateSubmit() {
  const allValid = Object.values(validityMap).every(Boolean);
  submitBtn.disabled = !allValid;
}

function setInvalid(el, key, msg) {
  if (err[key]) err[key].textContent = msg || 'Invalid';
  if (el && el.classList) el.classList.add('invalid');
  validityMap[key] = false;
  updateSubmit();
}

function setValid(el, key) {
  if (err[key]) err[key].textContent = '';
  if (el && el.classList) el.classList.remove('invalid');
  validityMap[key] = true;
  updateSubmit();
}


function getElByKey(key) {
  switch (key) {
    case 'firstName':   return firstName;
    case 'lastName':    return lastName;
    case 'emailId':     return emailId;
    case 'phoneNumber': return phoneNumber;
    case 'zipcode':     return zipcode;
    case 'comments':    return comments;
    case 'address1':    return address1;
    case 'address2':    return address2;
    case 'title':       return titleRadios[0];
    case 'source':      return sourceChecks[0];
    case 'listBox':     return listBox;
    case 'dynamicText': return $('#dynamicTextInput');
    default: return null;
  }
}

function validateField(key) {
  const rule = rules[key];
  if (!rule) return setValid(null, key);

 
  if (rule.group === 'radio') {
    const any = titleRadios.some(r => r.checked);
    return any ? setValid(null, key) : setInvalid(null, key, 'Select a title');
  }
  if (rule.group === 'checkbox') {
    const any = sourceChecks.some(c => c.checked);
    return any ? setValid(null, key) : setInvalid(null, key, 'Select at least one');
  }


  if (rule.single) {
    const ok = !!listBox.value;
    return ok ? setValid(listBox, key) : setInvalid(listBox, key, 'Pick a topic');
  }


  const el = getElByKey(key);
  const v  = (el?.value || '').trim();

  if (rule.required && !v) return setInvalid(el, key, 'Required');
  if (rule.min && v.length < rule.min) return setInvalid(el, key, `Min ${rule.min} chars`);
  if (rule.max && v.length > rule.max) return setInvalid(el, key, `Max ${rule.max} chars`);
  if (rule.pattern && v && !rule.pattern.test(v)) return setInvalid(el, key, rule.patternMsg || 'Invalid');

  return setValid(el, key);
}


function maskPhone(e) {
  const el = e.target;
  let digits = el.value.replace(/\D/g, '').slice(0, 10);
  let out = '';
  if (digits.length <= 3) {
    out = `(${digits}`;
  } else if (digits.length <= 6) {
    out = `(${digits.slice(0,3)}) ${digits.slice(3)}`;
  } else {
    out = `(${digits.slice(0,3)}) ${digits.slice(3,6)}-${digits.slice(6)}`;
  }
  el.value = out;
  validateField('phoneNumber');
}


function wireAddress2Counter() {
  const counter = document.createElement('div');
  counter.className = 'help';
  counter.id = 'address2Counter';
  counter.textContent = `0/${rules.address2.max} characters used`;
  address2.insertAdjacentElement('afterend', counter);
  address2.addEventListener('input', () => {
    const len = address2.value.length;
    counter.textContent = `${len}/${rules.address2.max} characters used`;
    validateField('address2');
  });
}


let dynamicCheckbox = null;
function handleListChange() {
  dynamicBox.innerHTML = '';
  dynamicTextSlot.innerHTML = '';
  validityMap.dynamicText = true;
  rules.dynamicText.required = false;
  validateField('listBox');

  if (!listBox.value) return;

  dynamicCheckbox = document.createElement('label');
  dynamicCheckbox.innerHTML = `
    <input type="checkbox" id="dynamicCheck">
    Add extra details about <strong>${listBox.value}</strong>
  `;
  dynamicBox.appendChild(dynamicCheckbox);

  $('#dynamicCheck').addEventListener('change', (e) => {
    if (e.target.checked) {
      dynamicTextSlot.innerHTML = `
        <label style="margin-left:150px" for="dynamicTextInput">More details*:</label>
        <input id="dynamicTextInput" type="text" placeholder="Enter extra info">
        <span class="error" id="error-dynamicText"></span>
      `;
      rules.dynamicText.required = true;
      validityMap.dynamicText = false;
      $('#dynamicTextInput').addEventListener('input', () => validateField('dynamicText'));
    } else {
      dynamicTextSlot.innerHTML = '';
      rules.dynamicText.required = false;
      validityMap.dynamicText = true;
      validateField('dynamicText');
    }
    updateSubmit();
  });
}


function appendResultsRow(data) {
  let table = $('#results table');
  if (!table) {
    table = document.createElement('table');
    table.innerHTML = `
      <thead><tr>
        <th>Title</th><th>First</th><th>Last</th><th>Email</th><th>Phone</th>
        <th>Zip</th><th>Address1</th><th>Address2</th><th>Topic</th><th>Extra</th><th>Sources</th><th>Comments</th>
      </tr></thead>
      <tbody></tbody>
    `;
    $('#results').appendChild(table);
  }
  const tr = document.createElement('tr');
  tr.innerHTML = `
    <td>${data.title}</td>
    <td>${data.firstName}</td>
    <td>${data.lastName}</td>
    <td>${data.emailId}</td>
    <td>${data.phoneNumber}</td>
    <td>${data.zipcode}</td>
    <td>${data.address1}</td>
    <td>${data.address2}</td>
    <td>${data.listBox}</td>
    <td>${data.dynamicText || ''}</td>
    <td>${data.source.join(', ')}</td>
    <td>${data.comments}</td>
  `;
  table.querySelector('tbody').appendChild(tr);
}


const faqData = [
  { keywords: ['email','northeastern','domain'], answer: 'Use your Northeastern email only (e.g., student@northeastern.edu).' },
  { keywords: ['phone','format','number'],       answer: 'Phone must be in the format (123) 456-7890 while typing.' },
  { keywords: ['zip','zipcode','postal'],        answer: 'Zip code must be exactly 5 digits.' },
  { keywords: ['required','mandatory','fields'], answer: 'All fields are required except Street Address 2.' },
  { keywords: ['address 2','street 2','address2'], answer: 'Street Address 2 is optional. If left blank, it shows blank in the results table.' },
];

const aiBtn   = $('#btnAi');
const aiChat  = $('#aiChat');
const aiClose = $('#btnAiClose');
const aiMsgs  = $('#aiMsgs');
const aiForm  = $('#aiForm');
const aiQ     = $('#aiQ');

function addMsg(text, who='bot') {
  const div = document.createElement('div');
  div.className = `ai-msg ${who}`;
  div.textContent = text;
  aiMsgs.appendChild(div);
  aiMsgs.scrollTop = aiMsgs.scrollHeight;
}
function addBot(text){ addMsg(text, 'bot'); }
function addUser(text){ addMsg(text, 'user'); }

function findAnswer(q) {
  const s = q.toLowerCase();
  for (const item of faqData) {
    if (item.keywords.some(k => s.includes(k))) return item.answer;
  }
  return 'Sorry, I don’t know that yet. Please check the instructions.';
}

function toggleChat(show) {
  if (show) {
    aiChat.hidden = false;
    aiBtn.setAttribute('aria-expanded','true');
    aiQ.focus();
    if (!aiMsgs.dataset.seeded) {
      addBot('Hi! Ask me about email, phone, zip, required fields, or Address 2.');
      aiMsgs.dataset.seeded = '1';
    }
  } else {
    aiChat.hidden = true;
    aiBtn.setAttribute('aria-expanded','false');
  }
}


function wireEvents() {
 
  firstName.addEventListener('input', () => validateField('firstName'));
  lastName.addEventListener('input',  () => validateField('lastName'));
  emailId.addEventListener('input',   () => validateField('emailId'));
  zipcode.addEventListener('input',   () => validateField('zipcode'));
  comments.addEventListener('input',  () => validateField('comments'));
  address1.addEventListener('input',  () => validateField('address1'));
  address2.addEventListener('input',  () => validateField('address2'));
  phoneNumber.addEventListener('input', maskPhone);

  titleRadios.forEach(r => r.addEventListener('change', () => validateField('title')));
  sourceChecks.forEach(c => c.addEventListener('change', () => validateField('source')));
  listBox.addEventListener('change', handleListChange);

  wireAddress2Counter();

  
  Object.keys(validityMap).forEach(validateField);
  
  
  form.addEventListener('submit', (e) => {
    e.preventDefault();

 
    Object.keys(validityMap).forEach(validateField);
    if (Object.values(validityMap).some(v => !v)) return;

    const data = {
      title: (titleRadios.find(r => r.checked)?.value) || '',
      firstName: firstName.value.trim(),
      lastName: lastName.value.trim(),
      emailId: emailId.value.trim(),
      phoneNumber: phoneNumber.value.trim(),
      zipcode: zipcode.value.trim(),
      address1: address1.value.trim(),
      address2: address2.value.trim(),
      listBox: listBox.value,
      dynamicText: ($('#dynamicTextInput')?.value || '').trim(),
      source: sourceChecks.filter(c => c.checked).map(c => c.value),
      comments: comments.value.trim(),
    };

    appendResultsRow(data);

   
    form.reset();
    dynamicBox.innerHTML = '';
    dynamicTextSlot.innerHTML = '';
    rules.dynamicText.required = false;
    validityMap.dynamicText = true;

    
    Object.keys(err).forEach(k => err[k] && (err[k].textContent = ''));
    $$('input, textarea, select').forEach(el => el.classList && el.classList.remove('invalid'));


    Object.keys(validityMap).forEach(k => validityMap[k] = (k === 'address2' || k === 'dynamicText'));
    updateSubmit();

    ['title','source','listBox'].forEach(validateField);
  });

  
  if (aiBtn && aiChat && aiForm && aiQ) {
    aiBtn.addEventListener('click', () => toggleChat(true));
    aiClose.addEventListener('click', () => toggleChat(false));
    aiForm.addEventListener('submit', () => {
      const q = aiQ.value.trim();
      if (!q) return;
      addUser(q);
      addBot(findAnswer(q));
      aiQ.value = '';
      aiQ.focus();
    });
    aiQ.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        aiForm.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
      }
    });
  }
}

document.addEventListener('DOMContentLoaded', wireEvents);
