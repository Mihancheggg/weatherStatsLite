import React from 'react';
import { MonthData } from '../../app/weather-reducer';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import { useSelector } from 'react-redux';
import { AppRootStateType } from '../../app/store';

export const Chart = () => {
    const weatherData = useSelector<AppRootStateType, Array<MonthData>>(state => state.weather.weatherData)

    return (
        <LineChart width={1200} height={300} data={weatherData}>
            <Line type="monotone" dataKey="max" stroke="#8884d8"/>
            <Line type="monotone" dataKey="min" stroke="#8884d8"/>
            <CartesianGrid stroke="#ccc"/>
            <XAxis dataKey="name"/>
            <YAxis/>
            <Tooltip/>
        </LineChart>
    );
};