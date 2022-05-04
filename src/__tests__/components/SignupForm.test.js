import { fireEvent, render } from '@testing-library/react'
import { createMemoryHistory } from 'history'
import { Router } from 'react-router-dom'
import SignupForm from '../../components/SignupForm'

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
                <SignupForm setIsLoading={setIsLoadingMock} />
            </Router>
        </Provider>
    )
    const emailInputBox = getByTestId('signup-form-email-input-box')
    expect(emailInputBox.value).toEqual('')
    fireEvent.change(emailInputBox, { target: { value: 'test@gmail.com' } })
    expect(emailInputBox.value).toEqual('test@gmail.com')
})

it('should trigger username onchange event', () => {
    const setIsLoadingMock = jest.fn()
    const history = createMemoryHistory()
    const { getByTestId } = render(
        <Provider store={myStore}>
            <Router location={history.location} navigator={history}>
                <SignupForm setIsLoading={setIsLoadingMock} />
            </Router>
        </Provider>
    )
    const usernameInputBox = getByTestId('signup-form-username-input-box')
    expect(usernameInputBox.value).toEqual('')
    fireEvent.change(usernameInputBox, { target: { value: 'username' } })
    expect(usernameInputBox.value).toEqual('username')
})

it('should trigger password onchange event', () => {
    const setIsLoadingMock = jest.fn()
    const history = createMemoryHistory()
    const { getByTestId } = render(
        <Provider store={myStore}>
            <Router location={history.location} navigator={history}>
                <SignupForm setIsLoading={setIsLoadingMock} />
            </Router>
        </Provider>
    )
    const passwordInputBox = getByTestId('signup-form-password-input-box')
    expect(passwordInputBox.value).toEqual('')
    fireEvent.change(passwordInputBox, { target: { value: 'password' } })
    expect(passwordInputBox.value).toEqual('password')
})

it('should trigger confirm password onchange event', () => {
    const setIsLoadingMock = jest.fn()
    const history = createMemoryHistory()
    const { getByTestId } = render(
        <Provider store={myStore}>
            <Router location={history.location} navigator={history}>
                <SignupForm setIsLoading={setIsLoadingMock} />
            </Router>
        </Provider>
    )
    const confirmPasswordInputBox = getByTestId(
        'signup-form-confirm-password-input-box'
    )
    expect(confirmPasswordInputBox.value).toEqual('')
    fireEvent.change(confirmPasswordInputBox, {
        target: { value: 'confirm password' },
    })
    expect(confirmPasswordInputBox.value).toEqual('confirm password')
})

it('should trigger default onchange event', () => {
    const setIsLoadingMock = jest.fn()
    const history = createMemoryHistory()
    const { getByTestId } = render(
        <Provider store={myStore}>
            <Router location={history.location} navigator={history}>
                <SignupForm setIsLoading={setIsLoadingMock} />
            </Router>
        </Provider>
    )
    const confirmPasswordInputBox = getByTestId(
        'signup-form-confirm-password-input-box'
    )
    expect(confirmPasswordInputBox.value).toEqual('')
    fireEvent.change(confirmPasswordInputBox, {
        target: { value: 'test@gmail.com', name: 'random name' },
    })
    expect(confirmPasswordInputBox.value).toEqual('')
})

it('should return false for isValid function because of blank text fields', () => {
    const setIsLoadingMock = jest.fn()
    const history = createMemoryHistory()
    const { getByTestId } = render(
        <Provider store={myStore}>
            <Router location={history.location} navigator={history}>
                <SignupForm setIsLoading={setIsLoadingMock} />
            </Router>
        </Provider>
    )

    const form = getByTestId('signup-form')
    fireEvent.submit(form)

    const usernameErrorText = getByTestId(
        'signup-form-username-validator-error-text'
    )
    const emailErrorText = getByTestId('signup-form-email-validator-error-text')
    const passwordErrorText = getByTestId(
        'signup-form-password-validator-error-text'
    )
    expect(usernameErrorText).toHaveTextContent('Username cannot be blank.')
    expect(emailErrorText).toHaveTextContent('Email cannot be blank.')
    expect(passwordErrorText).toHaveTextContent('Password cannot be blank.')
})

it('should return false for isValid function because passwords do not match', () => {
    const setIsLoadingMock = jest.fn()
    const history = createMemoryHistory()
    const { getByTestId } = render(
        <Provider store={myStore}>
            <Router location={history.location} navigator={history}>
                <SignupForm setIsLoading={setIsLoadingMock} />
            </Router>
        </Provider>
    )

    const passwordInputBox = getByTestId('signup-form-password-input-box')
    fireEvent.change(passwordInputBox, { target: { value: 'password' } })

    const form = getByTestId('signup-form')
    fireEvent.submit(form)
    const passwordErrorText = getByTestId(
        'signup-form-password-validator-error-text'
    )
    expect(passwordErrorText).toHaveTextContent('Passwords must match.')
})
