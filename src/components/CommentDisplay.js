import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'

const CommentDisplay = (mediaId) => {
    let arrayOfComments = []
    let params = useParams()
    const [comment, setComment] = useState('Waiting for data')

    const getComments = async () => {
        const response = await axios.get(
            `${process.env.REACT_APP_API_BASE_URL}/api/comments/get-comments-by-media?mediaId=${params.movieId}`
        )
        console.log(response.data)
        console.log(response.data.length)

        let i = 0
        for (i = 0; i < response.data.length; i++) {
            arrayOfComments.push(response.data[i].content)
        }
        console.log(arrayOfComments)
        setComment(arrayOfComments)
    }

    useEffect(() => {
        getComments()
    }, [])

    return (
        <div
            style={{
                backgroundcolor: 'blue',
                marginLeft: '20px',
                marginRight: '300px',
            }}
        >
            {comment}
        </div>
    )
}

export default CommentDisplay
