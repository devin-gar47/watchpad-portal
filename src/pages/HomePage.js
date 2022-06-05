import React from 'react'
import Row from '../components/Row'
import requests from '../requests'
import MostCommentedMedia from '../components/MostCommentedMedia'

function HomePage() {
    return (
        <div className="body">
            <Row title="Trending Now" fetchUrl={requests.fetchPopular} />
            <Row
                title="Recommended For You"
                fetchUrl={requests.fetchTopRated}
            />

            <MostCommentedMedia title="Most Commented Media" />
        </div>
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
