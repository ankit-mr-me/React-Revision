import { useState } from 'react'
import { useAuthContext } from './useAuthContext'

export const useLogin = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const { dispatch } = useAuthContext()

    /* const login = async (email, password) => {
    setIsLoading(true)
    setError(null)

    const response = await fetch('/api/user/login', {
        method: 'POST',
        headers: {'Content-Type': 'application/json; charset=utf-8'},
        body: JSON.stringify({ email, password })
    })
    console.log({response})
    const json = await response.json()

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
    } */

    const login = async (email, password) => {
      try {
          const response = await fetch("https://fitbuddy-890e.onrender.com/api/user/login", {
              method: "POST",
              headers: {
                  "Content-Type": "application/json",
              },
              body: JSON.stringify({ email, password }),
          });
  
          // ✅ Check if response is truly empty
          const text = await response.text();
  
          if (!text) {
              throw new Error("Empty response from server");
          }
  
          // ✅ Check if response is valid JSON before parsing
          try {
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
          } catch (jsonError) {
              throw new Error("Server response is not valid JSON: " + text);
          }
  
      } catch (error) {
          console.error("Login error:", error.message);
          return null;
      }
  }
  

    return { login, isLoading, error }
}
