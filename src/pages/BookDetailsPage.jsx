// BookDetailsPage — shows full information about a single book via dynamic route /book/:id
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

// Renders a full star-rating row
function StarRating({ rating }) {
  return (
    <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
            <span key={star} className={`text-xl ${star <= Math.round(rating) ? 'text-amber-400' : 'text-stone-300'}`}>★</span>
        ))}
        <span className="ml-2 text-stone-600 text-sm font-semibold">{rating} / 5</span>
    </div>
    );
};

function BookDetailsPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { books } = useSelector((state) => state.books);

    // Find the book by id
    const book = books.find((b) => String(b.id) === String(id));

    // Handle book not found
    if (!book) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-stone-50 px-4">
                <div className="text-6xl mb-4">🔍</div>
                <h2 className="text-2xl font-bold text-stone-700 mb-2">Book Not Found</h2>
                <p className="text-stone-400 text-sm mb-6">The book you're looking for doesn't exist in our library.</p>
                <Link to="/books" className="bg-amber-800 hover:bg-amber-700 text-amber-50 px-6 py-2 rounded-full font-semibold text-sm transition-colors">← Back to Browse</Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-stone-50 page-texture">
        {/* Breadcrumb navigation */}
            <div className="bg-amber-900 text-amber-200 text-sm px-4 py-2">
                <div className="max-w-5xl mx-auto flex items-center gap-2">
                    <Link to="/" className="hover:text-white transition-colors">Home</Link>
                    <span>›</span>
                    <Link to="/books" className="hover:text-white transition-colors">Browse</Link>
                    <span>›</span>
                    <span className="text-amber-400 truncate max-w-xs">{book.title}</span>
                </div>
            </div>

            <div className="max-w-5xl mx-auto px-4 py-12 fade-in">
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-amber-100">
                    <div className="md:flex">
                        {/* Book cover */}
                        <div className="md:w-64 shrink-0 bg-amber-800 flex items-center justify-center p-8">
                            {book.cover ? (
                            <img src={book.cover} alt={book.title} className="w-44 shadow-2xl rounded"
                                onError={(e) => {
                                    e.target.style.display = 'none';
                                    e.target.nextSibling.style.display = 'flex';
                            }}
                            />
                            ) : null}

                            <div style={{ display: book.cover ? 'none' : 'flex' }} className="w-44 h-64 bg-amber-700 rounded flex items-center justify-center text-white text-6xl font-bold opacity-60">
                                {book.title.charAt(0)}
                            </div>
                        </div>

                        {/* Book details */}
                        <div className="flex-1 p-8">
                            {/* Category badge */}
                            <span className="inline-block bg-amber-100 text-amber-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-3">{book.category}</span>

                            {/* Title */}
                            <h1 className="text-3xl md:text-4xl font-bold text-amber-950 leading-tight mb-2" style={{ fontFamily: 'Georgia, serif' }}>{book.title}</h1>

                            {/* Author */}
                            <p className="text-amber-700 text-lg font-semibold mb-4">by {book.author}</p>

                            {/* Rating */}
                            <div className="mb-5">
                                <StarRating rating={book.rating} />
                            </div>

                            {/* Meta info */}
                            <div className="flex flex-wrap gap-4 mb-6 text-sm text-stone-500">
                                {book.year && (
                                <div className="flex items-center gap-1.5">
                                    <span>📅</span>
                                    <span>Published {book.year}</span>
                                </div>
                                )}
                                {book.pages && (
                                <div className="flex items-center gap-1.5">
                                    <span>📄</span>
                                    <span>{book.pages} pages</span>
                                </div>
                                )}
                            </div>

                            {/* Description */}
                            <div className="border-t border-amber-100 pt-5">
                                <h2 className="font-bold text-stone-700 mb-2 uppercase text-xs tracking-widest">Description</h2>
                                <p className="text-stone-600 leading-relaxed">{book.description}</p>
                            </div>

                            {/* Back button */}
                            <div className="mt-8 flex gap-4">
                                <button onClick={() => navigate(-1)} className="bg-stone-100 hover:bg-stone-200 text-stone-700 px-6 py-2.5 rounded-full font-semibold text-sm transition-colors">← Go Back</button>
                                <Link to="/books" className="bg-amber-800 hover:bg-amber-700 text-amber-50 px-6 py-2.5 rounded-full font-semibold text-sm transition-colors">Browse More Books</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookDetailsPage;
