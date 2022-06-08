import React, { useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import SignupForm from '../components/SignupForm'
import Loading from '../components/Loading'

function SignupPage() {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')

    return (
        <>
            <style>
                {`
                    body {
                        height: calc(100vh - 58px) !important;
                        background: rgb(8, 45, 68) !important;
                        background: linear-gradient(
                            90deg,
                            rgba(8, 45, 68, 1) 0%,
                            rgba(1, 24, 38, 1) 50%,
                            rgba(2, 24, 38, 1) 100%
                        ) !important;
                        color: $color_cream;
                    }
                    `}
            </style>
            <Row className="initial-page-height justify-content-center align-items-center">
                <Col
                    lg={6}
                    className="shadow p-5 rounded justify-content-center align-items-center text-center bg-light bg-gradient"
                >
                    {!isLoading ? (
                        <SignupForm
                            setIsLoading={setIsLoading}
                            setError={setError}
                            error={error}
                        />
                    ) : (
                        <Loading message="Attempting to sign you up..." />
                    )}
                </Col>
            </Row>
        </>
    )
}

export default SignupPage
