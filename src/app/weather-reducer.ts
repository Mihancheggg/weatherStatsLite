import { Dispatch } from 'react';
import { openMeteoApi } from '../api/open-meteo-api';
import { dataFormatter, getFormattedRainData, getStartAndEndData } from '../utils/utils';

const initialState: AppStateType = {
    status: 'Ready',
    weatherData: [
        {name: 'январь', max: null, min: null, rainy: null},
        {name: 'февраль', max: null, min: null, rainy: null},
        {name: 'март', max: null, min: null, rainy: null},
        {name: 'апрель', max: null, min: null, rainy: null},
        {name: 'май', max: null, min: null, rainy: null},
        {name: 'июнь', max: null, min: null, rainy: null},
        {name: 'июль', max: null, min: null, rainy: null},
        {name: 'август', max: null, min: null, rainy: null},
        {name: 'сентябрь', max: null, min: null, rainy: null},
        {name: 'октябрь', max: null, min: null, rainy: null},
        {name: 'ноябрь', max: null, min: null, rainy: null},
        {name: 'декабрь', max: null, min: null, rainy: null}
    ]
}

export const weatherReducer = (state: AppStateType = initialState, action: WeatherActionsType): AppStateType => {
    switch (action.type) {
        case 'APP/SET-RAIN-DATA': {
            let newState = {...state}
            newState.weatherData = state.weatherData = newState.weatherData.map(el => el.name === action.payload.month ? {
                ...el,
                rainy: action.payload.rainyDays
            } : {...el})
            return newState
        }
        case 'APP/SET-STATUS': {
            let newState = {...state}
            newState.status = action.payload.status
            return newState
        }
        default: {
            return state
        }
    }
}

//actions
export const addMonthDataAC = (month: MonthNames, rainyDays: number) => ({
    type: 'APP/SET-RAIN-DATA',
    payload: {
        month,
        rainyDays
    }
} as const)

export const setStatusAC = (status: AppStatusType) => ({
    type: 'APP/SET-STATUS',
    payload: {
        status
    }
} as const)

//thunks
export const getLastYearWeatherTC = () => async (dispatch: Dispatch<WeatherActionsType>) => {
    try {
        dispatch(setStatusAC('Loading'))
        let currentDate = new Date();
        for (let i = 0; i < 11; i++) {
            let [startDate, endDate] = getStartAndEndData(currentDate, i)
            const endDateFormatted = endDate.getFullYear() + '-' + dataFormatter(endDate.getMonth() + 1) + '-' + dataFormatter(endDate.getDate());
            const startDateFormatted = startDate.getFullYear() + '-' + dataFormatter(startDate.getMonth() + 1) + '-' + dataFormatter(startDate.getDate());
            let res = await openMeteoApi.getLastYearWeather(startDateFormatted, endDateFormatted)
            const [month, rainyDays] = getFormattedRainData(res.data.hourly.rain, startDate)
            dispatch(addMonthDataAC(month, rainyDays))
        }
        debugger
        dispatch(setStatusAC('Ready'))
    } catch (e) {
        dispatch(setStatusAC('Error'))
    }

}

//types
type WeatherActionsType = addMonthDataActionType | setStatusActionType

export type addMonthDataActionType = ReturnType<typeof addMonthDataAC>
export type setStatusActionType = ReturnType<typeof setStatusAC>

export type AppStateType = {
    status: AppStatusType,
    weatherData: Array<MonthData>
}

export type AppStatusType = 'Ready' | 'Loading' | 'Error'

export type MonthData = {
    name: MonthNames,
    min: number | null,
    max: number | null,
    rainy: number | null
}

export type MonthNames =
    'январь' |
    'февраль' |
    'март' |
    'апрель' |
    'май' |
    'июнь' |
    'июль' |
    'август' |
    'сентябрь' |
    'октябрь' |
    'ноябрь' |
    'декабрь'