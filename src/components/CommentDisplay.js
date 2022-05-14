import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'

const CommentDisplay = (mediaId) => {
    let params = useParams()
    const [comment, setComment] = useState('Waiting for data')
    const getComments = async () => {
        const response = await axios.get(
            `${process.env.REACT_APP_API_BASE_URL}/api/comments/get-comments-by-media/${params.movieId}`
        )

        console.log(response)
        console.log(comment.content)
        return comment
    }

    useEffect(() => {
        getComments()
    }, [])
    return <div>{comment.title}</div>
}

export default CommentDisplay
