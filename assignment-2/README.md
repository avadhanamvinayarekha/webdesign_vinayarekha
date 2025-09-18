# Assignment 2 – Portfolio (Avadhanam Vinaya Rekha)

A simple, responsive portfolio built with **semantic HTML5** and **external CSS**.  
Focus: clean structure, accessibility, and incremental commits.

---

## How to view
Open `index.html` in any modern browser. No build tools or JS required.

## Folder structure
assignment-2/
├─ index.html
├─ styles.css
└─ assets/
├─ apple-touch-icon.png (favicon/brand mark)
├─ javaswingproject.jpg (project screenshot)
└─ blood-donation-web-page.jpg (project screenshot)

## Components (as required)
- **Testimonials** – quotes presented as cards with hover effects, responsive layout.
- **Image Gallery** – figure-based gallery with captions, hover effects, and flex layout.

---

## CSS techniques
- **Flexbox:** `display:flex`, `justify-content`, `align-items`, `flex-wrap`, `flex-direction` (at 768px), `flex: 1 1 ...` (→ `flex-grow`).
- **Responsive design:** media queries at **768px** (tablet) and **375px** (phone) adjust hero, cards, and gallery.
- **Interactions:** lightweight transitions + hover states on cards, gallery items, and buttons.
- **Selectors:** attribute selector `[data-level="..."]`, pseudo-element `.brand-with-icon::before`, table striping via `:nth-child(even)`.

---

## Accessibility touches
- Descriptive `alt` text on images.
- Labeled form controls with `for`/`id`.
- Keyboard focus styles on interactive elements.
- Landmarks (`header`, `nav`, `main`, `footer`) for screen readers.

---

## Tags used (with short descriptions)

### Document & metadata
- `<!doctype html>` – HTML5 mode.
- `<html lang="en">` – document root + language.
- `<head>` – metadata container.
- `<meta charset="utf-8">` – character encoding.
- `<meta name="viewport">` – responsive viewport.
- `<meta name="description">` – page summary.
- `<title>` – browser/tab title.
- `<link rel="icon">` – favicon.
- `<link rel="stylesheet">` – external CSS.
- `<body>` – page content.

### Semantic layout & navigation
- `<header>` – site header.
- `<nav>` – site navigation.
- `<main>` – primary content region.
- `<section>` – thematic grouping (experience, skills, projects, gallery, education, testimonials, contact, hobbies).
- `<article>` – self-contained cards/blocks.
- `<aside>` – supporting facts alongside hero.
- `<footer>` – site footer/copyright.

### Headings, text & lists
- `<h1>`, `<h2>`, `<h3>` – content hierarchy.
- `<p>` – paragraphs.
- `<ul>`, `<li>` – lists of links/text.
- `<strong>`, `<span>` – emphasis/inline label.
- `<small>` – small print (footer note).
- `<a>` – hyperlinks.

### Media & quotations
- `<figure>` – wraps media and caption.
- `<img alt="…">` – images with alternative text.
- `<figcaption>` – image caption.
- `<blockquote>` – testimonial quote.
- `<footer>` (inside blockquote) – quote attribution.

### Data table
- `<table role="table">` – skills table.
- `<caption>` – table title.
- `<thead>`, `<tbody>` – table regions.
- `<tr>` – row.
- `<th>` – header cell.
- `<td>` – data cell.

### Forms & controls
- `<form method="post">` – contact form.
- `<fieldset>` – groups related fields.
- `<legend>` – fieldset title.
- `<label for="…">` – accessible label.
- `<input type="text|email">` – text/email inputs.
- `<textarea>` – multi-line input.
- `<button type="submit">` – submit action.

---

## Rubric cross-check
- **Semantic HTML:** `header`, `section`, `article`, `aside`, `footer` ✅
- **Controls:** `nav`, **styled** `table`, `form`, `button` ✅
- **Two components:** Testimonials + Image Gallery, with hover effects ✅
- **Flexbox properties:** `justify-content`, `align-items`, `flex-wrap`, `flex-direction`, `flex-grow` (via `flex` shorthand) ✅
- **Responsive breakpoints:** 768px and 375px with visible layout changes ✅
- **External CSS only:** all styles in `styles.css` ✅
- **Favicon present** ✅
- **Incremental commits with clear messages** ✅

---

## Notes
All content and screenshots relate to my own work and coursework.  
No JavaScript was used; layout and interactions rely on HTML/CSS only.