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