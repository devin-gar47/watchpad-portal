import React, { useState, useEffect } from 'react'
import '../components/Grid.css'
import { useNavigate } from 'react-router-dom'

const base_url = 'https://image.tmdb.org/t/p/original/'
function Grid({ searchQuery }) {
    
    const [movies, setMovie] = useState([])
    let fetchUrl =  `https://api.themoviedb.org/3/search/movie/?query=${searchQuery}&api_key=${process.env.REACT_APP_APIKEY}&language=en-US&page=1`
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

    return(
       
        <div className="row">
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

export default Grid

