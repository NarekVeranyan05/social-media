import { fireEvent, render, screen } from "@testing-library/react"
import LoginForm from "../LoginForm"
import { act } from "react-dom/test-utils"
import React from "react"

describe("LoginForm", () => {
    it('inputs data correctly', async() => {
        render(<LoginForm loginUser={(object) => { } } isLoggedIn={false}></LoginForm>)
        let emailInputElement = await screen.findByPlaceholderText(/email/i)
        let passwordInputElement = await  screen.findByPlaceholderText(/password/i)
        let checkboxElement = await screen.findByRole("checkbox")
        let submitElement = await screen.findByRole("button")

        act(() => {
            fireEvent.change(emailInputElement, {target: {value: "my email this is"}})
            fireEvent.change(passwordInputElement, {target: {value: "my password this is"}})
            fireEvent.click(checkboxElement)
            fireEvent.click(submitElement)
        })
    
        let errorElement = await screen.findByTestId("error-message")
        expect(errorElement).toBeInTheDocument()
    })
})