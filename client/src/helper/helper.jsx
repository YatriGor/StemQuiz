import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export function attempts_Number(result){
    return result.filter(r => r !== undefined).length;
}

export function earnPoints_Number(result, answers, point){
    return result.map((element, i) => answers[i] === element).filter(i => i).map(i => point).reduce((prev, curr) => prev + curr, 0);
}

export function flagResult(totalPoints, earnPoints){
    return (totalPoints * 50 / 100) < earnPoints; /** earn 50% marks */
}

/** check user auth  */
export function CheckUserExist({ children }){
    const auth = useSelector(state => state.result.userId)
    return auth ? children : <Navigate to={'/'} replace={true}></Navigate>
}

/** server hostname */
const SERVER_HOSTNAME = import.meta.env.VITE_SERVER_HOSTNAME || 'http://localhost:8080';
console.log('Using server hostname:', SERVER_HOSTNAME);

/** get data from server */
export const getServerData = async (url, callback, token) => {
    if (!url) {
        throw new Error('URL is required for getServerData');
    }
    
    // Handle both full URLs and relative paths
    const fullUrl = url.startsWith('http') ? url : `${SERVER_HOSTNAME}${url.startsWith('/') ? url : `/${url}`}`;
    console.log('Full URL:', fullUrl); // Debug log
    
    try {
        const response = await fetch(fullUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Response data:', data); // Debug log
        
        // Handle array response for questions
        if (url.includes('questions')) {
            if (!Array.isArray(data) && !data?.message) {
                console.error('Invalid response structure:', data);
                throw new Error('Invalid response structure: questions not found');
            }
        }

        return callback ? callback(data) : data;
    } catch (error) {
        console.error('Error in getServerData:', error);
        throw error;
    }
}

/** post data to server */
export const postServerData = async (url, result, callback, token) => {
    if (!url) {
        throw new Error('URL is required for postServerData');
    }
    
    // Handle both full URLs and relative paths
    const fullUrl = url.startsWith('http') ? url : `${SERVER_HOSTNAME}${url.startsWith('/') ? url : `/${url}`}`;
    console.log('Posting to:', fullUrl); // Debug log
    
    try {
        const response = await fetch(fullUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(result)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Response data:', data); // Debug log
        
        // Handle both success message and array responses
        if (url.includes('questions')) {
            if (!Array.isArray(data) && !data?.message) {
                console.error('Invalid response structure:', data);
                throw new Error('Invalid response structure: questions not found');
            }
        }

        return callback ? callback(data) : data;
    } catch (error) {
        console.error('Error in postServerData:', error);
        throw error;
    }
}