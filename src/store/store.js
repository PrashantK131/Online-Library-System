// Redux store configuration with localStorage middleware
import { configureStore } from '@reduxjs/toolkit';
import booksReducer, { saveUserBooksToStorage } from './booksSlice';

// Custom middleware: After every Redux action, it saves the user-added books to localStorage so they are available the next time the app loads

const localStorageMiddleware = (storeAPI) => (next) => (action) => {
  
  const result = next(action);

  // Then persist only the user-added books to localStorage
  const state = storeAPI.getState();
  const userBooks = state.books.books.filter((b) => b.isUserAdded);
  saveUserBooksToStorage(userBooks);

  return result;
};

// Redux store with the books reducer

const store = configureStore({
  reducer: {
    books: booksReducer,
  },
  // Appends custom middleware alongside iwth Redux Toolkit's default middleware
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(localStorageMiddleware),
});

export default store;