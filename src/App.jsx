// Root component that sets up routing for the entire application
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import BrowseBooksPage from './pages/BrowseBooksPage';
import BookDetailsPage from './pages/BookDetailsPage';
import AddBookPage from './pages/AddBookPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 404 route — no Navbar */}
        <Route path="*" element={<NotFoundPage />} />

        {/* All other routes wrapped with Navbar */}
        <Route path="/" element={<><Navbar /><HomePage /></>} />
        <Route path="/books" element={<><Navbar /><BrowseBooksPage /></>} />

        {/* Dynamic route: filters book by category */}
        <Route path="/books/:category" element={<><Navbar /><BrowseBooksPage /></>} />

        {/* Dynamic route: individual book details */}
        <Route path="/book/:id" element={<><Navbar /><BookDetailsPage /></>} />
        <Route path="/add-book" element={<><Navbar /><AddBookPage /></>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;