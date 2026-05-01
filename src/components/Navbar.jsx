// Navbar component — displayed on all pages except 404
import { Link, NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-amber-900 text-amber-50 shadow-lg sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo / Brand */}
        <Link to="/" className="flex items-center gap-2 text-amber-200 hover:text-white transition-colors">
          <span className="text-2xl">📚</span>
          <span className="text-xl font-bold tracking-wide" style={{ fontFamily: 'Georgia, serif' }}> The Library </span>
        </Link>

        {/* Navigation links */}
        <div className="flex items-center gap-6">
          <NavLink
            to="/"
            end
            className={({ isActive }) => `text-sm font-semibold tracking-wider uppercase transition-colors pb-1 border-b-2 ${
                isActive ? 'border-amber-400 text-amber-300' : 'border-transparent text-amber-100 hover:text-white hover:border-amber-300'
              }`
            }
          > 
            Home
          </NavLink>
          <NavLink
            to="/books"
            className={({ isActive }) => `text-sm font-semibold tracking-wider uppercase transition-colors pb-1 border-b-2 ${
                isActive ? 'border-amber-400 text-amber-300' : 'border-transparent text-amber-100 hover:text-white hover:border-amber-300'
              }`
            }
          >
            Browse Books
          </NavLink>
          <NavLink
            to="/add-book"
            className={({ isActive }) => `px-4 py-1.5 rounded-full text-sm font-semibold tracking-wider uppercase transition-all ${
                isActive ? 'bg-amber-400 text-amber-900' : 'bg-amber-700 text-amber-100 hover:bg-amber-500 hover:text-white'
              }`
            }
          >
            + Add Book
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
