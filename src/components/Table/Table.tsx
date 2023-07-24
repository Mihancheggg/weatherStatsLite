import React from 'react';
import { MonthData } from '../../app/weather-reducer';
import styles from './Table.module.css';
import { useSelector } from 'react-redux';
import { AppRootStateType } from '../../app/store';
import { TableRow } from './TableRow/TableRow';

export const Table = () => {
    const weatherData = useSelector<AppRootStateType, Array<MonthData>>(state => state.weather.weatherData)

    return (
        <div>
            <table className={styles.table}>
                <thead>
                <tr>
                    <th>Месяц</th>
                    <th>Макс./Мин. (°С)</th>
                    <th>Дождь</th>
                </tr>
                </thead>
                <tbody>
                {weatherData.map(el => <TableRow monthData={el}/>)}
                </tbody>
            </table>
        </div>
    );
};