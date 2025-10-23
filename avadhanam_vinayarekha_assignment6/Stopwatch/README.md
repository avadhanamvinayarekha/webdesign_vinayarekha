# Assignment 6 - Part B: Event Stopwatch with Session Logging

## Description
A single-page event stopwatch application that allows users to time activities, associate them with dates, and maintain a persistent history stored in localStorage. Perfect for tracking workouts, study sessions, and other timed events.

## Features Implemented

### Timer Display
- Large, prominent timer display (56px font size)
- HH:MM:SS format starting at 00:00:00
- Read-only display that updates every second when running
- Accurate time tracking with fmt() helper function

### Event Details Section
- HTML5 date picker defaulting to today's date
- Event name text input with placeholder "e.g. Workout"
- Both fields are disabled while timer is running
- Both fields required before starting timer

### Control Buttons
- **Start**: Begins stopwatch (requires valid date and event name)
- **Pause/Resume**: Pauses or resumes timer (button text changes dynamically)
- **Stop & Save**: Stops timer and saves session to localStorage
- **Reset**: Clears timer to 00:00:00 without saving

### Validation System
- Date field: Cannot be empty when starting ("Please select a date")
- Event name: 3-100 characters, only letters/numbers/spaces/hyphens/apostrophes
- Specific error messages for each validation failure:
  - "Event name is required"
  - "At least 3 characters"
  - "Too long (max 100)"
  - "Invalid characters"
- Error messages displayed below fields in red
- Errors clear automatically when user focuses on field
- Start button disabled until validation passes

### Session History
- Displays all saved sessions from localStorage
- Shows: Event name, date, and duration (HH:MM:SS format)
- Most recent sessions displayed first (reverse chronological order)
- Empty state: "No sessions recorded yet"
- Clean visual separation between history items

### Filter & Statistics
- Filter by date functionality using date picker
- Statistics display showing:
  - Total number of sessions recorded
  - Total combined time across all sessions
  - Updates automatically after each save

### Data Persistence
- Uses localStorage with key "stopwatch_sessions_v1"
- Each session stored as object: { date, name, duration }
- Data persists across browser sessions and page reloads

## Technologies Used
- **HTML5** - Semantic markup with date input type
- **CSS3** - Responsive design, Flexbox layout, professional styling
- **JavaScript ES6+** - Arrow functions, template literals, object destructuring
- **jQuery 3.7.1** - DOM manipulation, event handling, form validation
- **localStorage API** - Client-side data persistence
- **Async/Await** - Modern asynchronous JavaScript patterns
- **Promises** - Asynchronous operation handling
- **setInterval/clearInterval** - Timer tick management

## Modern JavaScript Features Demonstrated

### Async/Await Implementation
```javascript
async function handleStart() {
    if (!validate() || running) return;
    running = true;
    setUI(true);
    await startTimerAsync();  // Waits for timer to be stopped
}

async function saveSessionAsync() {
    return new Promise((resolve) => {
        setTimeout(() => {
            // Save operation
            resolve();
        }, 0);
    });
}
```

### Promises
- `startTimerAsync()` returns a Promise that resolves when timer is stopped/paused
- `saveSessionAsync()` handles asynchronous session storage

### Timer Management
- `setInterval()` creates recurring timer ticks (1000ms)
- `clearInterval()` stops the timer when paused or stopped
- Proper cleanup prevents memory leaks

## How to Run

1. **Files Required:**
   - `index.html` - Main stopwatch page
   - `script.js` - JavaScript logic (jQuery and async functions)
   - `style.css` - Professional styling

2. **Place all files in the same directory**

3. **Open `index.html` in your web browser**

4. **Using the Stopwatch:**
   - Select a date (defaults to today)
   - Enter an event name (e.g., "Morning Workout", "Study Session")
   - Click "Start" to begin timing
   - Click "Pause" to temporarily stop (click "Resume" to continue)
   - Click "Stop & Save" to save the session to history
   - Use "Reset" to clear the timer without saving
   - Filter history by date to see specific sessions
   - View statistics showing total sessions and total time

## Code Structure

### Key Functions
- `fmt(secs)` - Formats seconds to HH:MM:SS
- `paint()` - Updates timer display
- `validate()` - Validates date and event name
- `setUI(runningOn)` - Updates button/input states based on timer state
- `handleStart()` - Async handler for starting timer
- `handlePause()` - Pauses running timer
- `handleResume()` - Resumes paused timer
- `handleStopSave()` - Stops and saves session
- `handleReset()` - Resets timer
- `renderHistory()` - Displays saved sessions with filtering
- `saveSessionAsync()` - Async save operation to localStorage

### State Management
- `elapsed` - Tracks seconds elapsed
- `ticker` - Stores setInterval ID
- `running` - Boolean flag for timer state

### Event Handlers
- Button clicks for all control buttons
- Focus events clear validation errors
- Date filter change event updates history view

## Validation Examples

### Passing Validation
- Date: "2025-10-23" ✓
- Event: "Morning Workout" ✓
- Event: "Study-Session #1" ✓ (hyphens allowed)
- Event: "John's Workout" ✓ (apostrophes allowed)

### Failing Validation
- Date: (empty) ✗
- Event: "Jo" ✗ (less than 3 characters)
- Event: "Morning Workout!!" ✗ (special characters)
- Event: (over 100 chars) ✗

## Browser Compatibility
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (responsive design)

## Bonus Features Implemented
- ✓ Dynamic button text ("Pause" ↔ "Resume")
- ✓ Clean, professional UI with consistent styling
- ✓ Real-time validation with immediate feedback
- ✓ Responsive design works on mobile devices
- ✓ Async/await demonstration with meaningful Promise usage
- ✓ Efficient state management with setUI() function
- ✓ Professional history list with separation
- ✓ Statistics calculation across all sessions
- ✓ Flexible filtering system

## Notes
- The stopwatch uses JavaScript's native timing which may have minor drift over long periods
- All data is stored locally in the browser (no server required)
- Clearing browser data will remove session history
- Timer works accurately to the second
- Date filter searches by exact date match
