import { render, screen } from "@testing-library/react"
import { BrowserRouter } from "react-router-dom"
import { Provider } from 'react-redux';
import ProfileContainer from "../../pages/Profile/ProfileContainer"
import store from "../../Redux/Store"
import ChatsContainer from "../../components/Chats/ChatsContainer";
import Profile from "../../pages/Profile/Profile";
import React from "react";

it('redirects correctly for routes except profile', () => {
    render(<BrowserRouter><Provider store={store}><ChatsContainer isLoggedIn={false}/></Provider></BrowserRouter>)
    let chatsElement = screen.queryByTestId("chats")
    expect(chatsElement).toBe(null)
})

describe('without logging in, profile views unless viewing ours', () => {
    let props={
        userID: 1000,
        userName: "Antuan",
        userImage: null,
        backgroundImage: null,
        aboutMe: null,
        lookingForAJob: false,
        lookingForAJobDescription: null,
        contacts: {}
    }

    it('stays at profile when viewing others profile without logging in', () => {
        render(<BrowserRouter><Provider store={store}><Profile {...{loggedInUserID: null, isLoggedIn: false, ...props, }} params={{userID: 1000}}/></Provider></BrowserRouter>)
        let profileElement = screen.queryByTestId("profile")
        expect(profileElement).toBeInTheDocument()
    })
    

    it('redirects correctly when viewing profile without logging in', () => {
        render(<BrowserRouter><Provider store={store}><ProfileContainer {...{loggedInUserID: null, isLoggedIn: false, ...props }} params={{}}/></Provider></BrowserRouter>)
        let profileElement = screen.queryByTestId("profile")
        expect(profileElement).not.toBeInTheDocument()
    })
})
