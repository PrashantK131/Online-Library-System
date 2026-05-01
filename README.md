# 📚 The Library — Online Library System

A React + Redux + Tailwind CSS online library system built with Vite. It allows users to browse from the list of books available, select a book and they can also add there favourite books to list.

## 🚀 Features

- **Home Page** — Welcome hero, category cards, and popular book listings
- **Browse Books** — Filter by category and search by title or author
- **Book Details** — Full book info available to view
- **Add Book** — New book appears at the top of the Browse page if added
- **404 Page** — Displays the invalid URL and provides link back to Home
- **LocalStorage Persistence** — All books including user-added ones are saved to localStorage and reloaded on refresh.

## 🛠️ Tech Stack

| Tool | Purpose |
|------|---------|
| React 18 | UI library |
| Vite | Build tool |
| React Router v6 | Client-side routing |
| Redux Toolkit + React-Redux | Global state management |
| Tailwind CSS | Styling |
| localStorage | Data persistence across sessions |

## 📂 Project Structure

Online_Library_System
├── public/
├── src/
│   ├── store/
│   │   ├── store.js              ← Redux store + localStorage middleware
│   │   └── booksSlice.js         ← Books state, actions, localStorage helpers
│   ├── components/
│   │   ├── Navbar.jsx            ← Top navigation bar
│   │   └── BookCard.jsx          ← Reusable book card component
│   ├── pages/
│   │   ├── HomePage.jsx          ← Landing page
│   │   ├── BrowseBooksPage.jsx   ← Browse & filter books
│   │   ├── BookDetailsPage.jsx   ← Single book view
│   │   ├── AddBookPage.jsx       ← Add new book form
│   │   └── NotFoundPage.jsx      ← 404 page (no Navbar)
│   ├── App.jsx                   ← Root router setup
│   ├── main.jsx                  ← Entry point with Redux Provider
│   └── index.css                 ← Global styles + Tailwind import
├── vite.config.js
├── package.json
└── README.md

### 📝 How to Run
    - Clone or download the project files.
    - Install node modules i.e. "npm install"
    - Run "npm run dev".

## 📌 Implementation Details 
    - Code is thoroughly commented to explain complex logics.
    - Github Link: [https://github.com/PrashantK131/Online-Library-System]

## 👨‍💻 Author

[Prashant Kumar]
