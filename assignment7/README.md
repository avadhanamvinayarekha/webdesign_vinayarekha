# BookVerse - E-Book Rental & Purchase Website

A two-page responsive website for renting and buying e-books, built with HTML, CSS/SASS, and JavaScript.

## About This Project

This is an e-book store website where users can browse, search, and purchase or rent digital books. The site has two pages:
- **Home page** with featured books and site information
- **Catalog page** with full book listings, search, and filters


## Setup Instructions

### What You Need
- Node.js installed on your computer
- A web browser (Chrome, Firefox, Safari, etc.)

### How to Run

1. Open terminal/command prompt in the project folder

2. Install dependencies:
   ```
   npm install
   ```

3. Compile the SASS files:
   ```
   npm run sass:watch
   ```
   Keep this running while you work. It will automatically update the CSS when you change SCSS files.

4. Open `index.html` in your browser

That's it! The website should now be running.

---

## SASS/SCSS Features Used

I implemented 14 SASS/SCSS features in this project:

### Required Features

**1. Variables** (`scss/utilities/_variables.scss`)
- Defined colors, spacing, font sizes, shadows, etc.
- Example: `$primary-color: #6366f1;`

**2. Custom Properties** (`scss/base/_reset.scss`)
- Used CSS custom properties with SASS variables
- Example: `--color-primary: #{$primary-color};`

**3. Nesting** (Used everywhere)
- Organized styles hierarchically
- Makes code easier to read and maintain

**4. Interpolation** (`scss/components/_hero.scss`)
- Used for dynamic selectors and animation names
- Example: `animation: float#{$i} 3s;`

**5. Placeholder Selectors** (`scss/utilities/_placeholders.scss`)
- Created reusable base styles like `%button-base` and `%card-base`
- Extended them in other components

**6. Mixins** (`scss/utilities/_mixins.scss`)
- Made reusable style blocks
- Examples: `@mixin flex-center`, `@mixin button-style($bg-color)`

**7. Functions** (`scss/utilities/_functions.scss`)
- Created custom functions for calculations
- Examples: `rem()`, `tint()`, `shade()`, `spacing()`

### Additional Features

**8. @for Loop**
- Generated multiple floating book animations in hero section

**9. @each with Maps**
- Created button variants (success, warning, danger)

**10. @while Loop**
- Generated utility classes (mt-1, mt-2, etc.)

**11. @if/@else Conditionals**
- Added conditional styling based on variables

**12. @extend**
- Extended placeholder selectors throughout the project

**13. List Operations**
- Used lists to generate text size classes

**14. Parent Selector &**
- Used for hover states and nested selectors

---

## CSS Layouts

### CSS Grid (4 uses)

1. **Hero section** - Two column layout for hero content
2. **Books grid** - Responsive grid for book cards on home page
3. **Catalog layout** - Sidebar and main content area
4. **Book cards** - Internal grid for book image and details

### Flexbox (5+ uses)

1. **Navigation bar** - Horizontal navigation with space-between
2. **Features section** - Flexible card layout
3. **Footer** - Multi-column footer layout
4. **Catalog controls** - Search bar and sort dropdown
5. **Pagination** - Centered page buttons
6. **Book action buttons** - Flexible rent/buy buttons

---

## File Structure

```
Assignment7/
├── index.html              # Home page
├── catalog.html            # Catalog page
├── package.json            # npm configuration
├── README.md               # This file
│
├── js/
│   └── main.js            # JavaScript code
│
├── scss/
│   ├── main.scss          # Main SCSS file (imports everything)
│   ├── utilities/         # Variables, functions, mixins, placeholders
│   ├── base/              # Reset styles
│   ├── layout/            # Navbar, footer, catalog layout
│   └── components/        # Buttons, hero, features, books
│
└── css/
    └── main.css           # Compiled CSS (auto-generated)
```

---

## JavaScript Features

I added some JavaScript to make the site interactive:
- Search books by title or author
- Filter by category and price
- Sort books by price or rating
- Add to cart with notifications
- Quick view modal when clicking book covers
- Pagination

---

## Design Choices

**Colors**: Used purple/indigo theme with gradient accents  
**Fonts**: Inter font family for modern look  
**Layout**: Mobile-first responsive design  
**Animations**: Smooth transitions and floating book effect

---

## Browser Tested

- Chrome
- Firefox
- Safari

---

## Challenges I Faced

1. Getting SASS to compile correctly - solved by using `npm run sass:watch`
2. Making buttons fit properly in catalog cards - fixed with flexbox and responsive sizing
3. Organizing SCSS files - created separate folders for utilities, layout, and components

---

## What I Learned

- How to use advanced SASS features like mixins, functions, and loops
- CSS Grid and Flexbox for modern layouts
- Organizing large CSS projects into modules
- Making responsive designs that work on all screen sizes

---

## Resources Used

- SASS Documentation: https://sass-lang.com/
- CSS Grid Guide: https://css-tricks.com/snippets/css/complete-guide-grid/
- Flexbox Guide: https://css-tricks.com/snippets/css/a-guide-to-flexbox/
- Class lectures and examples

---

## How to Test

1. **Home page**: Check hero section, features, and book grid
2. **Catalog page**: Try search, filters, and sorting
3. **Responsive**: Resize browser to test mobile/tablet views
4. **Buttons**: Click rent/buy buttons to see notifications
5. **Modal**: Click on any book cover for quick view

---

## Notes for Grading

- All SASS features are clearly labeled in their respective files
- CSS Grid and Flexbox implementations are documented in code comments
- File organization follows best practices with separate folders
- Website is fully responsive and works on all screen sizes



**Total**: 14 SASS features | 4 CSS Grids | 5+ Flexbox layouts | Fully responsive

Thank you!
