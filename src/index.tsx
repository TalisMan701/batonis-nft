import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './pages/Main/App';
import './styles/main.scss';
import {ToastProvider} from './components/UiKit/Toast';
import UserProvider from './contexts/User/UserProvider';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
    <ToastProvider>
        <UserProvider>
            <React.StrictMode>
                <App />
            </React.StrictMode>
        </UserProvider>
    </ToastProvider>
);
