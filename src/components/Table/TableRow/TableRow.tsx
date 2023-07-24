import React from 'react';
import { MonthData } from '../../../app/weather-reducer';
import styles from '../Table.module.css';

type TableRowPropsType = {
    monthData: MonthData
}

export const TableRow = (props: TableRowPropsType) => {
    const {name, min, max, rainy} = props.monthData

    return (
        <tr key={name}>
            <td className={styles.row}>{name}</td>
            <td>{max}°/{min}°</td>
            <td>{rainy} дней</td>
        </tr>
    );
};