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

            // setMediaIdList(response.data)

            const mediaIdArr = data
            console.log('mediaIdArr = ', mediaIdArr)

            const mediaObjectsToGetPosterPath = mediaIdArr.map(
                async (mediaId) => {
                    const response = await axios.get(
                        `https://api.themoviedb.org/3/movie/${mediaId}?api_key=${process.env.REACT_APP_APIKEY}&language=en-US`
                    )
                    const { data } = response
                    //console.log("POSTER PATH: ", data.poster_path)
                    const mediaObjArr = data
                    const tmdbPosterLink = `${base_url}${data.poster_path}`
                    console.log('mediaObjArr = ', mediaObjArr)
                    //console.log("POSTER LINK: ", tmdbPosterLink)
                    setMedia([...media, mediaObjArr])
                    return mediaObjArr
                }
            )

            console.log('MEDIA HERE!!!!!!!!!!!, ', media)

            const posterPaths = await Promise.all(mediaObjectsToGetPosterPath)
            setMedia(posterPaths)
            console.log('Media Objects = ', posterPaths)
            //setMediaObjectToGetPosterPath(posterPaths)

            /*
            const posterPaths = mediaObjectsToGetPosterPath.map(async (mediaObject) => {
                const response = await axios.get(
                    `https://image.tmdb.org/t/p/original/${mediaObject.poster_path}`
                )
                const { data } = response
                console.log("POSTER LINK: ", data)
                const posterPathArr = data
                console.log("posterPathArr = ", posterPathArr)
                
              })
              */

            // dispatch(setWatchlistEntries(response.data))
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

/*
   let params = useParams()
 
   const userInformation = useSelector((store) => store.userInformation)
 
   const [watchlist, setWatchlist] = useState([])
 
   const displayWatchlist = async () => {
       const response = await axios.get(
           `${process.env.REACT_APP_API_BASE_URL}/api/watchlist/get-watchlist?userId=${userInformation.id}`
       )
       console.log(
           `${process.env.REACT_APP_API_BASE_URL}/api/watchlist/get-watchlist?userId=${userInformation.id}`
       )
       console.log(response.data)
       setWatchlist(response.data)
   }
 
   useEffect(() => {
       displayWatchlist()
   }, [])
 
   return (
       <div>
           <h1>Watchlist</h1>
           <ul>
               {watchlist.map((item) => (
                   <li key={item.media.id}></li>
               ))}
           </ul>
       </div>
   )
}
*/

export default Watchlist
