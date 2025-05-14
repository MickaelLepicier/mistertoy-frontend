import { useState } from 'react'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'
import { login, signup } from '../store/user/user.actions.js'
import { LoginForm } from './LoginForm.jsx'

export function LoginSignup() {
    const [isSignup, setIsSignUp] = useState(false)

    function onLogin(credentials) {
        isSignup ? _signup(credentials) : _login(credentials)
    }

    async function _login(credentials) {
        try {
            await login(credentials)
            showSuccessMsg('Logged in successfully')
        } catch (error) {
            showErrorMsg('Oops try again')
        }
    }

    async function _signup(credentials) {
        try {
            await signup(credentials)
            showSuccessMsg('Logged in successfully')
        } catch (error) {
            showErrorMsg('Oops try again')
        }
    }

    return (
        <section className="login">
            <LoginForm onLogin={onLogin} isSignup={isSignup} />
            <div className="btns">
                <a href="#" onClick={() => setIsSignUp(prev => !prev)}>
                    {isSignup
                        ? 'Already a member? Login'
                        : 'New user? Signup here'}
                </a>
            </div>
        </section>
    )
}
