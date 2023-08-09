import React, {useMemo} from 'react';
import './App.css';
import {getStaticProps} from "./api/timeIntervalApi";
import {formatData, freeInterval, getIntervals, makeTimes} from "./utils/timeInterval";

function App() {
    const busyTime = getStaticProps().busy;

    const workIntervals = useMemo(() => {
        const intervals = getIntervals(busyTime);
        const intervalsDate = intervals.map((item) => (formatData(item)));
        const freeTime = intervalsDate.map((item) => {
            const time = makeTimes(item, 30);
            return freeInterval(time)
        })
        return freeTime.reduce((a, e) => a.concat(e))
    }, [busyTime])

    return (
        <div className="App">
            {workIntervals.map((item, index) =>
                <div key={index}><p>{`${item.start}-${item.stop}`}</p></div>)}
        </div>
    );
}

export default App;
