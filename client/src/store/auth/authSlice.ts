import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
    token: string;
    error: string | null;
    isLoading: boolean;
}

const initialState: AuthState = {
    token: '',
    error: null,
    isLoading: false
};

interface LogInResponse {
    accessToken: string;
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setToken: (state, action: PayloadAction<LogInResponse>) => {
            console.log(action);
            state.token = action.payload?.accessToken;
            state.isLoading = false;
            state.error = null;
        },
        setError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
            state.isLoading = false;
            state.token = '';
        },
        setLoading: (state) => {
            state.isLoading = true;
        },
        logout: (state) => {
            state.token = '';
            state.error = null;
            state.isLoading = false;
        }
    }
});

export const { actions, reducer } = authSlice;

export const { setLoading, setError, setToken } = authSlice.actions;
