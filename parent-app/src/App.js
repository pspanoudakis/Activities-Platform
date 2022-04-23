import logo from './logo.svg';
import {useState} from "react";
import './App.css';
import {Requirements} from "@johnvaiosdimopoulos/software-engineering-project-spring-2022-team1";

function App() {
    const [valid,setValid] = useState(false);
    const [password,setPassword] = useState('');
    const [username,setUsername] = useState('');

    const passwordRequirements = [
        {
            text: 'Must be at least 8 characters',
            validator: val => val.length >= 8,
        },
        {
            text: 'Must contain at least one number',
            validator: val => /\d/g.test(val),
        },
        {
            text: 'Must contain at least one lower-case letter',
            validator: val => /[a-z]/g.test(val),
        },
        {
            text: 'Must contain at least one upper-case letter',
            validator: val => /[A-Z]/g.test(val),
        }
    ];
    return (
        <div>
            <h1>Signup</h1>

            <Requirements
                value={password}
                requirements={passwordRequirements}
                onValidChange={isValid => setValid(isValid)}
            />

            <input placeholder='Username' value={username} onChange={e => setUsername(e.target.value)} />
            <input placeholder='Password' type='password' value={password} onChange={e => setPassword(e.target.value)} />

            <button disabled={!valid || !username}>Sign Up</button>
        </div>
    );

}

export default App;
