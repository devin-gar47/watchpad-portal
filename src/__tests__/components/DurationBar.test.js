import React from 'react'
import { fireEvent, render } from '@testing-library/react'
import DurationBar from '../../components/DurationBar'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'

import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import rootReducer from '../../redux/reducers'
import axios from 'axios'

jest.mock('axios')

const myStore = configureStore({
    reducer: rootReducer,
    devTools: true,
})

beforeEach(() => {
    Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: jest.fn().mockImplementation((query) => ({
            matches: false,
            media: query,
            onchange: null,
            addListener: jest.fn(), // deprecated
            removeListener: jest.fn(), // deprecated
            addEventListener: jest.fn(),
            removeEventListener: jest.fn(),
            dispatchEvent: jest.fn(),
        })),
    })
})

it('should trigger onChange event for slider and render correct position', () => {
    const setIsLoadingMock = jest.fn()
    const history = createMemoryHistory()
    axios.get.mockResolvedValue({
        response: { data: [{ user: { username: 'username' } }] },
    })
    const { getByTestId } = render(
        <Provider store={myStore}>
            <Router location={history.location} navigator={history}>
                <DurationBar setIsLoading={setIsLoadingMock} runtime={100} />
            </Router>
        </Provider>
    )

    const slider = getByTestId('duration-bar-slider')

    fireEvent.change(slider, { target: { value: 2 } })

    const actual = getByTestId('duration-bar-converted-position')
    const expected = '00:00:02'

    expect(actual).toHaveTextContent(expected)
})

it('should click play button', () => {
    const setIsLoadingMock = jest.fn()
    const history = createMemoryHistory()
    axios.get.mockResolvedValue({
        response: { data: [{ user: { username: 'username' } }] },
    })

    const { getByTestId } = render(
        <Provider store={myStore}>
            <Router location={history.location} navigator={history}>
                <DurationBar setIsLoading={setIsLoadingMock} runtime={100} />
            </Router>
        </Provider>
    )

    const playButton = getByTestId('play-button')
    fireEvent.click(playButton)
})

it('should click pause button', () => {
    const setIsLoadingMock = jest.fn()
    const history = createMemoryHistory()
    axios.get.mockResolvedValue({
        response: { data: [{ user: { username: 'username' } }] },
    })

    const { getByTestId } = render(
        <Provider store={myStore}>
            <Router location={history.location} navigator={history}>
                <DurationBar setIsLoading={setIsLoadingMock} runtime={100} />
            </Router>
        </Provider>
    )

    const playButton = getByTestId('play-button')
    fireEvent.click(playButton)

    const pauseButton = getByTestId('pause-button')
    fireEvent.click(pauseButton)
})

it('should reset current position to zero since current position is greater than runtime in seconds', () => {
    const setIsLoadingMock = jest.fn()
    const history = createMemoryHistory()
    axios.get.mockResolvedValue({
        response: { data: [{ user: { username: 'username' } }] },
    })

    const { getByTestId } = render(
        <Provider store={myStore}>
            <Router location={history.location} navigator={history}>
                <DurationBar runtime={1} setIsLoading={setIsLoadingMock} />
            </Router>
        </Provider>
    )

    const slider = getByTestId('duration-bar-slider')

    fireEvent.change(slider, { target: { value: 62 } })

    const playButton = getByTestId('play-button')
    fireEvent.click(playButton)
})
