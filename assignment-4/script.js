
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
    address1:    $('#error-address1'),
  address2:    $('#error-address2'),
  source:      $('#error-source'),
  comments:    $('#error-comments'),
  listBox: $('#error-listBox')
};
const listBox = $('#listBox');
const dynamicBox = $('#dynamicBox');
const dynamicTextSlot = $('#dynamicTextSlot');

const rules = {
  title:     { required: true, group: 'radio' },
  firstName: { required: true, min: 2, max: 30, pattern: /^[A-Za-z ]+$/, patternMsg: 'Letters/spaces only' },
  lastName:  { required: true, min: 2, max: 30, pattern: /^[A-Za-z ]+$/, patternMsg: 'Letters/spaces only' },
  emailId:   { required: true, min: 6, max: 60, pattern: /^[^\s@]+@northeastern\.edu$/i,patternMsg: 'Use your Northeastern email'},
  phoneNumber: { required: true, pattern: /^\d{3}-\d{3}-\d{4}$/, patternMsg: 'Use xxx-xxx-xxxx' },
  zipcode:     { required: true, pattern: /^\d{5}$/, patternMsg: 'Enter 5 digits' },
  source:    { required: true, group: 'checkbox' },
  listBox: { required: true, single: true },
  comments:  { required: true, min: 15, max: 300 },
  address1:    { required: true, min: 5, max: 60, pattern: /^[A-Za-z0-9 #.,-]+$/, patternMsg: 'Letters/digits/ #.,- only' },
  address2:    { required: false, max: 20, pattern: /^[A-Za-z0-9 #.,-]*$/, patternMsg: 'Letters/digits/ #.,- only' },
  dynamicText: { required: false, min: 2, max: 40, pattern: /^[A-Za-z0-9 ]+$/, patternMsg: 'Alphanumeric only' }, 
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

function updateSubmit() {
  const allValid = Object.values(validityMap).every(Boolean);
  submitBtn.disabled = !allValid;
}


function validateField(key) {
  const r = rules[key];


  if ( r && r.group === 'radio') {
    const any = titleRadios.some(x => x.checked);
    return any ? setValid(null, key) : setInvalid(null, key, 'Please choose a title');
  
  }
  if (r && r.group === 'checkbox') {
    const count = sourceChecks.filter(c => c.checked).length;
    return (count >= 1) ? setValid(null, key) : setInvalid(null, key, 'Select at least one option');
  }

   const el  = getElementByKey(key);
  const val = (el && el.value != null) ? el.value.trim() : '';

  
  if (r && r.required && val.length === 0) {
    return setInvalid(el, key, 'This field is required');
  }

   if (r && !r.required && val.length === 0) {
    return setValid(el, key);
  }

  if (r.min != null && val.length < r.min) {
    return setInvalid(el, key, `Min ${r.min} characters`);
  }


  if (r.max != null && val.length > r.max) {
    return setInvalid(el, key, `Max ${r.max} characters`);
  }

 if (r.single && !val) return setInvalid(el, key, 'Please select an option');


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
    case 'listBox': return listBox;
    case 'address1':    return address1;
    case 'address2':    return address2;
    case 'dynamicText': return $('#dynamicTextInput'); 
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

let dynamicCheckbox = null;

function onListChange() {
  
  validateField('listBox');

  const selected = listBox.value;
 
  dynamicBox.innerHTML = '';

  if (!selected) return; 

 
  const label = document.createElement('label');
  label.style.display = 'inline-block';
  label.style.marginTop = '6px';
  label.innerHTML = `
    <input type="checkbox" id="dynToggle">
    Enable extra option for: <strong id="dynChoice"></strong>
  `;
  dynamicBox.appendChild(label);
  $('#dynChoice').textContent = selected;

 $('#dynToggle').addEventListener('change', (e) => {
    dynamicTextSlot.innerHTML = '';
    if (e.target.checked) {
      const wrap = document.createElement('div');
      wrap.innerHTML = `
        <input type="text" id="dynamicTextInput" placeholder="Type extra details" maxlength="40" />
        <span class="error" id="error-dynamicText"></span>
      `;
      dynamicTextSlot.appendChild(wrap);
      rules.dynamicText.required = true;
      validityMap.dynamicText = false; 
      const dyn = $('#dynamicTextInput');
      dyn.addEventListener('input', () => validateField('dynamicText'));
      validateField('dynamicText');
    } else {
      rules.dynamicText.required = false;
      validityMap.dynamicText = true;    
      updateSubmit();
    }
  });

}

const results     = $('#results');
let   tableBuilt  = false;

function appendResultRow(data) {
  if (!tableBuilt) {
    const tbl = document.createElement('table');
    tbl.id = 'resultsTable';
    tbl.innerHTML = `
      <thead>
        <tr>
          <th>Title</th><th>First</th><th>Last</th><th>Email</th><th>Phone</th>
          <th>Zip</th><th>Addr1</th><th>Addr2</th>
          <th>Heard</th><th>Topic</th><th>Extra</th><th>Comments</th>
        </tr>
      </thead>
      <tbody></tbody>
    `;
    results.appendChild(tbl);
    tableBuilt = true;
  }
  const tbody = $('#resultsTable tbody');
  const tr = document.createElement('tr');
  tr.innerHTML = `
    <td>${data.title}</td>
    <td>${data.firstName}</td>
    <td>${data.lastName}</td>
    <td>${data.emailId}</td>
    <td>${data.phoneNumber}</td>
    <td>${data.zipcode}</td>
    <td>${data.address1}</td>
    <td>${data.address2 || ''}</td>
    <td>${data.source.join(', ')}</td>
    <td>${data.listBox}</td>
    <td>${data.dynamicText || ''}</td>
    <td>${data.comments}</td>
  `;
  tbody.appendChild(tr);
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


  if (listBox) {
    listBox.addEventListener('change', onListChange);
    validateField('listBox');
  }
  
  Object.keys(validityMap).forEach(validateField);

  
  form.addEventListener('submit', (e) => {
    e.preventDefault();

   
    Object.keys(validityMap).forEach(validateField);
    if (Object.values(validityMap).some(v => !v)) return;


    alert('Form submitted successfully!');
    form.reset();
      dynamicBox.innerHTML = '';
    dynamicTextSlot.innerHTML = '';
    rules.dynamicText.required = false;
    validityMap.dynamicText = true;

  
    Object.keys(err).forEach(k => err[k] && (err[k].textContent = ''));
    $$('input, textarea,select').forEach(el => el.classList && el.classList.remove('invalid'));

    Object.keys(validityMap).forEach(k => validityMap[k] = (k === 'address2' || k === 'dynamicText'));
    updateSubmit();
    ['title','source','listBox'].forEach(validateField);
  });

  
  const resetBtn = $('#btnReset');
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      dynamicBox.innerHTML = '';
      dynamicTextSlot.innerHTML = '';
      rules.dynamicText.required = false;
      validityMap.dynamicText = true;

      Object.keys(err).forEach(k => err[k] && (err[k].textContent = ''));
      $$('input, textarea, select').forEach(el => el.classList && el.classList.remove('invalid'));
      Object.keys(validityMap).forEach(k => validityMap[k] = (k === 'address2' || k === 'dynamicText'));
      updateSubmit();
    });
  }
}

document.addEventListener('DOMContentLoaded', wireEvents);



