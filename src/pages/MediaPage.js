import axios from 'axios'
import React from 'react'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import '../components/Media.css'
import CommentBox from '../components/CommentBox'
import LikeDislikes from '../components/LikeDislikes'
import DurationBar from '../components/DurationBar'
import CommentDisplay from '../components/CommentDisplay'
import '../css/Buttons.css'
import '../css/Comments.css'
import AddWatchlist from '../components/AddWatchlist'
import { useSelector } from 'react-redux'
import DurationComments from '../components/DurationComments'

const base_url = 'https://image.tmdb.org/t/p/original/'
function MediaPage() {
    // const userInformation = useSelector((store) => store.userInformation)

    let params = useParams()
    const [runtime, setRuntime] = useState(0)

    // const[likesTotal, setLikesTotal] = useState(0)
    // const[dislikesTotal, setDislikesTotal] = useState(0)

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
    const getMovieInfo = async () => {
        const response = await fetch(
            `https://api.themoviedb.org/3/movie/${params.movieId}?api_key=${process.env.REACT_APP_APIKEY}&language=en-US`
        )
        const data = await response.json()
        setMovie(data)
        console.log(movie)
        console.log(data)
        setRuntime(data.runtime)
        return data
    }

    // const getTotalLikes = async () => {
    //     const response = await axios.get(
    //         `${process.env.REACT_APP_API_BASE_URL}/api/media-rating/count-likes?mediaId=${params.movieId}`
    //     )
    //     setLikesTotal(response.data)
    // }

    // const getTotalDislikes = async () => {
    //     const response = await axios.get(
    //         `${process.env.REACT_APP_API_BASE_URL}/api/media-rating/count-dislikes?mediaId=${params.movieId}`
    //     )
    //     setDislikesTotal(response.data)
    // }

    // const userAlreadyRated = async () => {
    //     const response = await axios.get(
    //         `${process.env.REACT_APP_API_BASE_URL}/api/media-rating/get-rating?mediaId=${params.movieId}&userId=${userInformation.id}`
    //     )
    //     setDislikesTotal(response.data)
    // }

    useEffect(() => {
        getMovieInfo()
        // getTotalLikes();
        // getTotalDislikes();
    }, [])

    return (
        <>
            <div>
                <h1 className="inline-block">
                    <p className="media_title">
                        {movie.title} :
                        <small class="text-muted">{params.movieId}</small>
                    </p>
                </h1>
            </div>

            <div
                className="media_poster"
                style={{
                    display: 'flex',
                    width: '100%',
                }}
            >
                <img
                    key={movie.id}
                    height="400px"
                    src={`${base_url}${movie.poster_path}`}
                    alt={movie.title}
                    rightMargin="10px"
                />

                <div className="media_description">{movie.overview}</div>
                <div className="divider" style={{ width: '20px' }} />
                <div className="comment_display">
                    <CommentDisplay />
                </div>
            </div>

            <div className="both_buttons">
                <LikeDislikes />
                <AddWatchlist />
            </div>

            <DurationBar runtime={runtime} />
            <DurationComments mediaId={movie.id} />
            <CommentBox mediaId={movie.id} />
        </>
    )
}

export default MediaPage
