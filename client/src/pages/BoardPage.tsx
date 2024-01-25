import React from 'react';
import { Link } from 'react-router-dom';

function BoardPage() {
    return (
        <>
            <nav>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/login">Login</Link>
                    </li>
                    <li>
                        <Link to="/reset">Reset</Link>
                    </li>
                </ul>
            </nav>
            <h1>Board Page</h1>
        </>
    );
}

export default BoardPage;
