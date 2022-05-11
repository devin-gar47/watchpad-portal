import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import './CommentBox.css'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

function CommentBox() {
    let params = useParams()

    const userInformation = useSelector((store) => store.userInformation)

    const [comments, setComments] = useState([]) //state that stores the new inputs in an array
    const [newComment, setNewComment] = useState('') //short term memory to remember what is typed into input area(text area)

    const addComment = (event) => {
        axios
            .post(`${process.env.REACT_APP_API_BASE_URL}/api/comments`, {
                media: { id: params.movieId },
                user: { id: userInformation.id },
                comment_timestamp: '2007-12-03T10:15:30',
                content: newComment,
                spoiler: true,
            })
            .then((response) => {
                console.log('Comment Added!')
            })
        // this will activate when submit button is clicked
        setComments([...comments, newComment]) // ...spread. pushes the new input into the array. keeps what is already inside array and appends new input
        event.preventDefault() // prevents the page refresh when Submit
        setNewComment('') //clears the text area back to empty after submitting
    }

    return (
        <div className="commentBox">
            <br />

            <div>
                <form>
                    <textarea
                        type="text"
                        style={{ width: '100%' }}
                        placeholder="Write your comment here..."
                        value={newComment} //mapping state input(above) into input that is being filled in text area
                        onChange={(event) => setNewComment(event.target.value)} //every time user types, state gets updated above. target = text area field you type in
                    ></textarea>
                    <br />

                    <Button
                        onClick={addComment}
                        type="submit"
                        variant="primary"
                    >
                        Post
                    </Button>
                </form>
            </div>
            <br />
        </div>
    )
}

export default CommentBox
