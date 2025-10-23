# Assignment 6 - Part A: Calculator with User Login

## Description
A two-page web application featuring a secure login system and a fully functional calculator. Users must authenticate with their Northeastern email before accessing the calculator application.

## Features Implemented

### Login Page (login.html)
- Email validation requiring @northeastern.edu domain
- Password validation (minimum 8 characters)
- Real-time validation on keyup and blur events
- "Remember Me" checkbox for persistent login (localStorage vs sessionStorage)
- Disabled login button until both fields pass validation
- Error messages displayed below each field in red
- Clear error messages on focus
- Success animation on login with 1.2-second redirect
- Hardcoded user database for authentication

### Calculator Page (calculator.html)
- Authentication check on page load (redirects to login if not authenticated)
- Welcome message displaying logged-in username
- Two numeric input fields
- Four operation buttons: Add, Subtract, Multiply, Divide
- Single arrow function handling all four operations
- Input validation for numeric values (supports decimals and negative numbers)
- Error message display below input fields
- Read-only result field
- jQuery chaining for UI updates
- Logout functionality with fadeOut animation

## Technologies Used
- **HTML5** - Semantic markup with modern input types
- **CSS3** - Responsive design, Flexbox, Grid layout, professional styling
- **JavaScript ES6+** - Arrow functions, template literals, const/let
- **jQuery 3.7.1** - DOM manipulation, event handling, animations, validation
- **sessionStorage/localStorage** - Session management

## How to Run

1. **Files Required:**
   - `login.html` - Login page
   - `calculator.html` - Calculator page
   - `script.js` - JavaScript logic (shared by both pages)
   - `style.css` - Styling (shared by both pages)

2. **Place all files in the same directory**

3. **Open `login.html` in your web browser**

4. **Test Credentials:**
   - Email: `student@northeastern.edu` | Password: `password123`
   - Email: `john.doe@northeastern.edu` | Password: `securepass456`
   - Email: `jane.smith@northeastern.edu` | Password: `mypassword789`
   - Email: `demo@northeastern.edu` | Password: `demo1234567`

5. **Test Features:**
   - Try invalid email format (won't pass validation)
   - Try password less than 8 characters (won't pass validation)
   - Check "Remember me" and reload to test persistent login
   - Use calculator with valid numbers (decimals and negatives supported)
   - Try dividing by zero to see error handling
   - Click logout to clear session

## Code Structure

### Validation Logic
- `validateEmail()` - Ensures @northeastern.edu format
- `validatePassword()` - Checks minimum 8 characters
- `getNumber()` - Validates numeric input
- Real-time validation prevents invalid submissions

### Calculator Logic
- Single arrow function: `const calculate = (a, b, op) => { ... }`
- Handles: add, subtract, multiply, divide operations
- Edge case: Division by zero returns error message

### Session Management
- Stores: username, email, login timestamp, isLoggedIn flag
- Uses sessionStorage by default
- Uses localStorage if "Remember me" is checked
- Automatic redirect if session expires

### jQuery Features
- Event handlers: `.on('keyup blur', ...)`
- DOM manipulation: `.val()`, `.text()`, `.prop()`
- Animations: `.fadeIn()`, `.fadeOut()`
- Chaining: `.val().css().fadeIn()`
- Array methods: `.find()`, `.filter()`

## Bonus Features Implemented
- ✓ Multiple hardcoded users (4 test accounts)
- ✓ Password strength indication
- ✓ Clear visual feedback on validation
- ✓ Edge case handling (division by zero)
- ✓ Session persistence with "Remember Me"
- ✓ Professional, responsive design
- ✓ Smooth animations and transitions

## Browser Compatibility
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (responsive design)

## Notes
- The calculator supports decimal numbers and negative numbers
- The login timeout before redirect is 1.2 seconds
- Session data is cleared on logout
- Email validation is case-insensitive for domain matching
- Password validation is case-sensitive
