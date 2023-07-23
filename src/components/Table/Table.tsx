import React from 'react';
import { MonthData } from '../../app/weather-reducer';

export type TablePropsType = {
    weatherData: Array<MonthData>
}

export const Table = (props: TablePropsType) => {
    return (
        <div>
            {/*{props.lastYearData.time.map(el => <div>{el}</div>)}*/}
        </div>
    );
};