import React, {useEffect, useState} from 'react';
import './App.css';
import {getStaticProps} from "./api/timeIntervalApi";
import {formatData, freeInterval, getIntervals, makeTimes} from "./utils/timeInterval";
import {Interval} from "./interface/interface";

function App() {
    const busyTime = getStaticProps().busy;
    const [workTime, setWorkTime] = useState<Interval[]>([])

    useEffect(() => {
        const intervals = getIntervals(busyTime);
        const intervalsDate = intervals.map((item) => (formatData(item)));
        const freeTime = intervalsDate.map((item) => {
            const time =makeTimes(item, 30);
            return freeInterval(time)
        })
        const freeIntervals =freeTime.reduce((a, e) => a.concat(e))
        setWorkTime(freeIntervals)
    }, [busyTime]);
    return (
        <div className="App">
            {workTime.map((item,index)=>
                <div key={index}><p>{`${item.start}-${item.stop}`}</p></div>)}
        </div>
    );
}

export default App;
