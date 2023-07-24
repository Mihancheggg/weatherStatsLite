import { openMeteoApi } from '../api/open-meteo-api';
import { dataFormatter, getAverageOfNumsArr, getFormattedRainData, getStartAndEndData } from '../utils/utils';
import { AppRootStateType, ThunkType } from './store';
import { ThunkDispatch } from 'redux-thunk'

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
        case 'APP/SET-MIN-TEMP': {
            let newState = {...state}
            newState.weatherData = state.weatherData = newState.weatherData.map(el => el.name === action.payload.month ? {
                ...el,
                min: action.payload.minTemp
            } : {...el})
            return newState
        }
        case 'APP/SET-MAX-TEMP': {
            let newState = {...state}
            newState.weatherData = state.weatherData = newState.weatherData.map(el => el.name === action.payload.month ? {
                ...el,
                max: action.payload.maxTemp
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
export const addRainDataAC = (month: MonthNames, rainyDays: number) => ({
    type: 'APP/SET-RAIN-DATA',
    payload: {
        month,
        rainyDays
    }
} as const)

export const setMinTempAC = (month: MonthNames, minTemp: number) => ({
    type: 'APP/SET-MIN-TEMP',
    payload: {
        month,
        minTemp
    }
} as const)

export const setMaxTempAC = (month: MonthNames, maxTemp: number) => ({
    type: 'APP/SET-MAX-TEMP',
    payload: {
        month,
        maxTemp
    }
} as const)

export const setStatusAC = (status: AppStatusType) => ({
    type: 'APP/SET-STATUS',
    payload: {
        status
    }
} as const)

//thunks
export const getLastYearWeatherTC = ():ThunkType => async (dispatch: ThunkDispatch<AppRootStateType,unknown, WeatherActionsType>) => {
    try {
        dispatch(setStatusAC('Loading'))
        let currentDate = new Date();
        for (let i = 0; i < 12; i++) {
            let [startDate, endDate] = getStartAndEndData(currentDate, i)
            const endDateFormatted = endDate.getFullYear() + '-' + dataFormatter(endDate.getMonth() + 1) + '-' + dataFormatter(endDate.getDate());
            const startDateFormatted = startDate.getFullYear() + '-' + dataFormatter(startDate.getMonth() + 1) + '-' + dataFormatter(startDate.getDate());
            let res = await openMeteoApi.getWeatherAndRain(startDateFormatted, endDateFormatted)
            const [month, rainyDays] = getFormattedRainData(res.data.hourly.rain, startDate)
            dispatch(addRainDataAC(month, rainyDays))
        }
        setTimeout(() => {
            dispatch(setStatusAC('Ready'))
        }, 5000)
    } catch (e) {
        dispatch(setStatusAC('Error'))
    }

}

export const getHistoricalDataTC = ():ThunkType => async (dispatch: ThunkDispatch<AppRootStateType,unknown, WeatherActionsType>) => {
    //ToDo: refactor data mining logics. Too much requests! Maybe another place for business logic?
    try {
        const startYear = 2010;
        dispatch(setStatusAC('Loading'))
        let currentDate = new Date();
        for (let i = 0; i < 12; i++) {
            let monthsTempArr = []
            let [startDate, endDate] = getStartAndEndData(currentDate, i)
            for (let j = 0; j < (currentDate.getFullYear() - startYear); j++) {
                const endDateFormatted = (endDate.getFullYear() - j) + '-' + dataFormatter(endDate.getMonth() + 1) + '-' + dataFormatter(endDate.getDate());
                const startDateFormatted = (startDate.getFullYear() - j) + '-' + dataFormatter(startDate.getMonth() + 1) + '-' + dataFormatter(startDate.getDate());
                let res = await openMeteoApi.getWeather(startDateFormatted, endDateFormatted)
                monthsTempArr.push(getAverageOfNumsArr(res.data.hourly.temperature_2m))
            }
            const monthName: string = startDate.toLocaleString('default', {month: 'long'});
            dispatch(setMinTempAC(monthName as MonthNames, Math.min(...monthsTempArr)))
            dispatch(setMaxTempAC(monthName as MonthNames, Math.max(...monthsTempArr)))
        }
        setTimeout(() => {
            dispatch(setStatusAC('Ready'))
        }, 5000)
    } catch (e) {
        dispatch(setStatusAC('Error'))
    }
}

//types
export type WeatherActionsType = addRainDataActionType
    | setMinTempActionType
    | setMaxTempActionType
    | setStatusActionType

export type addRainDataActionType = ReturnType<typeof addRainDataAC>
export type setMinTempActionType = ReturnType<typeof setMinTempAC>
export type setMaxTempActionType = ReturnType<typeof setMaxTempAC>
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