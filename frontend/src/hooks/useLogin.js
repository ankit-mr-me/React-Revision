import { useState } from 'react'
import { useAuthContext } from './useAuthContext'

export const useLogin = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const { dispatch } = useAuthContext()

    const login = async (email, password) => {
    try {
        const response = await fetch("https://fitbuddy-890e.onrender.com/api/user/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        });

        // Check if response is not empty
        const text = await response.text();
        console.log("Raw response:", text);  // Debugging step

        if (!text) {
            throw new Error("Empty response from server");
        }

        const json = JSON.parse(text);

        if (!response.ok) {
            console.log("1")
            setIsLoading(false)
            setError(json.error)
        }
        
        if (response.ok) {
            console.log("2")
            // save the user to local storage
            localStorage.setItem('user', JSON.stringify(json))

          // update the auth context
            dispatch({type: 'LOGIN', payload: json})

          // update loading state
            setIsLoading(false)
    }
        

        // return json;  // Make sure frontend uses the response properly
    } catch (error) {
        console.error("Login error:", error);
        return null;
    }
};




    return { login, isLoading, error }
}
