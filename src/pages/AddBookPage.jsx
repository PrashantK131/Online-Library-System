// AddBookPage — form for adding a new book, uses Redux to persist state
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addBook } from '../store/booksSlice';

// Category options available for selection
const CATEGORIES = ['Fiction', 'Non-Fiction', 'Sci-Fi', 'Fantasy', 'Mystery'];

// Initial form state
const EMPTY_FORM = {
    title: '',
    author: '',
    category: '',
    description: '',
    rating: '',
    year: '',
    pages: '',
    cover: '',
};

const AddBookPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Form values state
    const [form, setForm] = useState(EMPTY_FORM);

    // Validation error messages keyed by field name
    const [errors, setErrors] = useState({});

    // Whether the form was successfully submitted
    const [submitted, setSubmitted] = useState(false);

    // Update a single form field and clear its error
    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: '' }));
        }
    };

    // Validate all required fields and return errors object
    const validate = () => {
        const newErrors = {};
        if (!form.title.trim()){       
            newErrors.title = 'Title is required.';
        }
        if (!form.author.trim()){
            newErrors.author = 'Author is required.';
        }      
        if (!form.category){
            newErrors.category = 'Please select a category.';
        }           
        if (!form.description.trim()){
            newErrors.description = 'Description is required.';
        } 

        const rating = parseFloat(form.rating);
        if (!form.rating){
            newErrors.rating = 'Rating is required.';
        }             
        else if (isNaN(rating) || rating < 0 || rating > 5){
            newErrors.rating = 'Rating must be a number between 0 and 5.';
        }
        

        const year = parseInt(form.year);
        
        if (form.year && (isNaN(year) || year < 1000 || year > new Date().getFullYear()))
        newErrors.year = `Year must be between 1000 and ${new Date().getFullYear()}.`;

        const pages = parseInt(form.pages);

        if (form.pages && (isNaN(pages) || pages < 1))
        newErrors.pages = 'Pages must be a positive number.';

        return newErrors;
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validate();

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        // Dispatch the addBook Redux action
        dispatch(addBook(form));
        setSubmitted(true);

        // Redirect to Browse Books page after a short delay
        setTimeout(() => {
            navigate('/books');
        }, 1500);
    };

  // Helper: shared classes for form inputs
    const inputCls = (field) =>
        `w-full px-4 py-2.5 rounded-xl border text-sm bg-white text-stone-800 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent placeholder-stone-400 transition-all ${
        errors[field] ? 'border-red-400 bg-red-50' : 'border-amber-200'
        }`;

    return (
        <div className="min-h-screen bg-stone-50 page-texture py-12 px-4">
            <div className="max-w-2xl mx-auto">
                {/* Page header */}
                <div className="text-center mb-10 fade-in">
                <h1 className="text-4xl font-bold text-amber-950 mb-2" style={{ fontFamily: 'Georgia, serif' }}>Add a New Book</h1>
                <p className="text-stone-500 text-sm">Contribute to our growing library collection</p>
                </div>

                {/* Success banner shown briefly before redirect */}
                {submitted && (
                <div className="mb-6 bg-green-50 border border-green-300 text-green-800 rounded-xl px-5 py-4 text-center font-semibold fade-in">✅ Book added successfully! Redirecting to Browse…</div>
                )}

                {/* Add Book form */}
                <form onSubmit={handleSubmit} noValidate className="bg-white rounded-2xl shadow-lg border border-amber-100 p-8 space-y-5 fade-in">
                    {/* Title */}
                    <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1.5">Title <span className="text-red-500">*</span></label>
                        <input type="text" name="title" value={form.title} onChange={handleChange} placeholder="e.g. The Great Gatsby" className={inputCls('title')}/>
                        {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
                    </div>

                    {/* Author */}
                    <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1.5">Author <span className="text-red-500">*</span></label>
                        <input type="text" name="author" value={form.author} onChange={handleChange} placeholder="e.g. F. Scott Fitzgerald" className={inputCls('author')}/>
                        {errors.author && <p className="text-red-500 text-xs mt-1">{errors.author}</p>}
                    </div>

                    {/* Category and Rating row */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1.5">Category <span className="text-red-500">*</span></label>
                            <select name="category" value={form.category} onChange={handleChange} className={inputCls('category')}>
                                <option value="">Select category…</option>
                                {CATEGORIES.map((c) => (
                                    <option key={c} value={c}>{c}</option>
                                ))}
                            </select>
                            {errors.category && <p className="text-red-500 text-xs mt-1">{errors.category}</p>}
                        </div>

                        <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1.5">Rating (0–5) <span className="text-red-500">*</span></label>
                            <input type="number" name="rating" value={form.rating} onChange={handleChange} placeholder="e.g. 4.5" min="0" max="5" step="0.1" className={inputCls('rating')}/>
                            {errors.rating && <p className="text-red-500 text-xs mt-1">{errors.rating}</p>}
                        </div>
                    </div>

                    {/* Year and Pages row */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1.5">Publication Year</label>
                            <input type="number" name="year" value={form.year} onChange={handleChange} placeholder={`e.g. ${new Date().getFullYear()}`} className={inputCls('year')}/>
                            {errors.year && <p className="text-red-500 text-xs mt-1">{errors.year}</p>}
                        </div>

                        <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1.5">Pages</label>
                            <input type="number" name="pages" value={form.pages} onChange={handleChange} placeholder="e.g. 320" className={inputCls('pages')}/>
                            {errors.pages && <p className="text-red-500 text-xs mt-1">{errors.pages}</p>}
                        </div>
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1.5">Description <span className="text-red-500">*</span></label>
                        <textarea name="description" value={form.description} onChange={handleChange} placeholder="Write a brief description of the book…" rows={4} className={`${inputCls('description')} resize-none`}/>
                        {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
                    </div>

                    {/* Cover URL */}
                    <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1.5">Cover Image URL <span className="text-stone-400 font-normal normal-case">(optional)</span></label>
                        <input type="url" name="cover" value={form.cover} onChange={handleChange} placeholder="https://example.com/cover.jpg" className={inputCls('cover')}/>
                    </div>

                    {/* Submit button */}
                    <button type="submit" disabled={submitted} className="w-full bg-amber-800 hover:bg-amber-700 disabled:bg-stone-300 text-amber-50 py-3 rounded-xl font-bold text-sm uppercase tracking-wider transition-all shadow-md hover:shadow-lg">
                        {submitted ? 'Adding…' : '📚 Add Book to Library'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddBookPage;
