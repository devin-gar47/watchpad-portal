import React from 'react'
import Row from '../components/Row'
import requests from '../requests'

function HomePage() {
    return (
        <Row
            title="Trending Now"
            fetchUrl={requests.fetchPopular}
            className="body"
        />
    )
    /*
    async function testCall() {
        try {
            const data = await axios.get(
                `${process.env.REACT_APP_API_BASE_URL}/hello-world`
            )
            console.log(
                'SUCCESS',
                process.env.NODE_ENV,
                process.env.REACT_APP_API_BASE_URL,
                data.data
            )
        } catch (e) {
            console.log(
                'FAILURE',
                process.env.NODE_ENV,
                process.env.REACT_APP_API_BASE_URL
            )
            console.log(e)
        }
    }
    return <Button onClick={testCall}>Test</Button>
}
*/
}
export default HomePage
