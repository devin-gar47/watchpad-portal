import React, { useState, useEffect } from 'react'
import LikeDislikeComment from './LikeDislikeComment'
import { useDispatch, useSelector } from 'react-redux'
import {
    DeleteOutlined,
    EditOutlined,
    SoundTwoTone,
    SoundFilled,
} from '@ant-design/icons'
import { Button, Alert } from 'antd'
import axios from 'axios'
import { setMediaComments } from '../redux/reducers/comment/commentSlice'
import {
    myDeleteComment,
    myEditComment,
} from '../redux/reducers/comment/commentSlice'

const Comment = ({ comment }) => {
    const userInformation = useSelector((store) => store.userInformation)
    const dispatch = useDispatch()
    const [isSpoilerGuardOn, setIsSpoilerGuardOn] = useState(false)

    const deleteComment = async (event) => {
        event.persist()
        axios
            .delete(
                `${process.env.REACT_APP_API_BASE_URL}/api/comments/delete`,
                {
                    data: {
                        comment_id: comment.comment_id,
                    },
                }
            )
            .then((response) => {
                if (response.data) {
                    dispatch(myDeleteComment(response.data))
                    console.log(response.data)
                }
                console.log(response)
            })
    }

    const editSpoiler = async (event) => {
        const editedComment = {
            media: { id: comment.media.id },
            user: { id: comment.user.id },
            comment_timestamp: comment.comment_timestamp,
            duration_timestamp: 0,
            content: comment.content,
            spoiler: !comment.spoiler,
            review: true,
            gifURL: comment.gifURL,
        }

        event.persist()
        axios
            .put(
                `${process.env.REACT_APP_API_BASE_URL}/api/comments/${comment.comment_id}`,
                editedComment
            )
            .then((response) => {
                if (response.data) {
                    dispatch(myEditComment(response.data))
                    console.log(response.data)
                }
                console.log(response.data)
                comment = editedComment
            })
    }

    function ShowDeleteButton() {
        if (comment.user.id == userInformation.id) {
            return (
                <Button
                    onClick={(e) => deleteComment(e)}
                    type="link"
                    shape="circle"
                    icon={<DeleteOutlined />}
                    danger
                />
            )
        } else return null
    }

    function ShowEditButton() {
        if (comment.user.id == userInformation.id) {
            return (
                <Button
                    onClick={(e) => {}}
                    type="link"
                    shape="circle"
                    icon={<EditOutlined />}
                />
            )
        } else return null
    }

    function ShowSpoilerButton() {
        if (comment.spoiler == false) {
            return (
                <Button
                    onClick={(e) => editSpoiler(e)}
                    type="link"
                    shape="circle"
                    icon={<SoundTwoTone twoToneColor="#F58216" />}
                />
            )
        } else {
            return (
                <Button
                    onClick={(e) => editSpoiler(e)}
                    type="link"
                    shape="circle"
                    icon={<SoundFilled />}
                />
            )
        }
    }

    useEffect(() => {
        comment.spoiler && setIsSpoilerGuardOn(true)
    }, [])

    function ShowSpoilerGuard() {
        if (comment.spoiler == true) {
            setIsSpoilerGuardOn(true)
            return (
                <Alert
                    message="Spoiler Warning!"
                    showIcon
                    description="This Content contains a spoiler"
                    type="warning"
                    closable
                    closeText="View anyway"
                    onClose={() => setIsSpoilerGuardOn(false)}
                />
            )
        }
        setIsSpoilerGuardOn(false)
        return displayComment()
    }

    function displayComment() {
        return <div>{comment.content}</div>
    }

    const renderDurationCommentGIF = (reviewGIFURL) => {
        if (reviewGIFURL.length > 0) {
            return (
                <img
                    src={`${reviewGIFURL}`} //shows the user's current chosen GIF, if any
                />
            )
        }
    }

    return (
        <div className="comment">
            <div className="comment-image-container">
                <img src="/user-icon.png" alt="user icon" />
            </div>

            <div className="comment-right-part">
                <div className="comment-content">
                    <div className="comment-author">
                        {comment.user.username}
                    </div>
                    <div className="timeStamp">
                        {comment.comment_timestamp}
                        <ShowDeleteButton /> <ShowEditButton />{' '}
                        <ShowSpoilerButton />
                    </div>
                </div>
                {renderDurationCommentGIF(comment.gifURL)}
                <div className="comment-text">
                    {isSpoilerGuardOn ? (
                        <Alert
                            message="Spoiler Warning!"
                            showIcon
                            description="This Content contains a spoiler"
                            type="warning"
                            closable
                            closeText="View anyway"
                            onClose={() => {
                                setIsSpoilerGuardOn(false)
                            }}
                        />
                    ) : (
                        <>{comment.content}</>
                    )}

                    {/* <ShowSpoilerGuard />  */}

                    <div style={{ width: '110px', margin: '8px' }}>
                        <LikeDislikeComment
                            key={comment.comment_id}
                            commentId={comment.comment_id}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Comment
