import { MonthNames } from '../app/weather-reducer';

export function dataFormatter(num: number) {
    if (num < 10) {
        return ('0' + num)
    } else {
        return num.toString()
    }
}

export function getStartAndEndData(date: Date, iteration: number) {
    let startDate = new Date(date)
    startDate.setFullYear(startDate.getFullYear() - 1);
    startDate.setMonth(startDate.getMonth() + iteration);
    startDate.setHours(0, 0, 0, 0);
    startDate.setDate(1);
    let endDate = new Date(startDate)
    endDate.setMonth(endDate.getMonth() + 1);
    endDate.setDate(endDate.getDate() - 1)
    return [startDate, endDate]
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