import {Interval, IntervalData} from "../interface/interface";
import {STARTWORK, STOPWORK} from "../constants/constants";

const currentFormatMinutes = (minutes: number) => {
    return (minutes < 10 ? "0" + minutes : minutes)
}

const getCurrentDay = (time: string) => {
    const currentDay = new Date();
    const hourStart = Number(time.split(':')[0]);
    const minuteStart = Number(time.split(':')[1]);
    currentDay.setHours(hourStart);
    currentDay.setMinutes(minuteStart)
    return currentDay
}

export const formatData = (interval: Interval) => {
    const currentDayStart = getCurrentDay(interval.start);
    const currentDayStop = getCurrentDay(interval.stop);

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
    const currentInterval = arr.sort((a, b) => getCurrentDay(a.start) > getCurrentDay(b.start) ? 1 : -1);
    const dataInterval: Interval[] = []
    for (let i = 0; i <= arr.length; i++) {
        if (i === 0) {
            data = {start: STARTWORK, stop: currentInterval[i].start}
        } else if (i === arr.length) {
            data = {start: currentInterval[i - 1].stop, stop: STOPWORK}
        } else {
            data = {start: currentInterval[i - 1].stop, stop: currentInterval[i].start}
        }
        dataInterval.push(data)
    }
    return dataInterval
}

export const freeInterval = (arr: string[]) => {
    let interval: Interval
    const data: Interval[] = []
    for (let i = 0; i <= arr.length - 1; i++) {
        if (i === arr.length - 1) {
            break
        } else {
            interval = {start: arr[i], stop: arr[i + 1]}
        }
        data.push(interval)
    }
    return data
}
