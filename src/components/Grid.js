import React, { useState, useEffect } from 'react'
import '../components/Grid.css'
import { useNavigate } from 'react-router-dom'
import Container from 'react-bootstrap/Container'

const base_url = 'https://image.tmdb.org/t/p/original/'
function Grid({ searchQuery }) {
    const [movies, setMovie] = useState([])
    let fetchUrl = `https://api.themoviedb.org/3/search/multi/?api_key=${process.env.REACT_APP_APIKEY}&language=en-US&query=${searchQuery}`
    const getSearchResults = async () => {
        const response = await fetch(fetchUrl)
        const data = await response.json()
        setMovie(data.results)
        console.log(data.results)
        return data
    }
    useEffect(() => {
        getSearchResults()
    }, [fetchUrl])

    let navigate = useNavigate()
    const handleClick = (movie_id, movie_title) => {
        let path = `/media/${movie_id}`
        navigate(path)
    }

    return (
        <div className="movie-page">
            <Container fluid>
                {movies.length > 0 ? (
                    <div className="grid">
                        {movies.map((movie) => (
                            <img
                                key={movie.id}
                                onClick={() =>
                                    handleClick(movie.id, movie.title)
                                }
                                className="grid_poster"
                                src={`${base_url}${movie.poster_path}`}
                                alt={movie.title}
                            />
                        ))}
                    </div>
                ) : (
                    <h2 className="no-movies">
                        No search results could be found.
                    </h2>
                )}
            </Container>
        </div>
    )
}

export default Grid
