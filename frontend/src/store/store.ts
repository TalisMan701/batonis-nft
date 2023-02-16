import {combineReducers, configureStore} from '@reduxjs/toolkit';
import userReducer from './reducers/UserReducer/UserSlice';
import modalsReducer from './reducers/ModalsReducer/ModalsSlice';
import toastsReducer from './reducers/ToastsReducer/ToastsSlice';

const rootReducer = combineReducers({
    user: userReducer,
    modals: modalsReducer,
    toasts: toastsReducer
});

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: getDefaultMiddleware =>
            getDefaultMiddleware({
                serializableCheck: false,
            }),
    })
}

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];