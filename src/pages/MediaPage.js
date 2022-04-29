import axios from 'axios'
import React from 'react'
import { Button } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import {useState} from 'react'



function MediaPage() {
   let params = useParams()
    
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
   const [movie, setMovie] = useState('WAITING FOR DATA')
    const getMovieInfo = async() =>{
    const response = await fetch(`https://api.themoviedb.org/3/movie/${params.movieId}?api_key=${process.env.REACT_APP_APIKEY}&language=en-US`) 
    const data = await response.json()
    setMovie(data)
    console.log(movie)
    console.log(data)
    return data
 }

getMovieInfo()
    
    let string = `Title: ${movie.title}, Id: ${params.movieId}, ${movie.overview} `
     return <h1> {string} </h1>
}



export default MediaPage
