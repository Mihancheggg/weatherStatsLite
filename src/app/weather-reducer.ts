import { Dispatch } from 'react';
import { openMeteoApi } from '../api/open-meteo-api';
import { dataFormatter, getFormattedRainData } from '../utils/utils';

const initialState: AppStateType = {
    isLoading: false,
    weatherData: [{name: 'Июль', max: 0, min: 0, rainy: 0}]
}

export const weatherReducer = (state: AppStateType = initialState, action: WeatherActionsType): AppStateType => {
    switch (action.type) {
        default: {
            return state
        }
    }
}

//actions
export const setDataAC = () => ({type: 'APP/SET-DATA'} as const)

//thunks
export const getLastYearWeatherTC = () => async (dispatch: Dispatch<WeatherActionsType>) => {
    try {
        let currentDate = new Date();
        let formattedRainData = []
        for (let i = 0; i < 11; i++) {
            let startDate = new Date(currentDate)
            startDate.setFullYear(startDate.getFullYear() - 1);
            startDate.setMonth(startDate.getMonth() + i);
            startDate.setHours(0, 0, 0, 0);
            startDate.setDate(1);
            let endDate = new Date(startDate)
            endDate.setMonth(endDate.getMonth() + 1);
            endDate.setDate(endDate.getDate() - 1)
            const endDateFormatted = endDate.getFullYear() + '-' + dataFormatter(endDate.getMonth() + 1) + '-' + dataFormatter(endDate.getDate());
            const startDateFormatted = startDate.getFullYear() + '-' + dataFormatter(startDate.getMonth() + 1) + '-' + dataFormatter(startDate.getDate());
            let res = await openMeteoApi.getLastYearWeather(startDateFormatted, endDateFormatted);
            formattedRainData.push(getFormattedRainData(res.data.data.hourly.rain, startDate))
        }
    } catch (e) {

    }

}

//types
type WeatherActionsType = setDataActionType

export type setDataActionType = ReturnType<typeof setDataAC>

export type AppStateType = {
    isLoading: boolean,
    weatherData: Array<MonthData>
}

export type MonthData = {
    name: MonthNames,
    min: number,
    max: number,
    rainy: number
}

export type MonthNames =
    'Январь' |
    'Февраль' |
    'Март' |
    'Апрель' |
    'Май' |
    'Июнь' |
    'Июль' |
    'Август' |
    'Сентябрь' |
    'Октябрь' |
    'Ноябрь' |
    'Декабрь'