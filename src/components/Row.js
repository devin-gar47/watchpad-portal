import React, { useState, useEffect } from 'react'
import axios from '../axios'
import './Row.css'
import { useNavigate } from 'react-router-dom'

const base_url = 'https://image.tmdb.org/t/p/original/'

function Row({ title, fetchUrl }) {
    const [movies, setMovies] = useState([])

    useEffect(() => {
        //if [], run once when the row loads, and don't run again
        async function fetchData() {
            const request = await axios.get(fetchUrl)
            console.log(request.data.results)
            setMovies(request.data.results)
            return request
        }
        fetchData()
    }, [fetchUrl])

    let navigate = useNavigate()
    const handleClick = (movie_id, movie_title) => {
        let path = `/media/${movie_id}`
        navigate(path)
    }
    return (
        <div className="row">
            <h2>{title}</h2>
            <div className="row_posters">
                {movies.map((movie) => (
                    <img
                        key={movie.id}
                        onClick={() => handleClick(movie.id, movie.title)}
                        className="row_poster"
                        src={`${base_url}${movie.poster_path}`}
                        alt={movie.title}
                    />
                ))}
            </div>
            {/* containers -> posters */}
        </div>
    )
}

export default Row
