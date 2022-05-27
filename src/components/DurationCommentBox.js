import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { myAddDurationComment } from '../redux/reducers/duration/durationSlice'
import {
    toHoursAndMinutes,
    toHoursMinutesAndSeconds,
} from '../utils/time-utils'

function DurationCommentBox({ currentPosition }) {
    let params = useParams()
    const dispatch = useDispatch()

    const userInformation = useSelector((store) => store.userInformation)

    //const [comments, setComments] = useState([]) //state that stores the new inputs in an array
    const [newComment, setNewComment] = useState('') //short term memory to remember what is typed into input area(text area)
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
    var stringDuration = toHoursMinutesAndSeconds(currentPosition).toString()

    const addComment = (event) => {
        event.preventDefault()
        const comment = {
            media: { id: params.movieId },
            user: { id: userInformation.id },
            comment_timestamp: stringDate,
            duration_timestamp: stringDuration,
            content: newComment,
            spoiler: true,
            review: false,
        }
        axios
            .post(`${process.env.REACT_APP_API_BASE_URL}/api/comments`, comment)
            .then((response) => {
                console.log(stringDuration)
                console.log(response.data)
                console.log('Comment Added!')
                comment.user.username = userInformation.username
                if (response.data) {
                    dispatch(myAddDurationComment(response.data))
                } else {
                    console.log('ERROR SAVING COMMENT')
                }
            })
        // this will activate when submit button is clicked
        // setComments([...comments, newComment]) ...spread. pushes the new input into the array. keeps what is already inside array and appends new input
        event.preventDefault() // prevents the page refresh when Submit
        setNewComment('') //clears the text area back to empty after submitting
    }

    return (
        <div className="">
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
                        onClick={(e) => addComment(e)}
                        type="submit"
                        variant="primary"
                    >
                        Post Comment
                    </Button>
                </form>
            </div>
            <br />
        </div>
    )
}

export default DurationCommentBox
