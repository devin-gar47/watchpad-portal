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
                    }
                    `}
            </style>
            <Row className="initial-page-height justify-content-center align-items-center bg-light bg-gradient">
                <Col
                    lg={6}
                    className="shadow p-5 rounded justify-content-center align-items-center text-center"
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
