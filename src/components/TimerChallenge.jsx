import { useState, useRef } from "react";
import ResultDialog from "./ResultDialog";

export default function({title, targetTime}){
    const [timerRemain, setTimeRemain] = useState(targetTime * 1000);

    const timer = useRef();
    const dialog = useRef();

    const timerIsActive = timerRemain > 0 && timerRemain < targetTime * 1000;

    if(timerRemain <= 0){
        clearTimeout(timer.current);
        dialog.current.open();
    }

    function handleReset(){
        setTimeRemain(targetTime * 1000);
    }

    function handleStart(){
        timer.current = setInterval(() => {
            setTimeRemain(prevTime => prevTime - 10)
        }, 10);
    }

    function handleStop(){
        dialog.current.open();
        clearTimeout(timer.current);
    }

    return(
        <>
            <ResultDialog ref={dialog} targetTime={targetTime} timeRemaining={timerRemain} onReset={handleReset}/>
            <section className="challenge">
                <h2>{title}</h2>
                <p className="challenge-time">
                    {targetTime} second{targetTime > 1 ? 's' : ''}
                </p>
                <p>
                    <button onClick={timerIsActive ? handleStop : handleStart}>
                        {timerIsActive ? 'Stop' : 'Start'} Timer
                    </button>
                </p>
                <p className={timerIsActive ? 'active' : undefined}>
                    {timerIsActive ? 'Timer is running...' : 'Timer is inactive'}
                </p>
            </section>
        </>
        
    );
}