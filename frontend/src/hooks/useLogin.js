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

        const data = JSON.parse(text);
        console.log("Parsed JSON:", data);

        return data;  // Make sure frontend uses the response properly
    } catch (error) {
        console.error("Login error:", error);
        return null;
    }
};


    return { login, isLoading, error }
}
