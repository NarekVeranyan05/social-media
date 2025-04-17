import { render, screen } from "@testing-library/react"
import Profile from "../../../pages/ProfilePage/Profile"
import { combineReducers } from "redux"
import { configureStore } from "@reduxjs/toolkit"
import { Provider } from "react-redux"
import React from "react"

describe('Profile', () => {
    it('displays name correctly', async() =>{
        const authDataReducer = () => {
            return {
                isLoggedIn: true,
            }
        }
        const userDataReducer = () => {
            return {
                isLoggedInUser: true,
                aboutMe: "",
                status: null,
                contacts: {       
                    facebook: null,
                    website: null,
                    vk: null,
                    twitter: null,
                    instagram: null,
                    youtube: null,
                    github: null,
                    mainLink: null
                },
                fullName: "Antuan",
                userID: 10,
                photos: {
                    small: null,
                    large: null 
                },
                lookingForAJobDescription: ""
            }
        }
        const reducer = combineReducers({
            authData: authDataReducer,
            userData: userDataReducer
        })
        const store = configureStore({reducer})

        let props={
            params: {userID: 1000},
            userID: 1000
        }
        render(<Provider store={store}><Profile {...props}/></Provider>)
        let nameElement = await screen.findByRole("userName")
        expect(nameElement).toHaveTextContent("Antuan")
    })
})