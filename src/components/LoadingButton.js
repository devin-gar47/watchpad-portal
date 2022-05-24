import React, { useState } from 'react'
import { Button, Spinner } from 'react-bootstrap'

function LoadingButton({ button, isLoading, message }) {
    return isLoading ? (
        <Button variant="primary" disabled data-testid="loading-button">
            <Spinner
                as="span"
                animation="grow"
                size="sm"
                role="status"
                aria-hidden="true"
            />
            {message}
        </Button>
    ) : (
        button
    )
}

export default LoadingButton
