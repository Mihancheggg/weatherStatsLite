import React from 'react';
import { MonthData } from '../../app/weather-reducer';
import styles from './Table.module.css';

export type TablePropsType = {
    weatherData: Array<MonthData>
}

export const Table = (props: TablePropsType) => {

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
                {props.weatherData.map(el => <tr key={el.name}>
                    <td className={styles.row}>{el.name}</td>
                    <td>{el.max}°/{el.min}°</td>
                    <td>{el.rainy} дней</td>
                </tr>)}
                </tbody>
            </table>
        </div>
    );
};