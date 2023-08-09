import React, {useEffect, useState} from 'react';
import './App.css';
import {getStaticProps} from "./api/timeIntervalApi";
import {formatData, getIntervals, makeTimes} from "./utils/timeInterval";

function App() {
    const busyTime = getStaticProps().busy;
    const [workTime, setWorkTime] = useState<string[]>([])

    useEffect(() => {
        const intervals = getIntervals(busyTime);
        const intervalsDate = intervals.map((item) => (formatData(item)));
        const freeTime = intervalsDate.map((item) => (
            makeTimes(item, 30)
        ))
        setWorkTime(freeTime.reduce((a, e) => a.concat(e)))

    }, [busyTime]);
    return (
        <div className="App">
            {workTime.map((item,index)=>
            <div key={index}>{item}</div>)}
        </div>
    );
}

export default App;
