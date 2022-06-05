import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import '../components/Grid.css'
import '../components/Row.css'
import '../components/MostCommentedMedia.css'

const base_url = 'https://image.tmdb.org/t/p/original/'
function MostCommentedMedia({ title }) {
    const [mostCommentedMedia, setMostCommentedMedia] = useState([])

    const dispatch = useDispatch()

    const buildMediaList = async () => {
        try {
            const { data } = await axios.get(
                `${process.env.REACT_APP_API_BASE_URL}/api/comments/get-most-popular`
            )

            const mediaIdArray = data.map(async (mediaId) => {
                const response = await axios.get(
                    `https://api.themoviedb.org/3/movie/${mediaId}?api_key=${process.env.REACT_APP_APIKEY}&language=en-US`
                )
                const { data } = response
                const mediaObjArr = data
                console.log('mediaObjArr = ', mediaObjArr)

                setMostCommentedMedia([...mostCommentedMedia, mediaObjArr])
                return mediaObjArr
            })

            const posterPaths = await Promise.all(mediaIdArray)
            setMostCommentedMedia(posterPaths)
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
        <div className="mcm-row">
            <h2>{title}</h2>
            <div className="mcm-row_posters">
                {mostCommentedMedia.map((media) => (
                    <img
                        key={media.id}
                        onClick={() => handleClick(media.id, media.title)}
                        className="mcm-row_poster"
                        src={`${base_url}${media.poster_path}`}
                        alt={media.title}
                    />
                ))}
            </div>
            {/* <div className="mcm-row-posters">*/}
        </div>
    )
}

export default MostCommentedMedia
