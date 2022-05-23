import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Button, Col, Row } from 'antd'
import { DislikeFilled, LikeFilled } from '@ant-design/icons'

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
            `${process.env.REACT_APP_API_BASE_URL}/api/media-rating/likes/count-likes?mediaId=${params.movieId}`
        )
        setLikes(response.data)
    }

    const getTotalDislikes = async () => {
        const response = await axios.get(
            `${process.env.REACT_APP_API_BASE_URL}/api/media-rating/likes/count-dislikes?mediaId=${params.movieId}`
        )
        setDislikes(response.data)
    }

    const currentUserRating = async () => {
        const response = await axios.get(
            `${process.env.REACT_APP_API_BASE_URL}/api/media-rating/likes/get-like?mediaId=${params.movieId}&userId=${userInformation.id}`
        )

        if (response.data !== null) {
            //if user likes already, response.data will be TRUE
            if (response.data.isLiked == true) {
                updateLiked(1)
                console.log('LOGGED IN USER LIKES THIS')
            } else {
                updateDisliked(1)
                console.log('LOGGED IN USER DISLIKES THIS')
            }
        } else {
            console.log('USER HAS NOT LIKED OR DISLIKED THIS')
        }
    }

    const saveUserRating = async (userRatingToSave) => {
        axios
            .post(
                `${process.env.REACT_APP_API_BASE_URL}/api/media-rating/likes/save-like`,
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
                `${process.env.REACT_APP_API_BASE_URL}/api/media-rating/likes/delete-like`,
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
    }, [])

    //checks to see when to increment/decrement likes based on if the like/dislike buttons are pressed
    const clickedLike = () => {
        if (liked) {
            updateLiked(0)
            setLikes(likes - 1)
            deleteUserRating()
        } else {
            updateLiked(1)
            setLikes(likes + 1)
            if (disliked) {
                updateDisliked(0)
                setLikes(likes + 1)
                setDislikes(disliked - 1)
            }
            saveUserRating(true)
        }
    }

    const clickedDislike = () => {
        if (disliked) {
            updateDisliked(0)
            setDislikes(dislikes - 1)
            deleteUserRating()
        } else {
            updateDisliked(1)
            setDislikes(dislikes + 1)
            if (liked) {
                updateLiked(0)
                setDislikes(dislikes + 1)
                setLikes(likes - 1)
            }
            saveUserRating(false)
        }
    }

    return (
        <Row align="middle" justify="space-evenly">
            <Col>
                <Button
                    type="primary"
                    shape="circle"
                    icon={<LikeFilled />}
                    onClick={clickedLike}
                />
            </Col>
            <Col>{likes}</Col>
            <Col>
                <Button
                    type="primary"
                    shape="circle"
                    icon={<DislikeFilled />}
                    onClick={clickedDislike}
                />
            </Col>
            <Col>{dislikes}</Col>
        </Row>
    )
}

export default LikeDislikes
