import React, { createElement, useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import 'antd/dist/antd.css'
import { useDispatch, useSelector } from 'react-redux'
import { setDurationComments } from '../redux/reducers/duration/durationSlice'
import LikeDislikeComment from './LikeDislikeComment'

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
    //const [comment, setComment] = useState([])
    const durationComments = useSelector((store) => store.durationComments)

    const dispatch = useDispatch()

    const getComments = async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_API_BASE_URL}/api/comments/get?mediaId=${params.movieId}`
            )
            console.log(response.data)
            dispatch(setDurationComments(response.data))
        } catch (e) {
            console.log(e)
        }
    }
    useEffect(() => {
        getComments()
    }, [])

    // const [likes, setLikes] = useState(0)
    // const [dislikes, setDislikes] = useState(0)
    // const [action, setAction] = useState(null)

    // const like = () => {
    //     setLikes(1)
    //     setDislikes(0)
    //     setAction('liked')
    // }

    // const dislike = () => {
    //     setLikes(0)
    //     setDislikes(1)
    //     setAction('disliked')
    // }

    // const actions = [
    //     <Tooltip key="comment-basic-like" title="Like">
    //         <span onClick={like}>
    //             {createElement(action === 'liked' ? LikeFilled : LikeOutlined)}
    //             <span className="comment-action">{likes}</span>
    //         </span>
    //     </Tooltip>,
    //     <Tooltip key="comment-basic-dislike" title="Dislike">
    //         <span onClick={dislike}>
    //             {React.createElement(
    //                 action === 'disliked' ? DislikeFilled : DislikeOutlined
    //             )}
    //             <span className="comment-action">{dislikes}</span>
    //         </span>
    //     </Tooltip>,
    // ]

    return (
        <List
            className="comment-list"
            header={`${durationComments.length} replies`}
            itemLayout="horizontal"
            dataSource={durationComments}
            renderItem={(item) => (
                <li>
                    <Comment
                        // actions={actions}
                        author={item.user.username}
                        avatar={item.user.photo}
                        content={item.content}
                        datetime={item.comment_timestamp}
                    />
                    <div style={{ width: '110px', margin: '8px' }}>
                        <LikeDislikeComment
                            key={item.comment_id}
                            commentId={item.comment_id}
                        />
                    </div>
                </li>
            )}
        />
    )
}

export default DurationComments
