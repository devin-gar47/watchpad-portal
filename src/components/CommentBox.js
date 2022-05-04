import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
import './CommentBox.css'

function CommentBox() {
    const [comments, setComments] = useState([]) //state that stores the new inputs in an array
    const [input, setInput] = useState('') //short term memory to remember what is typed into input area(text area)

    const addComment = (event) => {
        // this will activate when submit button is clicked
        setComments([...comments, input]) // ...spread. pushes the new input into the array. keeps what is already inside array and appends new input
        event.preventDefault() // prevents the page refresh when Submit
        setInput('') //clears the text area back to empty after submitting
    }

    return (
        <div className="commentBox">
            <br />

            <div>
                <form>
                    {comments.map((comment) => (
                        <p>{comment}</p> //loops(map) through array of useState and prints each element in the array then returns list<li> or <p> items of elements in the array
                    ))}
                    <textarea
                        type="text"
                        style={{ width: '100%' }}
                        placeholder="Write your comment here..."
                        value={input} //mapping state input(above) into input that is being filled in text area
                        onChange={(event) => setInput(event.target.value)} //every time user types, state gets updated above. target = text area field you type in
                    ></textarea>
                    <br />

                    <Button
                        onClick={addComment}
                        type="submit"
                        variant="primary"
                    >
                        Submit
                    </Button>
                </form>
            </div>
            <br />
        </div>
    )
}

export default CommentBox
