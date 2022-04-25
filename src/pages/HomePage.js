import axios from 'axios'
import React from 'react'
import { Button } from 'react-bootstrap'

function HomePage() {
    async function testCall() {
        try {
            const data = await axios.get('http://localhost:8080/hello-world')
            console.log(data.data)
        } catch (e) {
            console.log(e)
        }
    }
    console.log('testing webhook')
    return <Button onClick={testCall}>Test</Button>
}

export default HomePage
