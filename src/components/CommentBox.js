import React from 'react'
import { Button } from 'react-bootstrap'
import './CommentBox.css'

function CommentBox() {
    return (
        <div className="commentBox">
            <br />
            <div className="row">
                <p>replies test</p>
                <p>replies test2</p>
            </div>
            <div>
                <form style={{ display: 'flex' }}>
                    <textarea
                        style={{ width: '100%' }}
                        placeholder="Write your comment here"
                    ></textarea>
                </form>
            </div>
            <br />
            <Button>Add Comment</Button>
        </div>
    )
}

export default CommentBox
