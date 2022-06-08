import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button, Popover, OverlayTrigger } from 'react-bootstrap'
import './CommentBox.css'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { myAddComment } from '../redux/reducers/comment/commentSlice'
import GIFModal from './GIFModal'

function CommentBox() {
    let params = useParams()
    const dispatch = useDispatch()

    const userInformation = useSelector((store) => store.userInformation)
    const [newComment, setNewComment] = useState('') //short term memory to remember what is typed into input area(text area)
    const [modalShow, setModalShow] = useState(false)
    const [gifURL, setgifURL] = useState('')

    var currentDate = new Date()
    var date =
        currentDate.getFullYear() +
        '-' +
        (currentDate.getMonth() + 1) +
        '-' +
        currentDate.getDate() +
        ' ' +
        currentDate.getHours() +
        ':' +
        currentDate.getMinutes() +
        ':' +
        currentDate.getSeconds()

    var stringDate = date.toString()
    const addComment = (e) => {
        e.preventDefault()
        const comment = {
            media: { id: params.movieId },
            user: {
                id: userInformation.id,
                username: userInformation.username,
            },
            comment_timestamp: stringDate,
            duration_timestamp: 0,
            content: newComment,
            spoiler: false,
            review: true,
            gifURL: gifURL,
        }
        axios
            .post(`${process.env.REACT_APP_API_BASE_URL}/api/comments`, comment)
            .then((response) => {
                console.log('RESPONSE')
                console.log(response.data)
                if (response.data) {
                    dispatch(myAddComment(response.data))
                    setgifURL('')
                } else {
                    console.log('ERROR SAVING COMMENT')
                }
            })

        // this will activate when submit button is clicked
        // setComments([...comments, newComment]) ...spread. pushes the new input into the array. keeps what is already inside array and appends new input
        e.preventDefault() // prevents the page refresh when Submit
        setNewComment('') //clears the text area back to empty after submitting
    }

    const renderChosenReviewGIF = () => {
        if (gifURL.length > 0) {
            return (
                <img
                    src={`${gifURL}`} //shows the user's current chosen GIF, if any
                />
            )
        }
    }

    return (
        <div>
            <br />

            {renderChosenReviewGIF()}

            <div className="text-center">
                <form>
                    <textarea
                        className="review-text-box"
                        type="text"
                        style={{ width: '100%' }}
                        placeholder="Write your review here..."
                        value={newComment} //mapping state input(above) into input that is being filled in text area
                        onChange={(e) => setNewComment(e.target.value)} //every time user types, state gets updated above. target = text area field you type in
                    ></textarea>
                    <br />

                    <Button
                        onClick={(e) => addComment(e)}
                        type="submit"
                        variant="primary"
                        className="yellow"
                    >
                        Post Review
                    </Button>

                    <>
                        <Button
                            variant="primary"
                            onClick={() => setModalShow(true)}
                        >
                            +GIF
                        </Button>

                        <GIFModal
                            show={modalShow}
                            onHide={() => setModalShow(false)}
                            gifURL={gifURL}
                            setgifURL={setgifURL}
                        />
                    </>
                </form>
            </div>
            <br />
        </div>
    )
}

export default CommentBox
