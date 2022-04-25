import axios from 'axios'
import React from 'react'
import { Button } from 'react-bootstrap'

function HomePage() {
    async function testCall() {
        try {
            const data = await axios.get(
                `${process.env.REACT_APP_API_BASE_URL}/hello-world`
            )
            console.log(process.env.REACT_APP_API_BASE_URL, data.data)
        } catch (e) {
            console.log(e)
        }
    }

    return <Button onClick={testCall}>Test</Button>
}

export default HomePage
