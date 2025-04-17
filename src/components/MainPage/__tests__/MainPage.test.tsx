import { fireEvent, render, screen } from "@testing-library/react"
import MainPage from "../MainPage"
import { Provider } from "react-redux"
import store from "../../../Redux/Store"
import { BrowserRouter } from "react-router-dom"
import React from "react"
import { UserType } from "../../../Redux/UsersDataReducer"
import { combineReducers } from "redux"
import { configureStore } from "@reduxjs/toolkit"

describe('MainPage', () => {
    const authDataReducer = () => {
        return {
            isLoggedIn: false
        }
    }
    const usersDataReducer = () => {
        return {
            isLoading: false,
            amountOfUsers: 1, //total amount of users
            count: 9, //amount of items per page
            maxPage: 10000, //total amount of pages
            users:[
                {     
                    userName: "abc",
                    userID: 28201,
                    arrayID: 0,
                    photos: {
                      small: null,
                      large: null
                    },
                    status: null,
                    isFollowed: true,
                     
                },
            ] as Array<UserType>,
            disabledFollowButtons: [Number("-1")] as Array<number> //An array of userIDs whom the user have tried to follow
        }
    }
    const reducer = combineReducers({
        authData: authDataReducer,
        usersData: usersDataReducer
    })
    const store = configureStore({reducer})
    
    it('no follow button if not logged in', () => {
        render(<BrowserRouter><Provider store={store}><MainPage/></Provider></BrowserRouter>)
        const followButton = screen.queryAllByAltText("unfollow-follow")
        expect(followButton.length).toBe(0)
    })
    it('has correct page button amount', () => {
        render(<BrowserRouter><Provider store={store}><MainPage/></Provider></BrowserRouter>)
        const pageSelectElements = screen.getAllByRole("pageChange")
        expect(pageSelectElements.length).toBe(4)
    })
    it('emphasizes correct page when clicking', async() => {
        render(<BrowserRouter><Provider store={store}><MainPage/></Provider></BrowserRouter>)
        const pageSelectElement = await screen.getByText("4")
        await fireEvent.click(pageSelectElement)
        const pageSelectedElement = await screen.findByRole("pageChangeSelected")
        expect(pageSelectedElement).toHaveTextContent("4")
    })
})