import React from 'react';
import { useLocation, Navigate } from 'react-router-dom';

function AuthorizedUser({ children }: { children: React.JSX.Element }): React.JSX.Element {
    const location = useLocation();
    const accessToken = localStorage.getItem('token');

    if (accessToken) {
        return <Navigate to="/" state={{ from: location }} replace />;
    }

    return children;
}

export default AuthorizedUser;
