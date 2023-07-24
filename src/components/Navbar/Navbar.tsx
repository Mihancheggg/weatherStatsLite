import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './Navbar.module.css';
import { routeConfig } from '../../config/routeConfig';

export const Navbar = () => {
    const location = useLocation()
    return (
        <div className={styles.navbar}>
            {Object.values(routeConfig).map(({path, name}) => (
                <Link to={path} key={path}
                      className={location.pathname === path ? styles.activeLink : styles.link}>{name}</Link>
            ))}
        </div>
    );
};