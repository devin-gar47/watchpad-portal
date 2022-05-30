import axios from 'axios'
import React, { createElement, useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Tooltip } from 'antd'
import {
    DislikeOutlined,
    LikeOutlined,
    DislikeFilled,
    LikeFilled,
} from '@ant-design/icons'

function LikeDislikeComment({ commentId }) {
    const userInformation = useSelector((store) => store.userInformation)

    //used props to make it dynamic instead of setting state to 0
    const [likes, setLikes] = useState(0)
    const [dislikes, setDislikes] = useState(0)

    //another state used to track if the like/dislike button is already pressed
    const [liked, updateLiked] = useState(0)
    const [disliked, updateDisliked] = useState(0)
    const [action, setAction] = useState(null)

    const getTotalLikes = async () => {
        const response = await axios.get(
            //http://localhost:8080/api/comments/likes/count-likes?commentId=4
            `${process.env.REACT_APP_API_BASE_URL}/api/comments/likes/count-likes?commentId=${commentId}`
        )
        setLikes(response.data)
    }

    const getTotalDislikes = async () => {
        const response = await axios.get(
            //http://localhost:8080/api/comments/likes/count-dislikes?commentId=3
            `${process.env.REACT_APP_API_BASE_URL}/api/comments/likes/count-dislikes?commentId=${commentId}`
        )
        setDislikes(response.data)
    }

    const currentUserRating = async () => {
        const response = await axios.get(
            //http://localhost:8080/api/comments/likes/get-like?commentId=3&userId=2
            `${process.env.REACT_APP_API_BASE_URL}/api/comments/likes/get-like?commentId=${commentId}&userId=${userInformation.id}`
        )

        if (response.data !== null) {
            //if user likes already, response.data will be TRUE
            if (response.data.isLiked) {
                updateLiked(1)
                setAction('liked')
            } else {
                updateDisliked(1)
                setAction('disliked')
            }
        } else {
        }
    }

    const saveUserLikeDislike = async (userRatingToSave) => {
        axios
            .post(
                //http://localhost:8080/api/comments/likes/save-like?commentId=3&userId=2&isLiked=true
                `${process.env.REACT_APP_API_BASE_URL}/api/comments/likes/save-like`,
                {},
                {
                    params: {
                        userId: userInformation.id,
                        commentId: commentId,
                        isLiked: userRatingToSave,
                    },
                }
            )
            .then((response) => response.status)
            .catch((err) => console.warn(err))
    }

    const deleteLikeDislike = async () => {
        axios
            .post(
                //http://localhost:8080/api/comments/likes/delete-like?commentId=3&userId=2
                `${process.env.REACT_APP_API_BASE_URL}/api/comments/likes/delete-like`,
                {},
                {
                    params: {
                        userId: userInformation.id,
                        commentId: commentId,
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
            deleteLikeDislike()
            setAction(null)
        } else {
            updateLiked(1)
            setLikes(likes + 1)
            if (disliked) {
                updateDisliked(0)
                setLikes(likes + 1)
                setDislikes(dislikes - 1)
            }
            saveUserLikeDislike(true)
            setAction('liked')
        }
    }

    const clickedDislike = () => {
        if (disliked) {
            updateDisliked(0)
            setDislikes(dislikes - 1)
            deleteLikeDislike()
            setAction(null)
        } else {
            updateDisliked(1)
            setDislikes(dislikes + 1)
            if (liked) {
                updateLiked(0)
                setDislikes(dislikes + 1)
                setLikes(likes - 1)
            }
            saveUserLikeDislike(false)
            setAction('disliked')
        }
    }

    return (
        // <Row align="middle" justify="space-evenly">
        //     <Col>
        //         <Button
        //             type="primary"
        //             shape="circle"
        //             icon={<LikeFilled />}
        //             onClick={clickedLike}
        //         />
        //     </Col>
        //     <Col>{likes}</Col>
        //     <Col>
        //         <Button
        //             type="primary"
        //             shape="circle"
        //             icon={<DislikeFilled />}
        //             onClick={clickedDislike}
        //         />
        //     </Col>
        //     <Col>{dislikes}</Col>
        // </Row>
        [
            <Tooltip key="comment-basic-like" title="Like">
                <span onClick={clickedLike}>
                    {createElement(
                        action === 'liked' ? LikeFilled : LikeOutlined
                    )}
                    <span className="comment-action">{likes}</span>
                </span>
            </Tooltip>,
            <Tooltip key="comment-basic-dislike" title="Dislike">
                <span onClick={clickedDislike}>
                    {React.createElement(
                        action === 'disliked' ? DislikeFilled : DislikeOutlined
                    )}
                    <span className="comment-action">{dislikes}</span>
                </span>
            </Tooltip>,
        ]
    )
}

export default LikeDislikeComment
