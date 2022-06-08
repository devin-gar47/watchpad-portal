import React, { createElement, useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import 'antd/dist/antd.css'
import { useDispatch, useSelector } from 'react-redux'
import { setDurationComments } from '../redux/reducers/duration/durationSlice'
import {
    setRealTimeComments,
    myAddRealTimeComment,
} from '../redux/reducers/duration/realTimeSlice'
import LikeDislikeComment from './LikeDislikeComment'
import { Switch } from 'antd'

import { Comment, Tooltip, List } from 'antd'
import moment from 'moment'
import {
    DislikeOutlined,
    LikeOutlined,
    DislikeFilled,
    LikeFilled,
} from '@ant-design/icons'

const DurationComments = (mediaId, currentPosition) => {
    let params = useParams()
    //const [comment, setComment] = useState([])
    const [currentComment, setCurrentComment] = useState(null)
    const durationComments = useSelector((store) => store.durationComments)
    const realTimeComments = useSelector((store) => store.realTimeComments)
    const [commentStack, setCommentStack] = useState([])
    var newArray = []
    var currComment = null

    const dispatch = useDispatch()

    const getComments = async (checked) => {
        try {
            const response = await axios
                .get(
                    `${process.env.REACT_APP_API_BASE_URL}/api/comments/get-duration-comments-by-media-sorted?mediaId=${params.movieId}`
                )
                .then((response) => {
                    return response.data
                })

            dispatch(setDurationComments(response.data))
            dispatch(setRealTimeComments([]))
        } catch (e) {
            //setCommentStack(response.data)

            console.log(e)
        }
    }

    const createCommentStack = () => {
        for (const obj of durationComments) {
            newArray.push(obj)
        }
        console.log(newArray)
        return newArray
    }

    useEffect(() => {
        getComments()
        createCommentStack()
    }, [])

    useEffect(() => {
        displayRealTime()
    }, [currentPosition])

    const renderDurationCommentGIF = (commentGIFURL) => {
        if (commentGIFURL?.length > 0) {
            return (
                <img
                    src={`${commentGIFURL}`} //shows the user's current chosen GIF, if any
                />
            )
        }
    }

    function displayRealTime() {
        console.log('THIS IS THE COMMENT ARRAY:', newArray)
        /*
        if (currComment == null) {
            currComment = newArray.pop()
            console.log(currComment)
            if (
                currComment.duration_timestamp == currentPosition ||
                currComment.duration_timestamp == currentPosition - 1
            ) {
                dispatch(myAddRealTimeComment(currComment))
                currComment = null
            }
        }*/
    }

    return (
        <div>
            <h8>Most Popular </h8>
            <Switch onChange={getComments} />
            <List
                className="comment-list"
                header={`${0} replies`}
                itemLayout="horizontal"
                dataSource={realTimeComments}
                renderItem={(item) => (
                    <li>
                        <Comment
                            // actions={actions}
                            author={item.user.username}
                            // avatar={item.user.photo}
                            content={
                                <>
                                    <div>
                                        {renderDurationCommentGIF(item.gifURL)}
                                    </div>
                                    <div>{item.content}</div>
                                </>
                            }
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
        </div>
    )
}

export default DurationComments
