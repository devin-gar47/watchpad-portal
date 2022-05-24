import React from 'react'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import { createMemoryHistory } from 'history'
import FollowButton from '../../components/FollowButton'
import { render } from '@testing-library/react'
import { Router } from 'react-router-dom'
import { combineReducers } from 'redux'
import userSlice from '../../redux/reducers/user/userSlice'

const myStore = configureStore({
    reducer: combineReducers({
        userInformation: userSlice,
    }),
})

const history = createMemoryHistory()

const followerUsername = 'username'
const followeeUsername = 'username2'

it('should render login button', () => {
    const { getByTestId } = render(
        <Provider store={myStore}>
            <Router location={history.location} navigator={history}>
                <FollowButton
                    followerUsername={followerUsername}
                    followeeUsername={followeeUsername}
                />
            </Router>
        </Provider>
    )

    const actual = getByTestId('login-button')
    const expected = 'Login'
    expect(actual).toHaveTextContent(expected)
})
