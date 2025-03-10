import { useState, useRef } from "react";
import ResultDialog from "./ResultDialog";

export default function({title, targetTime}){
    const [timerStarted, setTimerStarted] = useState(false);

    const timer = useRef();
    const dialog = useRef();

    function updateState(){
        setTimeout(() => {
            setTimerStarted(false);
        }, targetTime * 1000);
    }

    function handleStart(){
        updateState();
        timer.current = setTimeout(() => {
            dialog.current.open();
        }, targetTime * 1000);
        setTimerStarted(true);
    }

    function handleStop(){
        clearTimeout(timer.current);
        setTimerStarted(false);
    }

    return(
        <>
            <ResultDialog ref={dialog} targetTime={targetTime} result='lost'/>
            <section className="challenge">
                <h2>{title}</h2>
                <p className="challenge-time">
                    {targetTime} second{targetTime > 1 ? 's' : ''}
                </p>
                <p>
                    <button onClick={timerStarted ? handleStop : handleStart}>
                        {timerStarted ? 'Stop' : 'Start'} Timer
                    </button>
                </p>
                <p className={timerStarted ? 'active' : undefined}>
                    {timerStarted ? 'Timer is running...' : 'Timer is inactive'}
                </p>
            </section>
        </>
        
    );
}