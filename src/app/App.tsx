import React, { useEffect } from 'react';
import './App.css';
import { AppRootStateType, useAppDispatch } from './store';
import { getLastYearWeatherTC, MonthData } from './weather-reducer';
import { useSelector } from 'react-redux';
import { Table } from '../components/Table/Table';
import { Navbar } from '../components/Navbar/Navbar';
import { Route, Routes } from 'react-router-dom';
import { Chart } from '../components/Chart/Chart';

function App() {
    const weatherData = useSelector<AppRootStateType, Array<MonthData>>((state) => state.weather.weatherData);
    const dispatch: any = useAppDispatch();


    useEffect(() => {
       dispatch(getLastYearWeatherTC())
    })


    return (
        <div className="App">
            <Navbar/>
            <Routes>
                <Route path={'/'} element={<Table data={weatherData}/>}/>
                <Route path={'/charts'} element={<Chart/>}/>
            </Routes>

        </div>
    );
}

export default App;
