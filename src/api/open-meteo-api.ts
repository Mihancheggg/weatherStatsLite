import axios, { AxiosResponse } from 'axios'

const instance = axios.create({
    baseURL: 'https://archive-api.open-meteo.com/v1',
})

export const openMeteoApi = {
    getLastYearWeather(start: string, end: string) {
        return instance.get<AxiosResponse<ResponseType>>
        ( `archive?latitude=55.7522&longitude=37.6156&start_date=${start}&end_date=${end}&hourly=temperature_2m,rain`)
    }

};

type ResponseType = {
    latitude: number,
    longitude: number,
    generationtime_ms: number,
    utc_offset_seconds: number,
    timezone: string,
    timezone_abbreviation: string,
    elevation: number,
    hourly_units: HourlyUnitsData,
    hourly: HourlyData
}

type HourlyUnitsData = {
    time: string,
    temperature_2m: string,
    rain: string
}

type HourlyData = {
    time: Array<string>,
    temperature_2m: Array<number>,
    rain: Array<number>
}


