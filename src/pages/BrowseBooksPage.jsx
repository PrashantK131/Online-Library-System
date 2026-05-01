// BrowseBooksPage — shows filterable, searchable list of books by category
import { useState, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import BookCard from '../components/BookCard';

// All supported categories (including "All")
const ALL_CATEGORIES = ['All', 'Fiction', 'Non-Fiction', 'Sci-Fi', 'Fantasy', 'Mystery'];

function BrowseBooksPage() {
    // Category from dynamic route /books/:category
    const { category: urlCategory } = useParams(); 
    const navigate = useNavigate();
    const { books } = useSelector((state) => state.books);

    // Determines the active category from URL or default to 'All'
    const activeCategory = urlCategory ? ALL_CATEGORIES.find((c) => c.toLowerCase() === urlCategory.toLowerCase()) || 'All' : 'All';

    // Local state for the search query
    const [searchQuery, setSearchQuery] = useState('');

    // Filter books by category and search query
    const filteredBooks = useMemo(() => {
        return books.filter((book) => {
            const matchesCategory = activeCategory === 'All' || book.category === activeCategory;
            const query = searchQuery.toLowerCase();
            const matchesSearch = !query || book.title.toLowerCase().includes(query) || book.author.toLowerCase().includes(query);
            return matchesCategory && matchesSearch;
        });
    }, [books, activeCategory, searchQuery]);

    // Navigate to the selected category route
    function handleCategoryChange(cat) {
        setSearchQuery('');
        if (cat === 'All') {
            navigate('/books');
        } else {
            navigate(`/books/${cat}`);
        }
    };

    return (
        <div className="min-h-screen bg-stone-50 page-texture">
            {/* Page header */}
            <div className="bg-gradient-to-r from-amber-900 to-stone-800 text-amber-50 py-10 px-4">
                <div className="max-w-6xl mx-auto">
                    <h1 className="text-4xl font-bold mb-1" style={{ fontFamily: 'Georgia, serif' }}>Browse Books</h1>
                    <p className="text-amber-200 text-sm">
                        {filteredBooks.length} book{filteredBooks.length !== 1 ? 's' : ''} found
                        {activeCategory !== 'All' ? ` in "${activeCategory}"` : ''}
                        {searchQuery ? ` for "${searchQuery}"` : ''}
                    </p>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-4 py-8">
                {/* ── Search bar ── */}
                <div className="mb-6">
                    <div className="relative max-w-md">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-amber-400 text-lg">🔍</span>
                        <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search by title or author…"
                            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-amber-200 bg-white text-stone-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent placeholder-stone-400 text-sm"
                        />
                        {searchQuery && (
                        <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 text-lg">×</button>
                        )}
                    </div>
                </div>

                {/* ── Category filter tabs ── */}
                <div className="flex flex-wrap gap-2 mb-8">
                    {ALL_CATEGORIES.map((cat) => (
                        <button key={cat} onClick={() => handleCategoryChange(cat)}
                        className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all border ${
                            activeCategory === cat ? 'bg-amber-800 text-amber-50 border-amber-800 shadow-md' : 'bg-white text-amber-800 border-amber-200 hover:border-amber-500 hover:bg-amber-50'
                        }`}
                        >
                        {cat}
                        </button>
                    ))}
                </div>

                {/* ── Books grid ── */}
                {filteredBooks.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 fade-in">
                    {filteredBooks.map((book) => (
                        <BookCard key={book.id} book={book} />
                    ))}
                </div>
                ) : (
                // Empty state
                <div className="text-center py-20">
                    <div className="text-6xl mb-4">📭</div>
                    <h2 className="text-xl font-bold text-stone-600 mb-2">No books found</h2>
                    <p className="text-stone-400 text-sm mb-6"> Try adjusting your search or browse a different category.</p>
                    <button onClick={() => { setSearchQuery(''); navigate('/books'); }} className="bg-amber-800 hover:bg-amber-700 text-amber-50 px-6 py-2 rounded-full font-semibold text-sm transition-colors">
                    View All Books
                    </button>
                </div>
                )}
            </div>
        </div>
    );
};

export default BrowseBooksPage;
