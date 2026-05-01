// Books slice — manages all book state via Redux Toolkit
import { createSlice } from '@reduxjs/toolkit';

// Dummy book data for the library
const initialBooks = [
    {
        id: 1,
        title: 'The Great Gatsby',
        author: 'F. Scott Fitzgerald',
        category: 'Fiction',
        description: 'A story of the fabulously wealthy Jay Gatsby and his love for the beautiful Daisy Buchanan, set against the backdrop of the Roaring Twenties.',
        rating: 4.5,
        cover: 'https://covers.openlibrary.org/b/id/8432808-L.jpg',
        year: 1925,
        pages: 180,
    },
    {
        id: 2,
        title: 'To Kill a Mockingbird',
        author: 'Harper Lee',
        category: 'Fiction',
        description: "Pulitzer Prize-winning masterpiece about racial injustice and moral growth in America's Deep South, narrated by young Scout Finch.",
        rating: 4.8,
        cover: 'https://covers.openlibrary.org/b/id/8228691-L.jpg',
        year: 1960,
        pages: 324,
    },
    {
        id: 3,
        title: 'Dune',
        author: 'Frank Herbert',
        category: 'Sci-Fi',
        description: 'Set on the desert planet Arrakis, Dune is the story of the boy Paul Atreides and the rise of the most important figure in the galaxy.',
        rating: 4.7,
        cover: 'https://covers.openlibrary.org/b/id/12818862-L.jpg',
        year: 1965,
        pages: 688,
    },
    {
        id: 4,
        title: 'Neuromancer',
        author: 'William Gibson',
        category: 'Sci-Fi',
        description: 'The seminal cyberpunk novel following a washed-up computer hacker hired for one last run into the world of cyberspace.',
        rating: 4.2,
        cover: 'https://covers.openlibrary.org/b/id/8391166-L.jpg',
        year: 1984,
        pages: 271,
    },
    {
        id: 5,
        title: 'Sapiens',
        author: 'Yuval Noah Harari',
        category: 'Non-Fiction',
        description: 'A brief history of humankind — from the Stone Age through the 21st century — exploring how biology and history have shaped human societies.',
        rating: 4.6,
        cover: 'https://covers.openlibrary.org/b/id/10519460-L.jpg',
        year: 2011,
        pages: 443,
    },
    {
        id: 6,
        title: 'Educated',
        author: 'Tara Westover',
        category: 'Non-Fiction',
        description: 'A memoir about a young girl who, kept out of school by her survivalist family, eventually leaves home to go to college and educates herself.',
        rating: 4.7,
        cover: 'https://covers.openlibrary.org/b/id/8739161-L.jpg',
        year: 2018,
        pages: 334,
    },
    {
        id: 7,
        title: 'The Hobbit',
        author: 'J.R.R. Tolkien',
        category: 'Fantasy',
        description: "Bilbo Baggins is whisked away from his comfortable hobbit-hole by Gandalf the wizard and eleven dwarves on a quest to reclaim their mountain home from the dragon Smaug.",
        rating: 4.8,
        cover: 'https://covers.openlibrary.org/b/id/12858885-L.jpg',
        year: 1937,
        pages: 310,
    },
    {
        id: 8,
        title: 'A Game of Thrones',
        author: 'George R.R. Martin',
        category: 'Fantasy',
        description: 'In the land of Westeros, noble families battle for control of the Iron Throne in this epic tale of power, betrayal, and survival.',
        rating: 4.6,
        cover: 'https://covers.openlibrary.org/b/id/9326654-L.jpg',
        year: 1996,
        pages: 694,
    },
    {
        id: 9,
        title: 'And Then There Were None',
        author: 'Agatha Christie',
        category: 'Mystery',
        description: 'Ten strangers are invited to a remote island, and one by one they are murdered. A masterpiece of suspense and deduction.',
        rating: 4.5,
        cover: 'https://covers.openlibrary.org/b/id/12818863-L.jpg',
        year: 1939,
        pages: 272,
    },
    {
        id: 10,
        title: 'The Girl with the Dragon Tattoo',
        author: 'Stieg Larsson',
        category: 'Mystery',
        description: 'A journalist and a hacker investigate a 40-year-old disappearance in a wealthy Swedish family. A gripping thriller with unforgettable characters.',
        rating: 4.4,
        cover: 'https://covers.openlibrary.org/b/id/8739162-L.jpg',
        year: 2005,
        pages: 672,
    },
    {
        id: 11,
        title: 'The Alchemist',
        author: 'Paulo Coelho',
        category: 'Fiction',
        description: "A shepherd boy's journey to fulfill his dreams leads him across the desert and ultimately to the treasure he seeks — and himself.",
        rating: 4.3,
        cover: 'https://covers.openlibrary.org/b/id/8228692-L.jpg',
        year: 1988,
        pages: 208,
    },
    {
        id: 12,
        title: 'Thinking, Fast and Slow',
        author: 'Daniel Kahneman',
        category: 'Non-Fiction',
        description: "Nobel laureate Daniel Kahneman's exploration of two modes of thought — fast, intuitive thinking and slow, deliberate thinking — and how they shape our decisions.",
        rating: 4.5,
        cover: 'https://covers.openlibrary.org/b/id/10519461-L.jpg',
        year: 2011,
        pages: 499,
    },
];

// Creating the books slice with initial state and reducers
const booksSlice = createSlice({
    name: 'books',
    initialState: {
        books: initialBooks,
    },
    reducers: {
        // Action to add a new book to the beginning of the list
        addBook: (state, action) => {
            const newBook = {
                ...action.payload,
                id: Date.now(), 
                rating: parseFloat(action.payload.rating) || 0,
                pages: parseInt(action.payload.pages) || 0,
                year: parseInt(action.payload.year) || new Date().getFullYear(),
                cover: action.payload.cover || '',
            };
            // Add new book at the beginning of the array
            state.books.unshift(newBook);
        },
    },
});

export const { addBook } = booksSlice.actions;
export default booksSlice.reducer;
