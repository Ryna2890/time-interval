import {Interval, IntervalData} from "../interface/interface";

const currentFormatMinutes = (minutes: number) => {
    return (minutes < 10 ? "0" + minutes : minutes)
}

export const formatData = (interval: Interval) => {
    const currentDayStart = new Date();
    const hourStart = Number(interval.start.split(':')[0]);
    const minuteStart = Number(interval.start.split(':')[1]);
    currentDayStart.setHours(hourStart);
    currentDayStart.setMinutes(minuteStart)

    const currentDayStop = new Date();
    const hourStop = Number(interval.stop.split(':')[0]);
    const minuteStop = Number(interval.stop.split(':')[1]);
    currentDayStop.setHours(hourStop);
    currentDayStop.setMinutes(minuteStop)

    return {start: currentDayStart, stop: currentDayStop}
}

export const makeTimes = (interval: IntervalData, elapsedTimeMin: number) => {

    const startTime = new Date(interval.start);
    const endTime = new Date(interval.stop);

    if (startTime.getSeconds() > 0) {
        startTime.setSeconds(0);
    }
    const result = [[new Date(startTime).getHours(), currentFormatMinutes(new Date(startTime).getMinutes())].join(':')];
    while (startTime <= endTime) {
        let formatTime
        const time = new Date(startTime.setMinutes(startTime.getMinutes() + elapsedTimeMin));
        if (time >= endTime) {
            break
        } else {
            formatTime = [new Date(time).getHours(), currentFormatMinutes(new Date(time).getMinutes())].join(':')
        }

        result.push(formatTime)
    }
    return result
}


export const getIntervals = (arr: Interval[]) => {
    let data: Interval;
    const currentInterval = arr.sort((a, b) => a.start > b.start ? 1 : -1);
    const dataInterval: Interval[] = []
    for (let i = 0; i <= arr.length; i++) {
        if (i === 0) {
            data = {start: '9:00', stop: currentInterval[i].start}
        } else if (i === arr.length) {
            data = {start: currentInterval[i - 1].stop, stop: '22:00'}
        } else {
            data = {start: currentInterval[i - 1].stop, stop: currentInterval[i].start}
        }
        dataInterval.push(data)
    }
    return dataInterval
}
