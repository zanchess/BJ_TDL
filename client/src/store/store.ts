import { configureStore } from '@reduxjs/toolkit';
import { reducer as authReducer } from './auth/authSlice';

export const store = configureStore({
    reducer: { authReducer },
    devTools: true
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
