import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Button } from 'bootstrap'

function Watchlist() {
    let params = useParams()

    const userInformation = useSelector((store) => store.userInformation)

    const [watchlist, setWatchlist] = useState([])

    const displayWatchlist = async () => {
        const response = await axios.get(
            `${process.env.REACT_APP_API_BASE_URL}/api/watchlist/get-watchlist?userId=${userInformation.id}`
        )
        console.log(
            `${process.env.REACT_APP_API_BASE_URL}/api/watchlist/get-watchlist?userId=${userInformation.id}`
        )
        setWatchlist(response.data)
    }

    useEffect(() => {
        displayWatchlist()
    }, [])

    return (
        <div>
            <h1>Watchlist</h1>
            <ul>
                {watchlist.map((item) => (
                    <li key={item.mediaId}>{item.media.title}</li>
                ))}
            </ul>
        </div>
    )
}
