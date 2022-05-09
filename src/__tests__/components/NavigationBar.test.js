import { render } from '@testing-library/react'
import NavigationBar from '../../components/NavigationBar'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'

import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import rootReducer from '../../redux/reducers'

const myStore = configureStore({
    reducer: rootReducer,
    devTools: true,
})

it('should render NavigationBar component correctly', () => {
    const setIsLoadingMock = jest.fn()
    const history = createMemoryHistory()
    const { getByText } = render(
        <Provider store={myStore}>
            <Router location={history.location} navigator={history}>
                <NavigationBar setIsLoading={setIsLoadingMock} />
            </Router>
        </Provider>
    )

    const title = getByText('WatchPad')
    expect(title).toHaveTextContent('WatchPad')
})
