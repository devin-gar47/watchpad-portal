import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import '../css/Comments.scss'
import Comment from './Comment'
import { useDispatch, useSelector } from 'react-redux'
import { setMediaComments } from '../redux/reducers/comment/commentSlice'
import CommentBox from './CommentBox'
import { Switch } from 'antd'

const CommentDisplay = (mediaId) => {
    let params = useParams()
    const [comment, setComment] = useState([])
    const [popularToggle, setPopularToggle] = useState(false)
    const [followerToggle, setFollowerToggle] = useState(false)

    const mediaComments = useSelector((store) => store.mediaComments)
    const userInformation = useSelector((store) => store.userInformation)

    const dispatch = useDispatch()

    const getComments = async (checked) => {
        if (popularToggle == false && followerToggle == false) {
            try {
                const response = await axios.get(
                    `${process.env.REACT_APP_API_BASE_URL}/api/comments/get-reviews-by-media?mediaId=${params.movieId}`
                )
                dispatch(setMediaComments(response.data))
            } catch (e) {
                console.log(e)
            }
        } else if (popularToggle == true && followerToggle == false) {
            try {
                const response = await axios.get(
                    `${process.env.REACT_APP_API_BASE_URL}/api/comments/get-most-liked?mediaId=${params.movieId}`
                )
                dispatch(setMediaComments(response.data))
            } catch (e) {
                console.log(e)
            }
        } else {
            try {
                console.log(userInformation.username)
                const response = await axios.get(
                    `${process.env.REACT_APP_API_BASE_URL}/api/comments/get-reviews-by-follower?mediaId=${params.movieId}&username=${userInformation.username}`
                )
                dispatch(setMediaComments(response.data))
            } catch (e) {
                console.log(e)
            }
        }
    }

    useEffect(() => {
        getComments()
    }, [popularToggle, followerToggle])

    const onPopularChange = (checked) => {
        setPopularToggle(checked)
    }

    const onFollowerChange = (checked) => {
        setFollowerToggle(checked)
    }

    return (
        <div className="comments">
            <h8> Most Popular</h8>
            {!followerToggle && <Switch onChange={onPopularChange} />}
            {followerToggle && <Switch disabled onChange={onPopularChange} />}
            <h8>By Followers</h8>
            {!popularToggle && <Switch onChange={onFollowerChange} />}
            {popularToggle && <Switch disabled onChange={onFollowerChange} />}
            <h3 className="comments-title">Reviews</h3>
            <div className="comments-container">
                {mediaComments.map((c) => (
                    <Comment key={c.comment_id} comment={c} />
                ))}
            </div>
            <div>
                <CommentBox />
            </div>
        </div>
    )
}

export default CommentDisplay
