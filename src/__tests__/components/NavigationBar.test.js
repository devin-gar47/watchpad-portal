import { render } from '@testing-library/react'
import NavigationBar from '../../components/NavigationBar'

import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import rootReducer from '../../redux/reducers'

const myStore = configureStore({
    reducer: rootReducer,
    devTools: true,
})

it('should render NavigationBar component correctly', () => {
    const { getByText } = render(
        <Provider store={myStore}>
            <NavigationBar />
        </Provider>
    )

    const title = getByText('WatchPad')
    expect(title).toHaveTextContent('WatchPad')
})
