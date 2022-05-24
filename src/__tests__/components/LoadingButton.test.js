import { render } from '@testing-library/react'
import React from 'react'
import { Button } from 'react-bootstrap'
import LoadingButton from '../../components/LoadingButton'

const button = (
    <Button
        data-testid="follow-button"
        variant="primary"
        onClick={() => followUser()}
    >
        Follow
    </Button>
)

const unfolowButton = (
    <Button
        data-testid="follow-button"
        variant="primary"
        onClick={() => followUser()}
    >
        Following
    </Button>
)

it('should render loading button because isLoading is true', () => {
    const { getByTestId } = render(
        <LoadingButton
            button={button}
            isLoading={true}
            message="some message"
        />
    )

    const actual = getByTestId('loading-button')
    const expected = 'some message'

    expect(actual).toHaveTextContent(expected)
})

it('should render button that was passed as prop', () => {
    const { getByTestId } = render(
        <LoadingButton
            button={button}
            isLoading={false}
            message="some message"
        />
    )

    const actual = getByTestId('follow-button')
    const expected = 'Follow'

    expect(actual).toHaveTextContent(expected)
})
