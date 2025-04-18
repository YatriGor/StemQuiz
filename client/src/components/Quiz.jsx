import React, { useEffect, useState } from 'react'
import Questions from './Questions'
import { MoveNextQuestion, MovePrevQuestion } from '../hooks/FetchQuestion';
import { PushAnswer } from '../hooks/setResult';
import '../styles/ProgressBar.css';

/** redux store import */
import { useSelector, useDispatch } from 'react-redux'
import { Navigate } from 'react-router-dom'

export default function Quiz() {
    const [check, setChecked] = useState(undefined)
    const result = useSelector(state => state.result.result);
    const { queue, trace } = useSelector(state => state.questions);
    const dispatch = useDispatch()

    /** next button event handler */
    function onNext(){
        if(trace < queue.length){
            /** increase the trace value by one using MoveNextAction */
            dispatch(MoveNextQuestion());

            /** insert a new result in the array.  */
            if(result.length <= trace){
                dispatch(PushAnswer(check))
            }
        }
     
        /** reset the value of the checked variable */
        setChecked(undefined)
    }

    /** Prev button event handler */
    function onPrev(){
        if(trace > 0){
            /** decrease the trace value by one using MovePrevQuestion */
            dispatch(MovePrevQuestion());
        }
    }

    function onChecked(check){
        setChecked(check)
    }

    /** finished exam after the last question */
    if(result.length && result.length >= queue.length){
        return <Navigate to={'/result'} replace={true}></Navigate>
    }

    // Calculate progress percentage
    const progress = ((trace + 1) / queue.length) * 100;

    return (
        <div className='container' style={{ maxWidth: '1000px', margin: '0 auto', padding: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '0.5rem' }}>
                <div className="progress-text">
                    Question {trace + 1} of {queue.length}
                </div>
            </div>

            {/* Progress Bar */}
            <div className="progress-container">
                <div 
                    className="progress-bar" 
                    style={{ width: `${progress}%` }}
                ></div>
            </div>

            {/* display questions */}
            <Questions onChecked={onChecked} />

            <div className='grid' style={{ marginTop: '1rem' }}>
                { trace > 0 ? <button className='btn prev' onClick={onPrev}>Prev</button> : <div></div>}
                <button className='btn next' onClick={onNext}>Next</button>
            </div>
        </div>
    )
}
