import { NavLink } from "react-router-dom"
import classes from "./Navigation.module.css"
import React, { useEffect, useState } from "react"

const Navigation = () => {
    let [navigationRef, setNavigationRef] = useState<{current: any}>(React.createRef())

    useEffect(() => {
        var prevScrollPos = window.scrollY
        window.onscroll = () => {
            var currentScrollPos = window.scrollY
            if (prevScrollPos > currentScrollPos) {
                navigationRef.current.style.bottom = "0";
            } 
            else{
                navigationRef.current.style.bottom = "-60px";
            }
            prevScrollPos = currentScrollPos;
        }
    })

    return (
        <div className={classes.Navigation} ref={navigationRef}>
            <NavLink to={"/"} className={classes.NavButton}><span style={{fontSize: "2em"}} className="material-symbols-outlined">Home</span></NavLink>
            <NavLink to={"/Friends/"} className={classes.NavButton}><span style={{fontSize: "2em"}} className="material-symbols-outlined">group</span></NavLink>
            <NavLink to={"/Chat/"} className={classes.NavButton}><span style={{fontSize: "2em"}} className="material-symbols-outlined">forum</span></NavLink>
            <NavLink to={"/Profile/"} className={classes.NavButton}><span style={{fontSize: "2em"}} className="material-symbols-outlined">account_circle</span></NavLink>
            <NavLink to={"/Settings/"} className={classes.NavButton}><div className={classes.SettingsButton}><span style={{fontSize: "2em"}} className={`material-symbols-outlined`}>settings</span></div></NavLink>
        </div>
    )
}

export default Navigation