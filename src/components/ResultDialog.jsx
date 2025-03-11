import { useImperativeHandle, useRef } from "react";

export default function ResultDialog({ref, timeRemaining, targetTime, onReset}){

    const dialog = useRef();

    const lost = timeRemaining <= 0;
    const formattedTimeRemaining = (timeRemaining / 1000).toFixed(2);
    const score = Math.round((1 - timeRemaining / (targetTime * 1000)) * 100);

    useImperativeHandle(ref, () => {
        return {
            open(){
                dialog.current.showModal();
            }
        }
    })

    return (
        <dialog className="result-modal" ref={dialog} onClose={onReset}>
            {lost && <h2>You lost</h2>}
            {!lost && <h2> Your score is: {score}</h2>}
            <p>
                The target time was <strong>{targetTime}</strong> seconds.
            </p>
            <p>
                You stopped with <strong>{formattedTimeRemaining} seconds to go.</strong>
            </p>
            <form method="dialog" onSubmit={onReset}>
                <button>Close</button>
            </form>
        </dialog>
    );
}
    
