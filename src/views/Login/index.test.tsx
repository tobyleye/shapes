import { screen, render } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import Login, { PasswordInput } from "."
import { AuthProvider } from "../../contexts/Auth"


describe('Login form field Interactions', () => {   

    test('toggle password visiblity', () => {
        render(<PasswordInput aria-label="password"/>)

        let visiblityToggle = screen.getByRole('button')
        let input = screen.getByLabelText('password')
        userEvent.click(visiblityToggle)
        expect(input).toHaveAttribute('type', 'text')
        userEvent.click(visiblityToggle)
        expect(input).toHaveAttribute('type', 'password')
    });
   
})

describe('Login', () => {
    beforeEach(() => {
        render(
            <AuthProvider>
                <Login />
            </AuthProvider>)
    })
    
    test('disable login button when login form is submitting', async () => {
        userEvent.type(screen.getByLabelText('password'), 'random')
        let submitBtn = screen.getByRole('button', { name: /login/i });
        userEvent.click(submitBtn)
        expect(submitBtn).toHaveAttribute('disabled')
    })
    
    test('loggin in with incorrect password displays an error message', async () => {
        userEvent.type(screen.getByLabelText('password'), 'random')
        let submitBtn = screen.getByRole('button', { name: /login/i });
        userEvent.click(submitBtn)
        await screen.findByText(/incorrect password/i)
    })
    
})
