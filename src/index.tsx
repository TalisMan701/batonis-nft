import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './pages/Main/App';
import './styles/main.scss';
import {ToastProvider} from './components/UiKit/Toast';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
    <ToastProvider>
        <React.StrictMode>
            <App />
        </React.StrictMode>
    </ToastProvider>
);
