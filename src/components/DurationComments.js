import React, { createElement, useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import 'antd/dist/antd.css'
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

    const getComments = async () => {
        const response = await axios.get(
            `${process.env.REACT_APP_API_BASE_URL}/api/comments/get-comments-by-media?mediaId=${params.movieId}`
        )
        console.log(response.data)
        console.log(response.data.length)

        setComment(response.data)
    }

    useEffect(() => {
        getComments()
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
            header={`${comment.length} replies`}
            itemLayout="horizontal"
            dataSource={comment}
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
