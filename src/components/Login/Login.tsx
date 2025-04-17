import { Navigate } from "react-router-dom"
import classes from "./Login.module.css"
import LoginForm from "./LoginForm"
import React from "react"
import { useAppDispatch, useAppSelector } from "../../Redux/Store"
import { getLoggedInStatus } from "../../Redux/AuthDataSelectors"
import { loginUserThunkCreator } from "../../Redux/AuthDataReducer"

const Login = () => {
    const dispatch = useAppDispatch()
    //global state
    const isLoggedIn = useAppSelector(state => getLoggedInStatus(state))
    //mapDTP
    const loginUser = (userData: {email: string, password: string, rememberMe: boolean}) => {
        dispatch(loginUserThunkCreator(userData))
    }

    return (
        <div className={classes.LoginContainer} data-testid="login">
            {isLoggedIn ? <Navigate to="../" /> :             
            <div className={classes.Login}>
                <h1>Login</h1>
                <LoginForm isLoggedIn={isLoggedIn} loginUser={loginUser}/>
            </div>}
        </div>
    )
}

export default Login