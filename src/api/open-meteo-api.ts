import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://archive-api.open-meteo.com/v1',
})

export const openMeteoApi = {
    getWeatherAndRain(start: string, end: string) {
        return instance.get<ResponseType<HourlyUnitsDataWithRain, HourlyDataWithRain>>
        ( `archive?latitude=55.7522&longitude=37.6156&start_date=${start}&end_date=${end}&hourly=temperature_2m,rain`)
    },

    getWeather(start: string, end: string) {
        return instance.get<ResponseType<HourlyUnitsData, HourlyData>>
        (`archive?latitude=55.7522&longitude=37.6156&start_date=${start}&end_date=${end}&hourly=temperature_2m`)
    }
};

type ResponseType<T,D> = {
    latitude: number,
    longitude: number,
    generationtime_ms: number,
    utc_offset_seconds: number,
    timezone: string,
    timezone_abbreviation: string,
    elevation: number,
    hourly_units: T,
    hourly: D
}

//ToDo: refactor types with interfaces. Types are duplicated
type HourlyUnitsData = {
    time: string,
    temperature_2m: string,
}

type HourlyUnitsDataWithRain = {
    time: string,
    temperature_2m: string,
    rain: string
}

type HourlyData = {
    time: Array<string>,
    temperature_2m: Array<number>,
}

type HourlyDataWithRain = {
    time: Array<string>,
    temperature_2m: Array<number>,
    rain: Array<number>
}


