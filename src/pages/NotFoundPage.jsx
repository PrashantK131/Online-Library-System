// NotFoundPage — 404 page shown for undefined routes
import { Link, useLocation } from 'react-router-dom';

function NotFoundPage() {
    // Get the current invalid path from the router location
    const location = useLocation();

    return (
        <div className="min-h-screen bg-amber-950 flex flex-col items-center justify-center px-4 text-center">
            {/* Large 404 text */}
            <div className="text-[10rem] font-black text-amber-800 leading-none select-none fade-in" style={{ fontFamily: 'Georgia, serif' }}>404</div>

            <div className="fade-in fade-in-delay-1">
                <h1 className="text-3xl font-bold text-amber-100 mb-2" style={{ fontFamily: 'Georgia, serif' }}>Page Not Found</h1>
                <p className="text-amber-400 text-sm mb-4">The page you're looking for doesn't exist in our library.</p>

                {/* Display the invalid route URL as required */}
                <div className="bg-amber-900 border border-amber-700 rounded-xl px-5 py-3 mb-8 inline-block">
                <p className="text-amber-400 text-xs uppercase tracking-widest mb-1">Invalid route</p>
                <code className="text-amber-200 font-mono text-sm break-all">{location.pathname}</code>
                </div>

                {/* Link back to Home */}
                <div>
                <Link to="/" className="bg-amber-500 hover:bg-amber-400 text-amber-950 font-bold px-8 py-3 rounded-full text-sm uppercase tracking-wider transition-all shadow-lg inline-block">
                    ← Return to Home
                </Link>
                </div>
            </div>
        </div>
    );
};

export default NotFoundPage;
