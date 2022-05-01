import React, { useState } from 'react'
import { Col, Image, Row } from 'react-bootstrap'
import Loading from '../components/Loading'
import LoginForm from '../components/LoginForm'
import logo from '../static/watchpad_logo.png'

function LoginPage() {
    const [isLoading, setIsLoading] = useState(false)

    return (
        <>
            <Row className="initial-page-height justify-content-center align-items-center bg-light bg-gradient">
                <Col lg={6}>
                    <Row className="shadow p-5 rounded justify-content-center align-items-center">
                        <Col lg={6}>
                            <Image src={logo} height={300} rounded fluid />
                        </Col>
                        <Col
                            lg={6}
                            className="justify-content-center align-items-center text-center"
                            data-testid="login-form-container"
                        >
                            {!isLoading ? (
                                <LoginForm setIsLoading={setIsLoading} />
                            ) : (
                                <Loading message="Trying to log you in... hang tight!" />
                            )}
                        </Col>
                    </Row>
                </Col>
            </Row>
        </>
    )
}

export default LoginPage
