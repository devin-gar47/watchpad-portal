import { render } from '@testing-library/react'
import Loading from '../../components/Loading'

it('should render message text', () => {
    const { getByTestId } = render(<Loading message="some message" />)

    const actual = getByTestId('loading-message')
    const expected = 'some message'
    expect(actual).toHaveTextContent(expected)
})
