import React, { useEffect, useState } from 'react'
import axios from 'axios'
import '../css/GIFs.css'
import Loading from './Loading'

const CommentGIFs = (props) => {
    const [data, setData] = useState([])
    const [search, setSearch] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false)

    useEffect(() => {
        async function getTrendingGIFs() {
            setIsError(false)
            setIsLoading(true)

            try {
                const result = await axios(
                    'https://api.giphy.com/v1/gifs/trending',
                    {
                        params: {
                            api_key: process.env.REACT_APP_GIPHY_APIKEY,
                            limit: 50,
                            rating: 'g',
                        },
                    }
                )

                setData(result.data.data)
                setIsLoading(false)
                return result
            } catch (err) {
                setIsError(true)
                setIsLoading(false)
                console.log(`Error getting trending GIFs: ${err}`)
                setTimeout(() => setIsError(false), 5000)
            }
        }
        getTrendingGIFs()
    }, [])

    const renderError = () => {
        if (isError) {
            return (
                <div>
                    <p>Could not load GIFs... Try again later. :(</p>
                </div>
            )
        }
    }

    const renderGIFs = () => {
        if (isLoading) {
            return (
                <div>
                    <Loading message="Loading GIFs..." />
                </div>
            )
        }
        return data.map((gif) => {
            return (
                <img
                    key={gif.id}
                    className="gif"
                    src={`${gif.images.fixed_height.url}`}
                    alt={gif.id}
                    onClick={() => clickedGIF(gif.images.fixed_height.url)}
                />
            )
        })
    }

    const clickedGIF = (url) => {
        props.setgifURL(`${url}`)
        props.onHide()
    }

    const handleSearchChange = (event) => {
        setSearch(event.target.value)
    }

    const handleSearchSubmit = async (event) => {
        //prevent page refresh
        event.preventDefault()

        setIsError(false)
        setIsLoading(true)

        try {
            const result = await axios('https://api.giphy.com/v1/gifs/search', {
                params: {
                    api_key: process.env.REACT_APP_GIPHY_APIKEY,
                    limit: 50,
                    rating: 'g',
                    lang: 'en',
                    q: search,
                },
            })

            setData(result.data.data)
            setIsLoading(false)
            return result
        } catch (err) {
            setIsError(true)
            setIsLoading(false)
            console.log(`Error trying to search GIFs: ${err}`)
            setTimeout(() => setIsError(false), 5000)
        }
    }

    return (
        <div>
            <>{renderError()}</>
            <form className="form-inline justify-content-center">
                <input
                    type="text"
                    placeholder="search"
                    onChange={handleSearchChange}
                    value={search}
                />
                <button
                    type="submit"
                    className="btn"
                    onClick={handleSearchSubmit}
                >
                    Go
                </button>
            </form>
            <div className="grid">{renderGIFs()}</div>
        </div>
    )
}

export default CommentGIFs
