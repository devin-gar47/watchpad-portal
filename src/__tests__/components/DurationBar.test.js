import React from 'react'
import { fireEvent, render } from '@testing-library/react'
import DurationBar from '../../components/DurationBar'

it('should trigger onChange event for slider and render correct position', () => {
    const { getByTestId } = render(<DurationBar />)

    const slider = getByTestId('duration-bar-slider')

    fireEvent.change(slider, { target: { value: 2 } })

    const actual = getByTestId('duration-bar-converted-position')
    const expected = '00:00:02'

    expect(actual).toHaveTextContent(expected)
})

it('should click play button', () => {
    const { getByTestId } = render(<DurationBar />)

    const playButton = getByTestId('play-button')
    fireEvent.click(playButton)
})

it('should click pause button', () => {
    const { getByTestId } = render(<DurationBar />)

    const playButton = getByTestId('play-button')
    fireEvent.click(playButton)

    const pauseButton = getByTestId('pause-button')
    fireEvent.click(pauseButton)
})

it('should reset current position to zero since current position is greater than runtime in seconds', () => {
    const { getByTestId } = render(<DurationBar runtime={1} />)

    const slider = getByTestId('duration-bar-slider')

    fireEvent.change(slider, { target: { value: 62 } })

    const playButton = getByTestId('play-button')
    fireEvent.click(playButton)
})
