import axios from 'axios'
import React, { useState } from 'react'
import { Alert, Button, Col, Form, Row } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'

function SignupPage() {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [error, setError] = useState('')
    const [usernameValidation, setUsernameValidation] = useState('')
    const [emailValidation, setEmailValidation] = useState('')
    const [passwordValidation, setPasswordValidation] = useState('')
    let navigate = useNavigate()

    function isValid(userInfoObj) {
        const { username, email, password, confirmPassword } = userInfoObj
        let valid = true

        if (!username) {
            setUsernameValidation('Username cannot be blank.')
            valid = false
        }
        if (!email) {
            setEmailValidation('Email cannot be blank.')
            valid = false
        }
        if (!password) {
            setPasswordValidation('Password cannot be blank.')
            valid = false
        }
        if (password !== confirmPassword) {
            setPasswordValidation('Passwords must match.')
            valid = false
        }
        return valid
    }

    function handleChange(e) {
        e.preventDefault()
        setEmailValidation('')
        setUsernameValidation('')
        setPasswordValidation('')
        const { name, value } = e.target
        switch (name) {
            case 'username':
                setUsername(value)
                break
            case 'email':
                setEmail(value)
                break
            case 'password':
                setPassword(value)
                break
            case 'confirmPassword':
                setConfirmPassword(value)
                break
            default:
                return
        }
    }

    async function handleSubmit(e) {
        e.preventDefault()
        const userInfoObj = {
            username,
            email,
            password,
            confirmPassword,
        }
        if (!isValid(userInfoObj)) return

        try {
            await axios.post(
                `${process.env.REACT_APP_API_BASE_URL}/api/user/sign-up`,
                userInfoObj
            )
            navigate('/login')
        } catch (err) {
            if (!err.response) {
                setError('Server currently is not running.')
                return
            }
            const errorMessage = err?.response?.data
            setError(errorMessage)
        }
    }

    return (
        <>
            <Row className="initial-page-height justify-content-center align-items-center bg-light bg-gradient">
                <Col
                    lg={6}
                    className="shadow p-5 rounded justify-content-center align-items-center"
                >
                    <Alert variant="danger" hidden={!error}>
                        {error}
                    </Alert>
                    <Form
                        className="text-center"
                        onSubmit={(e) => handleSubmit(e)}
                    >
                        <h4 className="mb-3">Create an Account</h4>
                        <Row className="mb-3">
                            <Col>
                                <Form.Control
                                    name="username"
                                    type="text"
                                    placeholder="Username"
                                    value={username}
                                    onChange={(e) => handleChange(e)}
                                />
                                <Form.Text
                                    className="text-danger"
                                    hidden={!usernameValidation}
                                >
                                    {usernameValidation}
                                </Form.Text>
                            </Col>
                            <Col>
                                <Form.Control
                                    name="email"
                                    type="email"
                                    placeholder="Email"
                                    value={email}
                                    onChange={(e) => handleChange(e)}
                                />
                                <Form.Text
                                    className="text-danger"
                                    hidden={!emailValidation}
                                >
                                    {emailValidation}
                                </Form.Text>
                            </Col>
                        </Row>
                        <Row className="mb-3">
                            <Col>
                                <Form.Control
                                    name="password"
                                    type="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => handleChange(e)}
                                />
                                <Form.Text
                                    className="text-danger"
                                    hidden={!passwordValidation}
                                >
                                    {passwordValidation}
                                </Form.Text>
                            </Col>
                            <Col>
                                <Form.Control
                                    name="confirmPassword"
                                    type="password"
                                    placeholder="Confirm Password"
                                    value={confirmPassword}
                                    onChange={(e) => handleChange(e)}
                                />
                            </Col>
                        </Row>
                        <Button className="text-center" type="submit">
                            Sign Up
                        </Button>
                        <Link to="/login">
                            <p className="mt-3">Have an account already?</p>
                        </Link>
                    </Form>
                </Col>
            </Row>
        </>
    )
}

export default SignupPage
