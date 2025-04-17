import authDataReducer, { setAuthDataActionCreator } from "../AuthDataReducer"

it('creates auth data properly', () => {
    var action = setAuthDataActionCreator(true, "Suk Madik", 1079)
    var state = {    
        isInitialized: true,
        isLoggedIn: false,
        loggedInUserName: null,
        loggedInUserID: null,
    }

    let newState = authDataReducer(state, action)
    expect(newState.isLoggedIn).toBe(true)
    expect(newState.loggedInUserName).toBe("Suk Madik")
    expect(newState.loggedInUserID).toBe(1079)
})