# Assignment 4 – Dynamic Form Validation & Data Management

##  Objective  
The goal of this assignment is to create a **dynamic form-based web application** that demonstrates advanced DOM manipulation, real-time validation, conditional UI rendering, and user interaction handling with **HTML, CSS, and JavaScript**.  

This project showcases my ability to:  
- Validate form inputs on the fly (not just on submit).  
- Use regex for email, phone, and zip code formats.  
- Dynamically update the DOM (adding/removing elements, creating a results table).  
- Implement input masking, live character counters, and error highlighting.  
- Build a small AI-style helper chatbot with pre-defined FAQs.  

---

##  Features Implemented

### 1. Form Initialization
- **Full validation rules applied** before enabling the Submit button.  
- Submit button is disabled and gray until all validations are passed.  
- Uses **`Form.html`** as the base file.  

### 2. Field Validations
- **Not null, min length, max length** checks for all fields.  
- Alphanumeric fields reject special characters.  
- **Regex validation**:  
  - Phone → must match `(XXX) XXX-XXXX` format.  
  - Email → must end with `@northeastern.edu`.  
  - Zip code → must be exactly 5 digits.  
- Validation is triggered on **key events** (live as the user types), not only on submit.  

### 3. Input Masking
- Phone number input is masked dynamically:  
  - As the user types numbers, the format `(XXX) XXX-XXXX` is applied automatically.  

### 4. Dynamic Error Highlighting
- Invalid fields display **red error text** immediately.  
- Errors disappear automatically when the field is corrected.  

### 5. Street Address 2 + Character Counter
- Address 2 field is **optional**.  
- Includes a **live character counter** (e.g., `15/20 characters used`).  
- Counter updates on each keystroke.  

### 6. List Box + Dynamic Checkbox
- A **single-select list box** with 5 elements is provided.  
- On change:  
  - A dynamic checkbox appears below the list.  
  - If the checkbox is enabled, a **mandatory text field** appears.  
  - If unchecked, the text field disappears.  

### 7. AI Assistant (Form Helper)
- **AI Assistant button** is placed above the form.  
- Opens a simple chat window with:  
  - Message display area  
  - Input box + send button (Enter key supported)  
- **Pre-defined FAQ support** (at least 5 questions):  
  1. *What email can I use?* → Must be a Northeastern email.  
  2. *What format should the phone number be?* → `(XXX) XXX-XXXX`.  
  3. *How many digits in the zip code?* → Exactly 5 digits.  
  4. *Which fields are required?* → All fields except Address 2.  
  5. *Is Street Address 2 mandatory?* → No, optional.  
- Chatbot looks for **keywords** like "email", "phone", "zip", "required", "address".  
- If no match is found, returns: *“Sorry, I don’t know that yet. Please check the instructions.”*  
- Chat history remains visible until the user closes the chat window.  

### 8. Submit Behavior
- On submit:  
  - A new **HTML table** is generated below the form.  
  - Captures all current form data **and preserves previously submitted entries**.  
  - Clears all form fields after submission.  
  - If Address 2 was blank, it shows as blank in the table.  

---

##  Tech Stack
- **HTML5** → Structure of form and table.  
- **CSS3** → Styling, error messages, button states, chat window design.  
- **JavaScript (ES6)** →  
  - Real-time validations and regex checks.  
  - Input masking for phone numbers.  
  - Dynamic error rendering and character counter.  
  - DOM manipulation for adding/removing elements.  
  - FAQ chatbot functionality.  

---

##  Project Structure
├── index.html # Main form and chatbot structure
├── styles.css # Form styling, error highlighting, chatbot UI
├── script.js # Validation, DOM logic, table creation, chatbot logic
└── assets/ # (Optional) icons or supporting files

##  How to Run
1. Clone or download the repository.  
2. Open `index.html` in a modern browser.  
3. Interact with the form:  
   - Try invalid inputs and see real-time error feedback.  
   - Watch phone number auto-format with masking.  
   - Use the list box → enable checkbox → enter text → disable to hide it.  
   - Submit multiple times and see cumulative results in the table.  
   - Use the **AI Assistant** button to ask form-related questions.  

---

##  Example Workflow
1. Page loads → Submit button disabled.  
2. Enter invalid email → red error shown immediately.  
3. Correct email to `abc@northeastern.edu` → error disappears.  
4. Enter phone → auto-formats as `(123) 456-7890`.  
5. Use Address 2 → live character counter updates.  
6. Choose a list item → checkbox + text field appear dynamically.  
7. Submit form → New entry added to results table, form cleared.  
8. Open AI Assistant → Ask “What email can I use?” → chatbot responds with rules.  

---

##  Credits
- Assignment requirements provided by Northeastern University (IS course).  
- Chatbot inspiration adapted from FAQ keyword matching examples.  
