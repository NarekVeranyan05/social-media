import { SubmitHandler, useForm } from "react-hook-form"
import classes from "./Login.module.css"
import React, { useEffect, useRef, useState } from "react"

type PropsType = {
    isLoggedIn: boolean,
    loginUser: (userData: {email: string, password: string, rememberMe: boolean}) => void
}
const LoginForm = (props: PropsType) => {
    type Inputs = {
        emailInputText: string
        passwordInputText: string
        rememberMe: boolean
    }
    
    const {
        register,
        handleSubmit,
        formState: {errors},
        reset,
    } = useForm<Inputs>({mode: "all"})

    let [inputRefs, setInputRefs] = useState<Array<{current: string }>>([useRef<string>(`${classes.Input} ${classes.Preload}`), useRef<string>(`${classes.Input} ${classes.Preload} ${errors.passwordInputText && classes.InputError}`)])
    useEffect(() => {
        setTimeout(() => {
            let newInputRef1 = "0"
            let newInputRef2 = "0"

            var classNames = inputRefs[0].current.split(" ")
            if(classNames[1] === classes.Preload){
                classNames.splice(1, 1)
                newInputRef1 = classNames.join(" ")
            }

            var classNames = inputRefs[1].current.split(" ")
            if(classNames[1] === classes.Preload){
                classNames.splice(1, 1)
                newInputRef2 = classNames.join(" ")
            }

            if(newInputRef1 !== "0" && newInputRef2 !== "0")
                setInputRefs([{current: newInputRef1}, {current: newInputRef2}])
            else if(newInputRef1 !== "0")
                setInputRefs([{current: newInputRef1}, inputRefs[1]])
            else if(newInputRef2 !== "0")
                setInputRefs([inputRefs[0], {current: newInputRef2}])
        }, 1000)
    })

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        props.loginUser({email: data.emailInputText, password: data.passwordInputText, rememberMe: data.rememberMe})
        reset()
    }

    return(
        <form className={classes.LoginForm} >
            <div data-testid="error-message"></div>
            <div className={classes.InputContainer}>
                <input autoCapitalize="off" className={`${inputRefs[0].current} ${errors.emailInputText && classes.InputError}`} placeholder={!errors.emailInputText ? "Enter your email here..." : `${errors.emailInputText.message}`} {...register("emailInputText", {required: "email is required to log in"})} role={"emailInput"}></input>
            </div>
            <div className={classes.InputContainer}>
                <input type="password" autoCapitalize="off" className={`${inputRefs[1].current} ${errors.passwordInputText && classes.InputError}`}  placeholder={!errors.passwordInputText ? "Enter your password here..." : `${errors.passwordInputText.message}`} {...register("passwordInputText", {required: "password is required to log in"})} role={"passwordInput"}></input>
            </div>
            <div className={classes.CheckBoxContainer}>
                <label><input type="checkbox" {...register("rememberMe")} className={classes.CheckBox} name="Remember me" ></input>Remember me</label>
            </div>
            <button className={classes.SubmitButton} onClick={handleSubmit(onSubmit)}>Log in</button>
        </form>
    )
}

export default LoginForm