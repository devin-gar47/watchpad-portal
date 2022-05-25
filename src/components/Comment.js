import React from 'react'
import LikeDislikeComment from './LikeDislikeComment'

const Comment = ({ comment }) => {
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
                    <div className="timeStamp">{comment.comment_timestamp}</div>
                </div>
                <div className="comment-text">
                    {comment.content}
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
