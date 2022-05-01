import React from 'react'
import { Spinner } from 'react-bootstrap'

function Loading({ message }) {
    return (
        <>
            <Spinner animation="border" />
            <p data-testid="loading-message">{message}</p>
        </>
    )
}

export default Loading
