import axios from 'axios'
import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

function LikeDislikes({ likeCount, dislikeCount }) {
    //used props to make it dynamic instead of setting state to 0
    const [likes, setLikes] = useState(likeCount)
    const [dislikes, setDislikes] = useState(dislikeCount)

    //another state used to track if the like/dislike button is already pressed
    const [liked, updateLiked] = useState(false)
    const [disliked, updateDisliked] = useState(false)

    let params = useParams()
    const userInformation = useSelector((store) => store.userInformation)

    //checks to see when to increment/decrement likes based on if the like/dislike buttons are pressed
    const incrementLikes = () => {
        if (liked) {
            updateLiked(false)
            setLikes(likes - 1)
        } else {
            updateLiked(true)
            setLikes(likes + 1)
            if (disliked) {
                updateDisliked(false)
                setLikes(likes + 1)
                setDislikes(disliked - 1)
            }
        }
        console.log('plus 1')

        console.log('media Id ' + params.movieId)
        console.log('user id ' + userInformation.id)

        axios
            .post(
                `${process.env.REACT_APP_API_BASE_URL}/api/media-rating/save-rating`,
                {},
                {
                    params: {
                        userId: userInformation.id,
                        mediaId: params.movieId,
                        isLiked: true,
                    },
                }
            )
            .then((response) => response.status)
            .catch((err) => console.warn(err))
    }

    const decrementLikes = () => {
        if (disliked) {
            updateDisliked(false)
            setDislikes(dislikes - 1)
        } else {
            updateDisliked(true)
            setDislikes(dislikes + 1)
            if (liked) {
                updateLiked(false)
                setDislikes(dislikes + 1)
                setLikes(likes - 1)
            }
        }
        console.log('minus 1')

        axios
            .post(
                `${process.env.REACT_APP_API_BASE_URL}/api/media-rating/save-rating`,
                {},
                {
                    params: {
                        userId: userInformation.id,
                        mediaId: params.movieId,
                        isLiked: false,
                    },
                }
            )
            .then((response) => response.status)
            .catch((err) => console.warn(err))
    }

    return (
        <>
            <Button onClick={incrementLikes}>👍 {likes}</Button>
            <Button onClick={decrementLikes}>👎 {dislikes}</Button>
        </>
    )
}

export default LikeDislikes
