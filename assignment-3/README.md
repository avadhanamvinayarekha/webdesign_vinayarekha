# Assignment 3 – Student Management Web Application  

## Objective  
The purpose of this assignment is to build a dynamic data management web page using HTML, CSS, and JavaScript.  
This project demonstrates DOM manipulation, event handling, conditional styling, and real-time feedback through a responsive student records table.  

---

## Features Implemented  

1. **Student Info Display**  
   - On page load, my **Full Name (Avadhanam Vinaya Rekha)** and **NUID (002341102)** are displayed on the screen.  

2. **Initial Page State**  
   - Table rows are collapsed by default.  
   - The **Submit button** is disabled, gray, and not clickable until at least one row is selected.  

3. **Table Structure**  
   - Includes `<thead>`, `<tbody>`, `<th>`, `<tr>`, `<td>`.  
   - Each row contains: View, Select, Student, Grade, Subject, Teacher, Delete, and Edit columns.  

4. **Add New Student**  
   - Clicking **Add New Student** creates a new row with dummy values:  
     - Example: *Student 4, Teacher 4* for the 4th row.  
   - The numbering is always sequential.  
     - If *Student 5* is deleted and a new one is added, the new row will still be *Student 5*, not *Student 6*.  
   - After adding, a popup message confirms:  
     - *“Student X Record added successfully”*.  

5. **Row Selection**  
   - Selecting a checkbox:  
     - Row background changes to **yellow**.  
     - **Submit button** turns **orange** and is enabled.  
     - **Delete** and **Edit** buttons appear dynamically.  
   - Deselecting a checkbox:  
     - Background returns to white.  
     - Buttons disappear.  
     - If no rows are selected, Submit becomes disabled again.  

6. **Delete Functionality**  
   - Clicking **Delete** removes both the data row and its details row.  
   - Table renumbers itself to keep records in order.  
   - Popup confirms: *“Student X Record deleted successfully”*.  

7. **Edit Functionality**  
   - Clicking **Edit** opens a prompt:  
     - Title: *“Edit details of Student X”*  
     - Includes a textbox and **OK/Cancel** buttons.  
     - On OK with input → shows *“Student X data updated successfully”*.  
     - On Cancel → closes without changes.  

8. **Expandable Rows**  
   - Each row has a green arrow (from Flaticon).  
   - Clicking the arrow expands or collapses a details row with NU ID, attendance, and remarks.  
   - Arrow rotates when expanded for better UX.  

9. **Submit Button Logic**  
   - Disabled by default.  
   - Enabled only when at least one checkbox is selected.  
   - Disabled again if none are selected.  

---

## Tech Stack  

- **HTML5** → Page structure and semantic table.  
- **CSS3** → Styling of table, buttons, and conditional states.  
- **JavaScript (ES6)** → Handles DOM manipulation, row creation, expansion, deletion, editing, and event listeners.  

---

##  Project Files  

├── index.html # Main HTML file
├── styles.css # CSS styling
├── script.js # JavaScript functionality
└── assets/
└── arrow-green.png # Expand/collapse icon


---

##  How to Run  

1. Clone or download the repository.  
2. Open `index.html` in any modern browser.  
3. Try the following:  
   - Add a new student.  
   - Expand a student row with the green arrow.  
   - Select and deselect rows to enable/disable actions.  
   - Use Delete and Edit buttons for dynamic updates.  

---

##  Credits  

- Arrow icon: [Flaticon](https://www.flaticon.com/) by *hqrloveq*.  

