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
                <form>
                    <textarea
                        style={{ width: '100%' }}
                        placeholder="Write your comment here"
                    ></textarea>
                    <br />
                    <input
                        type="submit"
                        class="btn btn-block btn-primary"
                        value="Submit"
                    />
                </form>
            </div>
            <br />
        </div>
    )
}

export default CommentBox
