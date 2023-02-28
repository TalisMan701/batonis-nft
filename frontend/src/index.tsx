import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './pages/Main/App';
import './styles/main.scss';
import {setupStore} from './store/store';
import {Provider} from 'react-redux';

export const store = setupStore();

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <Provider store={store}>
        <App />
    </Provider>,
);
// eslint-disable-next-line
// @ts-ignore
window.store = store;
