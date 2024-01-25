import React from 'react';
import { Routes, Route } from 'react-router-dom';
import RequiredAuth from '../ProtectedRouteComponents/RequiredAuth';
import BoardPage from '../../pages/BoardPage';
import AuthorizedUser from '../ProtectedRouteComponents/AuthorizedUser';
import SignInPage from '../../pages/SignInPage';

const AppRoutes = (): React.JSX.Element => {
    return (
        <>
            <Routes>
                <Route
                    path="/"
                    element={
                        <RequiredAuth>
                            <BoardPage />
                        </RequiredAuth>
                    }
                />
                <Route
                    path="/login"
                    element={
                        <AuthorizedUser>
                            <SignInPage />
                        </AuthorizedUser>
                    }
                />
            </Routes>
        </>
    );
};

export default AppRoutes;
