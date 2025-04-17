import { render, screen } from "@testing-library/react"
import { Provider } from "react-redux"
import Description from "../Description"
import { combineReducers } from "redux"
import { configureStore } from "@reduxjs/toolkit"
import StatusForm from "../Status/StatusForm"
import React from "react"

it('expect status form to view when viewing our profile that has no status', () => {
    let props={
        isLoading: false,
        isPinned: false,
        setIsPinnedManager: (newPinStatusWithMemo: boolean) => {}
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
            lookingForAJobDescription: ""
        }
    }
    const reducer = combineReducers({
        userData: userDataReducer
    })
    const store = configureStore({reducer})

    render(<Provider store={store}><Description {...props}/></Provider>)
    const statusFormElement = screen.getByRole("status_input")
    expect(statusFormElement).toBeInTheDocument()
})