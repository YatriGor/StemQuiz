import { useEffect, useState } from "react"
import { useDispatch } from "react-redux";
import { getServerData } from "../helper/helper";
import { useAuth } from '@clerk/clerk-react';

/** redux actions */
import * as Action from '../redux/question_reducer'

/** fetch question hook to fetch api data and set value to store */
export const useFetchQestion = () => {
    const dispatch = useDispatch();   
    const [getData, setGetData] = useState({ isLoading : false, apiData : [], serverError: null});
    const { getToken } = useAuth();

    useEffect(() => {
        setGetData(prev => ({...prev, isLoading : true}));

        /** async function fetch backend data */
        (async () => {
            try {
                const token = await getToken();
                
                // Get questions directly from the new endpoint
                const response = await getServerData(
                    '/api/questions/new', 
                    (data) => data,
                    token
                );
                
                console.log('Questions response:', response); // Debug log
                
                if(Array.isArray(response) && response.length > 0 && response[0].questions){
                    const questions = response[0].questions;
                    const answers = response[0].answers;
                    
                    setGetData(prev => ({...prev, isLoading : false}));
                    setGetData(prev => ({...prev, apiData : questions}));

                    /** dispatch an action */
                    dispatch(Action.startExamAction({ 
                        question : questions,
                        answers: answers 
                    }))

                } else{
                    throw new Error("No Question Available");
                }
            } catch (error) {
                console.error('Error fetching questions:', error); // Debug log
                setGetData(prev => ({...prev, isLoading : false}));
                setGetData(prev => ({...prev, serverError : error}));
            }
        })();
    }, [dispatch, getToken]);

    return [getData, setGetData];
}


/** MoveAction Dispatch function */
export const MoveNextQuestion = () => async (dispatch) => {
    try {
        dispatch(Action.moveNextAction()); /** increase trace by 1 */
    } catch (error) {
        console.log(error)
    }
}

/** PrevAction Dispatch function */
export const MovePrevQuestion = () => async (dispatch) => {
    try {
        dispatch(Action.movePrevAction()); /** decrease trace by 1 */
    } catch (error) {
        console.log(error)
    }
}