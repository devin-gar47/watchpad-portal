import { render } from '@testing-library/react'
import NavigationBar from '../../components/NavigationBar'

it('should render NavigationBar component correctly', () => {
    const { getByText } = render(<NavigationBar />)

    const title = getByText('WatchPad')
    expect(title).toHaveTextContent('WatchPad')
})
