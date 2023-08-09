import React, {useEffect, useMemo, useState} from 'react';
import './App.css';
import {getStaticProps} from "./api/timeIntervalApi";
import {formatData, freeInterval, getIntervals, makeTimes} from "./utils/timeInterval";
import {Interval} from "./interface/interface";

function App() {
    const busyTime = getStaticProps().busy;

    const workInterval = useMemo(() => {
        const intervals = getIntervals(busyTime);
        const intervalsDate = intervals.map((item) => (formatData(item)));
        const freeTime = intervalsDate.map((item) => {
            const time = makeTimes(item, 30);
            return freeInterval(time)
        })
        const freeIntervals = freeTime.reduce((a, e) => a.concat(e))
        return freeIntervals
    }, [busyTime])

    return (
        <div className="App">
            {workInterval.map((item, index) =>
                <div key={index}><p>{`${item.start}-${item.stop}`}</p></div>)}
        </div>
    );
}

export default App;
