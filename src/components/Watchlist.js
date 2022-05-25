import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Row, Col } from 'antd'
import {useNavigate} from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import '../components/Grid.css'
import { setWatchlistEntries } from '../redux/reducers/watchlist/watchlistSlice'

const base_url = 'https://image.tmdb.org/t/p/original/'
function Watchlist() {
  //let params = useParams()
    const userInformation = useSelector((store) => store.userInformation)
    const watchlistEntries = useSelector((store) => store.watchlistEntries)

  const [mediaIdList, setMediaIdList] = useState([""])
  const [mediaObjectToGetPosterPath, setMediaObjectToGetPosterPath] = useState([""])
    const [posters, setPosters] = useState([])
    
    const dispatch = useDispatch()
    
  const buildMediaIdList = async () => {
      //get a list of media IDs from the user's watchlist
      const response = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/api/watchlist/get-watchlist-media?userId=${userInformation.id}`
      ).then((response) => {
          setMediaIdList(response.data)
          console.log(response.data)
          mediaIdList.map((id) => {
              //console.log("BUILD MEDIA ID LIST: ", id)
              //console.log(JSON.stringify(`https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_APIKEY}&language=en-US`))
          }
          )
      })
      dispatch(setWatchlistEntries(response.data))
  }

    
    const buildMediaList = async () => {
        
        watchlistEntries.map((entry) => {
            console.log(entry.media.id)
            setMediaIdList([...mediaIdList, entry.media.id])
        })

        for(let i = 0; i < mediaIdList.length; i++) {
            const response = await axios.get(
                `https://api.themoviedb.org/3/movie/${watchlistEntries[i].media.id}?api_key=${process.env.REACT_APP_APIKEY}&language=en-US`
            ).then((response) => {
                setMediaObjectToGetPosterPath([...mediaObjectToGetPosterPath, response.data])
                console.log("MEDIA OBJECT: ", response.data)
            })

        }
        for (let i = 0; i < mediaObjectToGetPosterPath.length; i++) {
            const posterPath = mediaObjectToGetPosterPath[i].poster_path
            console.log("POSTER PATH: ", posterPath)
            const posterUrl = `${base_url}${posterPath}`
            setPosters([...posters, posterUrl])
            console.log("POSTER URL: ", posterUrl)
        }
    }
 
      useEffect(() => {
          buildMediaList()
      }, [...posters])
    
    
      let navigate = useNavigate()
      const handleClick = (movie_id) => {
          let path = `/media/${movie_id}`
          navigate(path)
      }
 
    return (
       <div className="watchlist-page">
           <Container fluid>
               {mediaIdList.length > 0 ? (
                   <div className="grid">
                       {mediaObjectToGetPosterPath.map((movie) => (
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
 

