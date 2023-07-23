import React from 'react';
import { MonthData } from '../../app/weather-reducer';

export type TablePropsType = {
    weatherData: Array<MonthData>
}

export const Table = (props: TablePropsType) => {

    return (
        <div>
            <table>
                <tr>
                    <th>Месяц</th>
                    <th>Макс./Мин. (°С)</th>
                    <th>Дождь</th>
                </tr>
                {props.weatherData.map(el => <tr key={el.name}>
                    <td>{el.name}</td>
                    <td>{el.max}°/{el.min}°</td>
                    <td>{el.rainy}</td>
                </tr>)}
            </table>
        </div>
    );
};