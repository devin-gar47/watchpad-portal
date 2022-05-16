import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Button } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

function LikeDislikes() {
    const userInformation = useSelector((store) => store.userInformation)
    let params = useParams()

    //used props to make it dynamic instead of setting state to 0
    const [likes, setLikes] = useState(0)
    const [dislikes, setDislikes] = useState(0)

    //another state used to track if the like/dislike button is already pressed
    const [liked, updateLiked] = useState(0)
    const [disliked, updateDisliked] = useState(0)

    const getTotalLikes = async () => {
        const response = await axios.get(
            `${process.env.REACT_APP_API_BASE_URL}/api/media-rating/count-likes?mediaId=${params.movieId}`
        )
        setLikes(response.data)
    }

    const getTotalDislikes = async () => {
        const response = await axios.get(
            `${process.env.REACT_APP_API_BASE_URL}/api/media-rating/count-dislikes?mediaId=${params.movieId}`
        )
        setDislikes(response.data)
    }

    const currentUserRating = async () => {
        const response = await axios.get(
            `${process.env.REACT_APP_API_BASE_URL}/api/media-rating/get-rating?mediaId=${params.movieId}&userId=${userInformation.id}`
        )
        console.log(
            `${process.env.REACT_APP_API_BASE_URL}/api/media-rating/get-rating?mediaId=${params.movieId}&userId=${userInformation.id}`
        )

        if (response.data.isLiked !== undefined) {
            //if user likes already, response.data will be TRUE
            if (response.data.isLiked) {
                updateLiked(1)
            } else {
                updateDisliked(1)
            }
        }
    }

    const saveUserRating = async (userRatingToSave) => {
        axios
            .post(
                `${process.env.REACT_APP_API_BASE_URL}/api/media-rating/save-rating`,
                {},
                {
                    params: {
                        userId: userInformation.id,
                        mediaId: params.movieId,
                        isLiked: userRatingToSave,
                    },
                }
            )
            .then((response) => response.status)
            .catch((err) => console.warn(err))
    }

    const deleteUserRating = async () => {
        axios
            .post(
                `${process.env.REACT_APP_API_BASE_URL}/api/media-rating/delete-rating`,
                {},
                {
                    params: {
                        userId: userInformation.id,
                        mediaId: params.movieId,
                    },
                }
            )
            .then((response) => response.status)
            .catch((err) => console.warn(err))
    }

    useEffect(() => {
        getTotalLikes()
        getTotalDislikes()
        currentUserRating()
    }, [likes, dislikes, liked, disliked])

    //checks to see when to increment/decrement likes based on if the like/dislike buttons are pressed
    const clikedLike = () => {
        if (liked) {
            updateLiked(false)
            setLikes(likes - 1)

            deleteUserRating()
        } else {
            updateLiked(true)
            setLikes(likes + 1)
            if (disliked) {
                updateDisliked(false)
                setLikes(likes + 1)
                setDislikes(disliked - 1)
            }
            saveUserRating(true)
        }

        // axios
        //     .post(
        //         `${process.env.REACT_APP_API_BASE_URL}/api/media-rating/save-rating`,
        //         {},
        //         {
        //             params: {
        //                 userId: userInformation.id,
        //                 mediaId: params.movieId,
        //                 isLiked: true,
        //             },
        //         }
        //     )
        //     .then((response) => response.status)
        //     .catch((err) => console.warn(err))
    }

    const clickedDislike = () => {
        if (disliked) {
            updateDisliked(false)
            setDislikes(dislikes - 1)

            deleteUserRating()
        } else {
            updateDisliked(true)
            setDislikes(dislikes + 1)
            if (liked) {
                updateLiked(false)
                setDislikes(dislikes + 1)
                setLikes(likes - 1)
            }
            saveUserRating(false)
        }

        // axios
        //     .post(
        //         `${process.env.REACT_APP_API_BASE_URL}/api/media-rating/save-rating`,
        //         {},
        //         {
        //             params: {
        //                 userId: userInformation.id,
        //                 mediaId: params.movieId,
        //                 isLiked: false,
        //             },
        //         }
        //     )
        //     .then((response) => response.status)
        //     .catch((err) => console.warn(err))
    }

    return (
        <>
            <Button className="btnSpacing" onClick={clikedLike}>
                👍 {likes}
            </Button>
            <Button className="btnSpacing" onClick={clickedDislike}>
                👎 {dislikes}
            </Button>
        </>
    )
}

export default LikeDislikes
