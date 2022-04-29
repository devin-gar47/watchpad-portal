import axios from 'axios'
import React from 'react'
import { Button } from 'react-bootstrap'
import { useParams } from 'react-router-dom'

function MediaPage() {
    let params = useParams()
    return <h1>Movie Id: {params.movieId}</h1>
    /*
    async function fetchData() {
    let fetchUrl = `https://api.themoviedb.org/3/movie/${params.movieId}?${process.env.REACT_APP_APIKEY}=&language=en-US`
    console.log(fetchUrl)
    const data = await axios.get(fetchUrl)
    console.log(data);

    var obj = data.parseJSON('{"title": ""}');
    return data

    }
    */
}

export default MediaPage
