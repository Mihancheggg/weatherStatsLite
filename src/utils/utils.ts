export function dataFormatter(num: number) {
    if (num < 10) {
        return ('0' + num)
    } else {
        return num.toString()
    }
}

export function getFormattedRainData(rainDataArr: Array<number>, startDate: Date) {
    const monthName = startDate.toLocaleString('default', {month: 'long'});
    let numOfRainyDays = 0
    for (let i = 0; i < rainDataArr.length / 24; i++) {
        let sumOfRainLevel = 0
        for (let j = 0; j < 24; j++) {
            sumOfRainLevel += rainDataArr[i * 24 + j];
        }
        if (sumOfRainLevel > 0) {
            numOfRainyDays++
        }
    }
    return {name: monthName, rainyDays: numOfRainyDays}
}