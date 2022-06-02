import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Row, Col } from 'antd'
import { useNavigate } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import '../components/Grid.css'
import { setWatchlistEntries } from '../redux/reducers/watchlist/watchlistSlice'

const base_url = 'https://image.tmdb.org/t/p/original/'
function Watchlist() {
    const userInformation = useSelector((store) => store.userInformation)
    const watchlistEntries = useSelector((store) => store.watchlistEntries)

    const [media, setMedia] = useState([])

    const dispatch = useDispatch()

    const buildMediaList = async () => {
        try {
            //get a list of media IDs from the user's watchlist
            const { data } = await axios.get(
                `${process.env.REACT_APP_API_BASE_URL}/api/watchlist/get-watchlist-media?userId=${userInformation.id}`
            )
            //store the IDs in an array
            const mediaIdArr = data
            console.log('mediaIdArr = ', mediaIdArr)

            const mediaObjectsToGetPosterPath = mediaIdArr.map(
                //map over the array of media IDs to get a media object for each ID from TMDB
                async (mediaId) => {
                    const response = await axios.get(
                        `https://api.themoviedb.org/3/movie/${mediaId}?api_key=${process.env.REACT_APP_APIKEY}&language=en-US`
                    )
                    const { data } = response
                    const mediaObjArr = data
                    console.log('mediaObjArr = ', mediaObjArr)

                    //add the media objects to the media array
                    setMedia([...media, mediaObjArr])
                    return mediaObjArr
                }
            )

            console.log('MEDIA HERE!!!!!!!!!!!, ', media)

            const posterPaths = await Promise.all(mediaObjectsToGetPosterPath)
            //get the promised objects
            setMedia(posterPaths)
            //store them in the array
            console.log('Media Objects = ', posterPaths)
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        buildMediaList()
    }, [])

    let navigate = useNavigate()
    const handleClick = (media_id) => {
        let path = `/media/${media_id}`
        navigate(path)
    }

    return (
        <div className="watchlist-page">
            <Container fluid>
                {media.length > 0 ? (
                    <div className="grid">
                        {media.map((media) => (
                            <img
                                key={media.id}
                                onClick={() =>
                                    handleClick(media.id, media.title)
                                }
                                className="grid_poster"
                                src={`${base_url}${media.poster_path}`}
                                alt={media.title}
                            />
                        ))}
                    </div>
                ) : (
                    <h2 className="no-movies">
                        There are no movies in your watchlist
                    </h2>
                )}
            </Container>
        </div>
    )
}

export default Watchlist
