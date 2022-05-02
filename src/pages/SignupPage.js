import React, { useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import SignupForm from '../components/SignupForm'
import Loading from '../components/Loading'

function SignupPage() {
    const [isLoading, setIsLoading] = useState(false)

    return (
        <>
            <Row className="initial-page-height justify-content-center align-items-center bg-light bg-gradient">
                <Col
                    lg={6}
                    className="shadow p-5 rounded justify-content-center align-items-center text-center"
                >
                    {!isLoading ? (
                        <SignupForm setIsLoading={setIsLoading} />
                    ) : (
                        <Loading message="Attempting to sign you up..." />
                    )}
                </Col>
            </Row>
        </>
    )
}

export default SignupPage
