import { fireEvent, render } from '@testing-library/react'
import { createMemoryHistory } from 'history'
import { Router } from 'react-router-dom'
import LoginForm from '../../components/LoginForm'

import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import rootReducer from '../../redux/reducers'

const myStore = configureStore({
    reducer: rootReducer,
    devTools: true,
})

it('should trigger email onchange event', () => {
    const setIsLoadingMock = jest.fn()
    const history = createMemoryHistory()
    const { getByTestId } = render(
        <Provider store={myStore}>
            <Router location={history.location} navigator={history}>
                <LoginForm setIsLoading={setIsLoadingMock} />
            </Router>
        </Provider>
    )

    const emailInputBox = getByTestId('login-form-email-input-box')
    expect(emailInputBox.value).toEqual('')
    fireEvent.change(emailInputBox, { target: { value: 'test@gmail.com' } })
    expect(emailInputBox.value).toEqual('test@gmail.com')
})

it('should trigger password change event', () => {
    const setIsLoadingMock = jest.fn()
    const history = createMemoryHistory()
    const { getByTestId } = render(
        <Provider store={myStore}>
            <Router location={history.location} navigator={history}>
                <LoginForm setIsLoading={setIsLoadingMock} />
            </Router>
        </Provider>
    )

    const passwordInputBox = getByTestId('login-form-password-input-box')
    expect(passwordInputBox.value).toEqual('')
    fireEvent.change(passwordInputBox, { target: { value: 'password' } })
    expect(passwordInputBox.value).toEqual('password')
})

it('should trigger form handleSubmit function', () => {
    const setIsLoadingMock = jest.fn()
    const history = createMemoryHistory()
    const { getByTestId } = render(
        <Provider store={myStore}>
            <Router location={history.location} navigator={history}>
                <LoginForm setIsLoading={setIsLoadingMock} />
            </Router>
        </Provider>
    )
    const form = getByTestId('login-form')
    fireEvent.submit(form)
})
