import { render, screen } from "@testing-library/react"
import Header from "../Header"
import { BrowserRouter } from 'react-router-dom'
import { Provider } from "react-redux"
import { combineReducers, configureStore } from "@reduxjs/toolkit"
import React from "react"

describe('Header', () => {
    it('should display logged-in user name corectly', () => {
        const authDataReducer = () => {
            return {
                isLoggedIn: true,
                loggedInUserName: "Ashot"
            }
        }
        const reducer = combineReducers({
            authData: authDataReducer,
        })
        const store = configureStore({reducer})

        render(<BrowserRouter><Provider store={store}><Header/></Provider></BrowserRouter>)
        const userNameElement = screen.getByRole("userIndicator")
        expect(userNameElement).toBeInTheDocument();
    })
    
    it('should display login button corectly', () => {
        const authDataReducer = () => {
            return {
                isLoggedIn: false,
                loggedInUserName: null
            }
        }
        const reducer = combineReducers({
            authData: authDataReducer,
        })
        const store = configureStore({reducer})

        render(<BrowserRouter><Provider store={store}><Header/></Provider></BrowserRouter>)
        const loginElement = screen.getByRole("link", {name: "Log in"})
        expect(loginElement).toBeInTheDocument();
    })
})