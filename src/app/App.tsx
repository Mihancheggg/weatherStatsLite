import React, { useEffect } from 'react';
import './App.css';
import { AppRootStateType, useAppDispatch } from './store';
import { AppStatusType, getHistoricalDataTC, getLastYearWeatherTC } from './weather-reducer';
import { useSelector } from 'react-redux';
import { Navbar } from '../components/Navbar/Navbar';
import { Route, Routes } from 'react-router-dom';
import { routeConfig } from '../config/routeConfig';

function App() {
    //ToDo: rewrite with Webpack, add linter and Github Actions
    const dispatch: any = useAppDispatch();
    const status = useSelector<AppRootStateType, AppStatusType>(state => state.weather.status)

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
                    {Object.values(routeConfig).map(({path, element}) => (
                        <Route
                            key={path}
                            path={path}
                            element={element}
                        />
                    ))}
                </Routes>
            </div>
        </div>
    );
}

export default App;
