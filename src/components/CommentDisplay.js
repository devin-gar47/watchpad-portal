import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import '../css/Comments.scss'
import Comment from './Comment'
import { useDispatch, useSelector } from 'react-redux'
import { setMediaComments } from '../redux/reducers/comment/commentSlice'
import CommentBox from './CommentBox'

const CommentDisplay = (mediaId) => {
    let params = useParams()
    const [comment, setComment] = useState([])
    const mediaComments = useSelector((store) => store.mediaComments)

    const dispatch = useDispatch()

    const getComments = async () => {
        const response = await axios.get(
            `${process.env.REACT_APP_API_BASE_URL}/api/comments/get-comments-by-media?mediaId=${params.movieId}`
        )
        dispatch(setMediaComments(response.data))
    }

    useEffect(() => {
        getComments()
    }, [])

    return (
        <div className="comments">
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
