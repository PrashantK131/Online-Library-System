// Redux store configuration using Redux Toolkit
import { configureStore } from '@reduxjs/toolkit';
import booksReducer from './booksSlice';

// Creating the Redux store with the books reducer
const store = configureStore({
    reducer: {
        books: booksReducer,
    },
});

export default store;