import React from 'react'
import { useParams } from 'react-router-dom'

const mediaInfo = () => {
  return (
    <div><div style = {{display: 'flex', marginTop: '10px', marginBottom: '10px'}}>
    <img
        key={movie.id}
        height = '300px'
        src={`${base_url}${movie.poster_path}`}
        alt={movie.title}
    />
    </div>
    <h2> Id: {params.movieId} </h2>
    <h3> {movie.overview} </h3></div>
  )
}

export default mediaInfo