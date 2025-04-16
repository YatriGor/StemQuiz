import { postServerData } from '../helper/helper'
import * as Action from '../redux/result_reducer'
import { useAuth } from '@clerk/clerk-react'

const SERVER_HOSTNAME = import.meta.env.VITE_SERVER_HOSTNAME || 'http://localhost:8080';

export const PushAnswer = (result) => async (dispatch) => {
    try {
        await dispatch(Action.pushResultAction(result))
    } catch (error) {
        console.log(error)
    }
}
export const updateResult = (index) => async (dispatch) => {
    try {
        dispatch(Action.updateResultAction(index));
    } catch (error) {
        console.log(error)
    }
}

/** insert user data */
export const usePublishResult = (resultData) => {
    const { getToken, userId } = useAuth();

    (async () => {
        try {
            // First check if resultData exists
            if (!resultData) {
                throw new Error("Result data is undefined");
            }

            const { result, username, attempts, points, achieved, questions, answers } = resultData;
            
            // Validate result array
            if (!Array.isArray(result)) {
                throw new Error("Result must be an array");
            }
            if (result.length === 0) {
                throw new Error("Result array is empty");
            }

            // Validate other required fields
            if (!username) {
                throw new Error("Username is required");
            }
            if (typeof points !== 'number') {
                throw new Error("Points must be a number");
            }

            const token = await getToken();
            if (!token) {
                throw new Error("Authentication token is required");
            }

            const response = await postServerData(
                '/api/results', 
                {
                    userId,
                    username,
                    result,
                    attempts,
                    points,
                    achieved,
                    questions,
                    answers
                },
                (data) => data,
                token
            );

            if (!response) {
                throw new Error("No response from server");
            }

            console.log('Result published successfully:', response);
        } catch (error) {
            console.error('Error publishing result:', error);
            // You might want to handle this error in the UI
        }
    })();
}