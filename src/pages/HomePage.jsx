// Home page — landing page with welcome message, categories and popular books
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import BookCard from '../components/BookCard';

// All available book categories with icons
const CATEGORIES = [
  { name: 'Fiction',     icon: '📖', desc: 'Tales of imagination' },
  { name: 'Non-Fiction', icon: '📰', desc: 'Truth & knowledge' },
  { name: 'Sci-Fi',      icon: '🚀', desc: 'Future & beyond' },
  { name: 'Fantasy',     icon: '🧙', desc: 'Magic & wonder' },
  { name: 'Mystery',     icon: '🔍', desc: 'Suspense & intrigue' },
];

function HomePage() {
    // Get books from Redux store and picking the first 6 as "popular"
    const { books } = useSelector((state) => state.books);
    const popularBooks = books.slice(0, 6);

    return (
        <div className="min-h-screen page-texture">
            {/* ── Hero section ── */}
            <section className="bg-gradient-to-br from-amber-900 via-amber-800 to-stone-900 text-amber-50 py-20 px-4 text-center relative overflow-hidden">
                
                <div className="absolute top-0 left-0 w-72 h-72 bg-amber-600 rounded-full opacity-10 -translate-x-1/2 -translate-y-1/2" />
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-stone-600 rounded-full opacity-10 translate-x-1/3 translate-y-1/3" />

                <div className="relative max-w-3xl mx-auto fade-in">
                    <p className="text-amber-400 text-sm tracking-[0.3em] uppercase mb-4 font-semibold">Welcome to</p>
                    <h1 className="text-5xl md:text-6xl font-bold mb-4 text-amber-100" style={{ fontFamily: 'Georgia, serif' }}>The Library</h1>
                    <p className="text-amber-200 text-lg md:text-xl max-w-xl mx-auto mb-8 leading-relaxed">Discover your next great read. Browse thousands of books across every genre, add youravourites, and build your reading list.</p>
                    <div className="flex flex-wrap gap-4 justify-center">
                        <Link to="/books" className="bg-amber-400 hover:bg-amber-300 text-amber-950 px-8 py-3 rounded-full font-bold text-sm uppercase tracking-wider transition-all shadow-lg hover:shadow-amber-300/30">
                        Browse Books
                        </Link>
                        <Link to="/add-book" className="border-2 border-amber-400 hover:bg-amber-400/20 text-amber-200 hover:text-white px-8 py-3 rounded-full font-bold text-sm uppercase tracking-wider transition-all">
                        Add a Book
                        </Link>
                    </div>
                </div>
            </section>

            {/* ── Categories section ── */}
            <section className="max-w-6xl mx-auto px-4 py-14">
                <div className="text-center mb-8 fade-in fade-in-delay-1">
                    <h2 className="text-3xl font-bold text-amber-950 mb-2" style={{ fontFamily: 'Georgia, serif' }}>Explore by Category</h2>
                    <p className="text-stone-500">Find books that match your mood</p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                    {CATEGORIES.map((cat, i) => (
                        <Link key={cat.name} to={`/books/${cat.name}`}
                            className={`fade-in fade-in-delay-${Math.min(i + 1, 4)} group bg-white border border-amber-100 hover:border-amber-400 rounded-2xl p-5 text-center shadow-sm hover:shadow-md transition-all hover:-translate-y-1`}
                        >
                            <div className="text-4xl mb-2">{cat.icon}</div>
                            <div className="font-bold text-amber-900 group-hover:text-amber-700 text-sm">{cat.name}</div>
                            <div className="text-stone-400 text-xs mt-0.5">{cat.desc}</div>
                        </Link>
                    ))}
                </div>
            </section>

            {/* ── Popular Books section ── */}
            <section className="max-w-6xl mx-auto px-4 pb-16">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h2 className="text-3xl font-bold text-amber-950" style={{ fontFamily: 'Georgia, serif' }}>Popular Books</h2>
                        <p className="text-stone-500 text-sm mt-1">Readers' top picks this season</p>
                    </div>
                    <Link to="/books" className="text-amber-700 hover:text-amber-900 font-semibold text-sm underline underline-offset-2 transition-colors">
                        View all →
                    </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {popularBooks.map((book) => (
                        <div key={book.id} className="fade-in">
                            <BookCard book={book} />
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default HomePage;
