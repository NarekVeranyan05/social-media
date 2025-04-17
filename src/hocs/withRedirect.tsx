import React from "react"
import { Navigate } from "react-router-dom"

const withRedirect = (Component: any) => {
    const WrapperComponent = (props: any) => {
        return(
            <div>
                {('params' in props && JSON.stringify(props.params) !== "{}") ?
                    <Component {...props}/> //Not redirecting in case of Profile, as only it will have a loggedInUserID prop
                : 
                <div>
                    {!props.isLoggedIn ? <Navigate to="/Login" /> : <Component {...props}/>}
                </div>
                }
            </div>
        )
    }

    return WrapperComponent
}

export default withRedirect
