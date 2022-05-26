import React, { createElement, useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import 'antd/dist/antd.css'
import { useDispatch, useSelector } from 'react-redux'
import { setMediaComments } from '../redux/reducers/comment/commentSlice'
import { Comment, Tooltip, List } from 'antd'
import moment from 'moment'
import {
    DislikeOutlined,
    LikeOutlined,
    DislikeFilled,
    LikeFilled,
} from '@ant-design/icons'

const DurationComments = (mediaId) => {
    let params = useParams()
    const [comment, setComment] = useState([])
    const mediaComments = useSelector((store) => store.mediaComments)

    const dispatch = useDispatch()

    useEffect(() => {
        function getCommentsApiCall() {
            const getComments = async () => {
                try {
                    const response = await axios.get(
                        `${process.env.REACT_APP_API_BASE_URL}/api/comments/get?mediaId=${params.movieId}`
                    )
                    dispatch(setMediaComments(response.data))
                } catch (e) {
                    console.log(e)
                }
            }
            getComments()
        }
        getCommentsApiCall()
    }, [])

    const [likes, setLikes] = useState(0)
    const [dislikes, setDislikes] = useState(0)
    const [action, setAction] = useState(null)

    const like = () => {
        setLikes(1)
        setDislikes(0)
        setAction('liked')
    }

    const dislike = () => {
        setLikes(0)
        setDislikes(1)
        setAction('disliked')
    }

    const actions = [
        <Tooltip key="comment-basic-like" title="Like">
            <span onClick={like}>
                {createElement(action === 'liked' ? LikeFilled : LikeOutlined)}
                <span className="comment-action">{likes}</span>
            </span>
        </Tooltip>,
        <Tooltip key="comment-basic-dislike" title="Dislike">
            <span onClick={dislike}>
                {React.createElement(
                    action === 'disliked' ? DislikeFilled : DislikeOutlined
                )}
                <span className="comment-action">{dislikes}</span>
            </span>
        </Tooltip>,
    ]

    return (
        <List
            className="comment-list"
            header={`${mediaComments.length} replies`}
            itemLayout="horizontal"
            dataSource={mediaComments}
            renderItem={(item) => (
                <li>
                    <Comment
                        actions={actions}
                        author={item.user.username}
                        avatar={item.user.photo}
                        content={item.content}
                        datetime={item.comment_timestamp}
                    />
                </li>
            )}
        />
    )
}

export default DurationComments
