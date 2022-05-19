import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import '../css/Comments.css'
import Comment from './Comment'

const CommentDisplay = (mediaId) => {
    let params = useParams()
    const [comment, setComment] = useState([])

    const getComments = async () => {
        const response = await axios.get(
            `${process.env.REACT_APP_API_BASE_URL}/api/comments/get-comments-by-media?mediaId=${params.movieId}`
        )
        // console.log(response.data)
        // console.log(response.data.length)

        setComment(response.data)
    }

    useEffect(() => {
        getComments()
    }, [comment])

    // console.log(typeof(comment))
    // console.log(comment)
    // console.log(Array.isArray(comment))

    /*
return (<div> hi </div>)
}
export default CommentDisplay
*/

    return (
        <div className="comments">
            <h3 className="comments-title"> Reviews </h3>
            <div className="comments-container">
                {comment.map((c) => (
                    <Comment key={c.id} comment={c} />
                ))}
            </div>
        </div>
    )
}

export default CommentDisplay
