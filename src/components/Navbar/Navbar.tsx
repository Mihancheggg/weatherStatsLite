import React from 'react';
import { Link } from 'react-router-dom';

export const Navbar = () => {
    return (
        <div>
            <Link to="/">Обзор</Link>
            <Link to="/charts">Графики</Link>
        </div>
    );
};