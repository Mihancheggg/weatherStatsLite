import { MonthNames } from '../app/weather-reducer';

export function dataFormatter(num: number) {
    if (num < 10) {
        return ('0' + num)
    } else {
        return num.toString()
    }
}

export function getStartAndEndData(date: Date, iteration: number):[Date, Date, string, string] {
    let startDate = new Date(date)
    startDate.setFullYear(startDate.getFullYear() - 1);
    startDate.setMonth(startDate.getMonth() + iteration);
    startDate.setHours(0, 0, 0, 0);
    startDate.setDate(1);
    let endDate = new Date(startDate)
    endDate.setMonth(endDate.getMonth() + 1);
    endDate.setDate(endDate.getDate() - 1)
    const endDateString = stringifyFullDate(endDate);
    const startDateString = stringifyFullDate(startDate);
    return [startDate, endDate, startDateString, endDateString]
}

export function getFormattedRainData(rainDataArr: Array<number>, startDate: Date): [MonthNames, number] {
    const monthName: string = startDate.toLocaleString('default', {month: 'long'});
    let numOfRainyDays: number = 0
    for (let i = 0; i < rainDataArr.length / 24; i++) {
        let sumOfRainLevel = 0
        for (let j = 0; j < 24; j++) {
            sumOfRainLevel += rainDataArr[i * 24 + j];
        }
        if (sumOfRainLevel > 0) {
            numOfRainyDays++
        }
    }
    return [monthName as MonthNames, numOfRainyDays]
}

export function getAverageOfNumsArr(arr: Array<number>): number {
    let sum = 0
    for (let i = 0; i < arr.length; i++) {
        sum += arr[i]
    }
    return Math.round(sum / arr.length)
}

export function stringifyFullDate (date: Date): string {
    return date.getFullYear() + '-' + dataFormatter(date.getMonth() + 1) + '-' + dataFormatter(date.getDate());
}

export function stringifyDateWithStep (date: Date, step: number): string {
    return (date.getFullYear()-step) + '-' + dataFormatter(date.getMonth() + 1) + '-' + dataFormatter(date.getDate());
}

export function getMonthNameFromDate (date: Date): MonthNames {
    let monthName = date.toLocaleString('default', {month: 'long'});
    return monthName as MonthNames
}

export function getMinAndMaxFromArr(arr: Array<number>): [number, number]{
    let minTemp = Math.min(...arr);
    let maxTemp = Math.max(...arr)
    return [minTemp, maxTemp]
}