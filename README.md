# Multi-Framework Ticket Web App – Vue.js Version

This is the **Vue.js implementation** of the Multi-Framework Ticket Web App for Frontend Stage 2.  
It is built with **Vite + Vue 3**, implementing a complete ticket management system with authentication, dashboard, and full CRUD functionality — following the same layout, design, and behavior as the React and Twig versions.

---

## ✦ Overview
The app includes:
- **Landing Page** – Wave hero background, decorative circles, and call-to-action buttons.
- **Authentication** – Login and Signup forms with validation, toast notifications, and session simulation via `localStorage`.
- **Dashboard** – Displays ticket summary statistics (Total, Open, Resolved) with navigation to Ticket Management.
- **Ticket Management (CRUD)** – Create, Read, Update, Delete tickets with inline validation and feedback.
- Fully responsive design, accessibility compliance, and consistent layout (max-width: 1440px).

---

## ✦ Features

### Landing Page
- Wave hero implemented with SVG or CSS clip-path.  
- Decorative circles and feature boxes with shadows and rounded corners.  
- Responsive layout for mobile, tablet, and desktop.

### Authentication
- Login and Signup pages with inline validation.  
- Toast/snackbar notifications for error and success states.  
- Session simulated using `localStorage` key: `ticketapp_session`.  
- On success, redirects user to the Dashboard.

### Dashboard
- Displays ticket statistics (Total, Open, Resolved).  
- Includes navigation link to Ticket Management.  
- Logout clears session and redirects to Login.

### Ticket Management (CRUD)
- **Create**: Form with validation and success feedback.  
- **Read**: Ticket list displayed as responsive cards.  
- **Update**: Editable form with validation.  
- **Delete**: Confirmation before deletion and success/error feedback.  
- Status color codes:
  - `open → green`
  - `in_progress → amber`
  - `closed → gray`

---

## ✦ Data Validation & Error Handling
- `title` and `status` are required fields.  
- `status` must be one of `"open"`, `"in_progress"`, `"closed"`.  
- Validation errors are shown inline or via toast messages.  
- Unauthorized users are redirected to `/auth/login`.  
- Failed API or mock requests show descriptive messages (e.g. “Failed to load tickets. Please retry.”).

---

## ✦ Accessibility & Layout
- Semantic HTML and ARIA-compliant components (`<main>`, `<nav>`, `<form>`, `<label>`).  
- Alt text for all images and visible focus outlines for keyboard users.  
- Responsive via Flexbox + Grid.  
- Consistent site-wide max-width of 1440px and centered layout.

---

## ✦ Tech Stack
- **Vue 3** (Composition API)
- **Vite** for build and dev server
- **Vue Router** for navigation
- **Pinia** for state management
- **Tailwind CSS** for styling
- **Vue Toastification** (optional) for feedback messages

---

## ✦ Local Setup
```bash
git clone <repo-url>
cd vue
npm install
npm run dev


✦ Demo Credentials

Email: demo@ticket.app

Password: password123