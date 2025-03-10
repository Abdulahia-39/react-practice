import { useImperativeHandle, useRef } from "react";

export default function ResultDialog({ref, result, targetTime}){

    const dialog = useRef();

    useImperativeHandle(ref, () => {
        return {
            open(){
                dialog.current.showModal();
            }
        }
    })

    return (
        <dialog className="result-modal" ref={dialog}>
            <h2>{result}</h2>
            <p>
                The target time was <strong>{targetTime}</strong> seconds.
            </p>
            <p>
                Tou stopped with <strong>X seconds to go.</strong>
            </p>
            <form method="dialog">
                <button>Close</button>
            </form>
        </dialog>
    );
}
    
