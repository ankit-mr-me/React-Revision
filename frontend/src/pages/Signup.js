import { useState } from 'react'
import { useSignup } from "../hooks/useSignup"

const Signup = () =>{
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const {signup, error, isLoading} = useSignup()

    const handleSubmit = async (e) =>{
        e.preventDefault();

        await signup(email, password)
        
    }

    return(
        <form className='signup' onSubmit={handleSubmit}>
            <h3>Signup</h3>

            <label>Email:</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}/>

            <lable>Password</lable>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>

            <button disabled={isLoading}>Sign up</button>
            {error && <div className="error">{error}</div>}

        </form>
    )
}

export default Signup