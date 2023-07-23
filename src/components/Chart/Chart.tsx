import React from 'react';
import { MonthData } from '../../app/weather-reducer';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';

type ChartPropsType = {
    data: Array<MonthData>
}

export const Chart = (props: ChartPropsType) => {
    const data = props.data
    return (
        <LineChart width={1200} height={300} data={data}>
            <Line type="monotone" dataKey="max" stroke="#8884d8" />
            <Line type="monotone" dataKey="min" stroke="#8884d8" />
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
        </LineChart>
    );
};