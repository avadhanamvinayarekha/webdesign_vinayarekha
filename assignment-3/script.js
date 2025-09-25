document.addEventListener('DOMContentLoaded', function() {

    const name =" Avadhanam Vinaya Rekha";
    const nuid ="002341102";

   const info = document.getElementById('studentInfo');
   info.textContent = `Name: ${name} | NUID: ${nuid}`;

    const submitBtn = document.getElementById("submitBtn");
    submitBtn.disabled = true;
});


function toggleDetails(btn) {

  const detailsId = btn.dataset.target;
  const detailsRow = document.getElementById(detailsId);

  const isOpen = btn.classList.toggle('is-open');
 btn.dataset.expanded= String(isOpen);


detailsRow.classList.toggle('is-hidden', !isOpen);
}

document.querySelectorAll('.arrow').forEach(btn => {
  btn.addEventListener('click', () => toggleDetails(btn));
});

function getAllStudentNumbers() {
  const nums = [];
  document.querySelectorAll('#studentTable tbody tr').forEach(tr => {
    if (tr.classList.contains('details')) return; 
    const studentCell = tr.children[1]; 
    if (!studentCell) return;
    const n = Number(studentCell.textContent.match(/\d+/)?.[0] ?? 0);
    if (n > 0) nums.push(n);
  });
  return nums;
}

function smallestMissingPositive(nums) {
 
  const set = new Set(nums);
  let n = 1;
  while (set.has(n)) n++;
  return n;
}


function createStudentRow(n) {
  const tbody = document.querySelector('#studentTable tbody');


  const tr = document.createElement('tr');

  const tdView = document.createElement('td');
  tdView.className = 'arrow-cell';
  const btn = document.createElement('button');
  btn.className = 'arrow';
  btn.dataset.target = `details-${n}`;
  btn.dataset.expanded = 'false';
  btn.title = 'View more';
  const img = document.createElement('img');
  img.className = 'arrow-icon';
  img.src = 'assets/arrow-green.png';
  img.alt = 'Expand row';
  btn.appendChild(img);
  tdView.appendChild(btn);

 
  const tdStudent = document.createElement('td'); tdStudent.textContent = `Student ${n}`;
  const tdGrade   = document.createElement('td'); tdGrade.textContent   = 'A';
  const tdSubject = document.createElement('td'); tdSubject.textContent = 'Math';
  const tdTeacher = document.createElement('td'); tdTeacher.textContent = `Teacher ${n}`;


  const tdDelete = document.createElement('td'); tdDelete.className = 'cell-delete';
  const tdEdit   = document.createElement('td'); tdEdit.className   = 'cell-edit';


  tr.appendChild(tdView);
  tr.appendChild(tdStudent);
  tr.appendChild(tdGrade);
  tr.appendChild(tdSubject);
  tr.appendChild(tdTeacher);
  tr.appendChild(tdDelete);
  tr.appendChild(tdEdit);

  
  const details = document.createElement('tr');
  details.id = `details-${n}`;
  details.className = 'details is-hidden';
  const detailsTd = document.createElement('td');
  detailsTd.colSpan = 7;
  detailsTd.innerHTML = `
    <div class="details-box">
      <h4>Student ${n} — details</h4>
      <ul>
        <li>NU ID: 0123456789</li>
        <li>Attendance: 98%</li>
        <li>Remarks: Excellent performance</li>
      </ul>
    </div>`;
  details.appendChild(detailsTd);

  
  tbody.appendChild(tr);
  tbody.appendChild(details);

  
  btn.addEventListener('click', () => toggleDetails(btn));
}

function addStudent() {
  try {
    const nums = getAllStudentNumbers();
    const n = smallestMissingPositive(nums); 
    createStudentRow(n);
    alert(`Student ${n} Record added successfully.`);
  } catch (e) {
    alert('Error: Record addition failed.');
    console.error(e);
  }
}


document.addEventListener('DOMContentLoaded', function () {
  const addBtn = document.getElementById('addStudentBtn');
  if (addBtn) addBtn.addEventListener('click', addStudent);
});
