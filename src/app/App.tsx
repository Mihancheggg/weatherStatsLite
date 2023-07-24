import React, { useEffect } from 'react';
import './App.css';
import { AppRootStateType, useAppDispatch } from './store';
import { AppStatusType, getHistoricalDataTC, getLastYearWeatherTC, MonthData } from './weather-reducer';
import { useSelector } from 'react-redux';
import { Table } from '../components/Table/Table';
import { Navbar } from '../components/Navbar/Navbar';
import { Route, Routes } from 'react-router-dom';
import { Chart } from '../components/Chart/Chart';

function App() {
    //ToDo: rewrite with Webpack, add linter and Github Actions
    const dispatch: any = useAppDispatch();
    const status = useSelector<AppRootStateType, AppStatusType>(state => state.weather.status)
    const weatherData = useSelector<AppRootStateType, Array<MonthData>>(state => state.weather.weatherData)

    useEffect(() => {
        dispatch(getLastYearWeatherTC())
    }, [dispatch])

    useEffect(() => {
        dispatch(getHistoricalDataTC())
    }, [dispatch])

    if (status === 'Loading') {
        return (
            <div className="App">
                <h1>
                    Loading...
                </h1>
            </div>
        )
    }

    return (
        <div className="App">
            <div className="container">
                <Navbar/>
                <Routes>
                    {/*ToDo: create env variables with path directions. Route creation by mapping*/}
                    <Route path={'/'} element={<Table weatherData={weatherData}/>}/>
                    <Route path={'/charts'} element={<Chart data={weatherData}/>}/>
                </Routes>
            </div>
        </div>
    );
}

export default App;
