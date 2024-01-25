import React from 'react';
import { useLocation, Navigate } from 'react-router-dom';

function RequireAuth({ children }: { children: React.JSX.Element }): React.JSX.Element {
    const location = useLocation();
    const accessToken = localStorage.getItem('token');

    if (!accessToken) {
        // Redirect to the /login page
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
}

export default RequireAuth;
