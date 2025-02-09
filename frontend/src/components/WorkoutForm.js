import { useState } from 'react'
import { useWorkoutsContext } from '../hooks/useWorkoutsContext'
import { useAuthContext } from '../hooks/useAuthContext'


const WorkoutForm = () => {
    const { dispatch } = useWorkoutsContext()
    const { user } = useAuthContext()

    const [title, setTitle] = useState('')
    const [load, setLoad] = useState('')
    const [reps, setReps] = useState('')
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])

const handleSubmit = async (e) => {
    e.preventDefault()

    if(!user){
        setError('Please login to add a workout')
        return
    }

    const workout = {title, load, reps}
    
    try {
        const response = await fetch('/api/workouts', {
            method: 'POST',
            body: JSON.stringify(workout),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })

        // ✅ Check if response is truly empty
        const text = await response.text();

        if (!text) {
            throw new Error("Empty response from server");
        }

        // ✅ Check if response is valid JSON before parsing
        try {
            const json = JSON.parse(text);

            if (!response.ok) {
                setError(json.error)
                setEmptyFields(json.emptyFields)
            }
            if (response.ok) {
                setEmptyFields([])
                setError(null)
                setTitle('')
                setLoad('')
                setReps('')
                dispatch({type: 'CREATE_WORKOUT', payload: json})

            }    
        } catch (jsonError) {
            throw new Error("Server response is not valid JSON: " + text);
        }

    } catch (error) {
        console.error("Login error:", error.message);
        return null;
    }

    
    // const response = await fetch('/api/workouts', {
    //     method: 'POST',
    //     body: JSON.stringify(workout),
    //     headers: {
    //         'Content-Type': 'application/json',
    //         'Authorization': `Bearer ${user.token}`
    //     }
    // })
    // const json = await response.json()

    // if (!response.ok) {
    //     setError(json.error)
    //     setEmptyFields(json.emptyFields)
    // }
    // if (response.ok) {
    //     setEmptyFields([])
    //     setError(null)
    //     setTitle('')
    //     setLoad('')
    //     setReps('')
    //     dispatch({type: 'CREATE_WORKOUT', payload: json})
    // }

}

return (
    <form className="create" onSubmit={handleSubmit}> 
        <h3>Add a New Workout</h3>

        <label>Excersize Title:</label>
        <input 
            type="text" 
            onChange={(e) => setTitle(e.target.value)} 
            value={title}
            className={emptyFields.includes('title') ? 'error' : ''}
        />

        <label>Load (in kg):</label>
        <input 
            type="number" 
            onChange={(e) => setLoad(e.target.value)} 
            value={load}
            className={emptyFields.includes('load') ? 'error' : ''}
        />

        <label>Number of Reps:</label>
        <input 
            type="number" 
            onChange={(e) => setReps(e.target.value)} 
            value={reps}
            className={emptyFields.includes('reps') ? 'error' : ''}
        />

        <button>Add Workout</button>
        {error && <div className="error">{error}</div>}
    </form>
)
}

export default WorkoutForm
