import React from 'react'
import { Button } from "@material-ui/core"
import './Login.css'
import {auth, provider} from "../firebase"
import { useStateValue } from '../StateProvider'
import { actionTypes } from '../reducer'



function Login() {

    const [{}, dispatch] = useStateValue();

    const signIn = () => {
        auth
        .signInWithPopup(provider)
        .then((result) => {
            dispatch({
                type: actionTypes.SET_USER,
                user: result.user, // the user we get from google
            }); // shoots this at the datalayer wrapping the app
        })
        .catch(error => alert(error.message));
    }
    
    return (
        <div className='login'>
            <div className = "login_container"> 
                <img src="data:image/png;base64,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" />
                <div className="login_text">
                    <h1>Sign in to Ping!</h1>
                </div>
                <Button  onClick={signIn}>
                    Sign In With Google
                </Button>
            </div>
            
        </div>
    )
}

export default Login
