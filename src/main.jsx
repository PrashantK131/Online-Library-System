// main.jsx — application entry point; wraps app in Redux Provider
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './store/store';
import App from './App.jsx';
import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* Provide Redux store to the entire component tree */}
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
);
