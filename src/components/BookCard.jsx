// BookCard — displays a book in a card format with cover image, title, author and rating
import { Link } from 'react-router-dom';

// Renders star icons based on rating value
function StarRating({rating}) {
    const full = Math.floor(rating);
    const half = rating % 1 >= 0.5;
    const empty = 5 - full - (half ? 1 : 0);
    return (
        <span className="text-sm">
        {'★'.repeat(full)}
        {half ? '½' : ''}
        {'☆'.repeat(empty)}
        </span>
    );
};

// Fallback cover using initials when no image URL provided
function FallbackCover({title, category}) {
    const colors = {
        Fiction: 'from-rose-700 to-rose-900',
        'Non-Fiction': 'from-blue-700 to-blue-900',
        'Sci-Fi': 'from-violet-700 to-violet-900',
        Fantasy: 'from-emerald-700 to-emerald-900',
        Mystery: 'from-slate-700 to-slate-900',
    };
    const gradient = colors[category] || 'from-amber-700 to-amber-900';
    return (
        <div className={`w-full h-full bg-gradient-to-br ${gradient} flex items-center justify-center`}>
            <span className="text-white text-3xl font-bold opacity-60">{title?.charAt(0) || '?'} </span>
        </div>
    );
};

function BookCard({book}) {
    return (
        <div className="book-card bg-white rounded-xl overflow-hidden shadow-md border border-amber-100 flex flex-col h-full">
            {/* Book cover */}
            <div className="h-52 overflow-hidden bg-amber-50 relative">
                {book.cover ? (
                <img src={book.cover} alt={book.title} className="w-full h-full object-cover" onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }}/>
                ) : null}
                <div style={{ display: book.cover ? 'none' : 'flex' }} className="w-full h-full">
                    <FallbackCover title={book.title} category={book.category} />
                </div>

                {/* Category badge */}
                <span className="absolute top-2 right-2 bg-amber-800 text-amber-100 text-xs px-2 py-0.5 rounded-full font-semibold">{book.category}</span>
            </div>

            {/* Book info */}
            <div className="p-4 flex flex-col flex-1 gap-1">
                <h3 className="font-bold text-amber-950 text-base leading-snug line-clamp-2">{book.title}</h3>
                <p className="text-amber-700 text-sm">{book.author}</p>
                <div className="text-amber-500 mt-1">
                    <StarRating rating={book.rating} />
                    <span className="text-amber-600 text-xs ml-1">({book.rating})</span>
                </div>
                <p className="text-stone-500 text-xs mt-1 line-clamp-2 flex-1">{book.description}</p>

                {/* View details link */}
                <Link to={`/book/${book.id}`} className="mt-3 block text-center bg-amber-800 hover:bg-amber-700 text-amber-50 text-sm py-2 rounded-lg font-semibold transition-colors">View Details</Link>
            </div>
        </div>
    );
};

export default BookCard;