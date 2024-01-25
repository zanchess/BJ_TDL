// authService.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { actions } from '../auth/authSlice';

interface LogInResponse {
    accessToken: string;
}

export const login = createAsyncThunk<LogInResponse, any>('auth/login', async (credentials, { dispatch }) => {
    try {
        dispatch(actions.setLoading());

        const response = await axios.post<LogInResponse>('http://localhost:3200/login', credentials);

        dispatch(actions.setToken(response.data));

        localStorage.setItem('token', response.data.accessToken);

        return response.data;
    } catch (error: any) {
        dispatch(actions.setError(error));
        throw error;
    }
});
