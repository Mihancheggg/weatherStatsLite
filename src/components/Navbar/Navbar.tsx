import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './Navbar.module.css';

export const Navbar = () => {
    const location = useLocation()
    return (
        <div className={styles.navbar}>
            <Link
                className={location.pathname === "/" ? styles.activeLink : styles.link}
                to="/"
            >Обзор</Link>
            <Link
                className={location.pathname === "/charts" ? styles.activeLink : styles.link}
                to="/charts"
            >Графики</Link>
        </div>
    );
};