import axios from 'axios'
import React, { useState } from 'react'
import { Alert, Button, Form } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { loginSuccess } from '../redux/reducers/user/userSlice'

function LoginForm({ setIsLoading, setError, error }) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
    const dispatch = useDispatch()

    async function handleLoginSubmit(e) {
        e.preventDefault()
        setIsLoading(true)
        try {
            const { data } = await axios.post(
                `${process.env.REACT_APP_API_BASE_URL}/api/user/login`,
                { email, password }
            )
            dispatch(loginSuccess(data))
            navigate('/')
        } catch (err) {
            if (!err.response) {
                setError('Server currently is not running.')
                setIsLoading(false)
                return
            }
            const errorMessage = err?.response?.data
            setError(errorMessage)
            setIsLoading(false)
        }
    }

    return (
        <>
            <Alert
                variant="danger"
                hidden={!error}
                data-testid="login-form-alert"
            >
                {error}
            </Alert>
            <Form
                className="text-center"
                onSubmit={(e) => handleLoginSubmit(e)}
                data-testid="login-form"
            >
                <h4>Member Login</h4>
                <Form.Group className="mb-3">
                    <Form.Control
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        data-testid="login-form-email-input-box"
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        data-testid="login-form-password-input-box"
                    />
                </Form.Group>
                <Button
                    className="text-center"
                    type="submit"
                    data-testid="login-form-submit-button"
                >
                    Login
                </Button>
                <Link
                    to="/sign-up"
                    data-testid="login-form-link-to-sign-up-page"
                >
                    <p className="mt-3">Don't have an account?</p>
                </Link>
            </Form>
        </>
    )
}

export default LoginForm
