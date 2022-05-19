import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

function AddWatchlist() {
    let params = useParams()

    const userInformation = useSelector((store) => store.userInformation)
    const [watchlist, setWatchlist] = useState([])
    const [watchlistEntry, setWatchlistEntry] = useState({})

    const addToWatchlist = async (event) => {
        event.persist()
        axios
            .post(
                `${process.env.REACT_APP_API_BASE_URL}/api/watchlist/add-to-watchlist`,
                {
                    user: { id: userInformation.id },
                    media: { id: params.movieId },
                }
            )

            .then((response) => {
                console.log(response)
            })

        setWatchlist([...watchlist, watchlistEntry])
        event.preventDefault()
        setWatchlistEntry({})
    }

    const removeFromWatchlist = async (event) => {
        event.persist()
        axios
            .delete(
                `${process.env.REACT_APP_API_BASE_URL}/api/watchlist/remove-from-watchlist`,
                {
                    data: {
                        user: { id: userInformation.id },
                        media: { id: params.movieId },
                    },
                }
            )
            .then((response) => {
                console.log(response)
            })
        setWatchlist([...watchlist, watchlistEntry])
        event.preventDefault()
        setWatchlistEntry({})
    }

    return (
        <div>
            <Button onClick={addToWatchlist} variant="success">
                Add To WatchList
            </Button>
            <Button onClick={removeFromWatchlist} variant="danger">
                Remove From WatchList
            </Button>
        </div>
    )
}

export default AddWatchlist
