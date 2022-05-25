import axios from 'axios'
import React, { useState, useEffect } from 'react'
import 'antd/dist/antd.css'
import { Rate, Row, Col } from 'antd'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

function FiveStarMediaRating() {
    const userInformation = useSelector((store) => store.userInformation)
    let params = useParams()

    const [avgRating, setAvgRating] = useState('')
    const [rating, updateRating] = useState(2.5)
    const [displayAvg, updateDisplayAvg] = useState('')

    const getAvgRating = async () => {
        const response = await axios.get(
            `${process.env.REACT_APP_API_BASE_URL}/api/media-rating/get-average-rating-for-media?mediaId=${params.movieId}`
        )
        console.log(response.data)
        if (response.data != null && response.data != 0) {
            setAvgRating(Math.round(response.data * 100) / 100)
            updateDisplayAvg('AVG')
        }
    }

    const getCurrentUserRating = async () => {
        const response = await axios.get(
            `${process.env.REACT_APP_API_BASE_URL}/api/media-rating/get-rating?mediaId=${params.movieId}&userId=${userInformation.id}`
        )
        if (response.data) {
            updateRating(response.data.rating)
        }
    }

    const addNewRating = async (newRatingToSave) => {
        updateRating(newRatingToSave)
        const response = await axios.post(
            `${process.env.REACT_APP_API_BASE_URL}/api/media-rating/save-rating?mediaId=${params.movieId}&userId=${userInformation.id}&rating=${newRatingToSave}`
        )
        getAvgRating()
    }

    useEffect(() => {
        getAvgRating()
        getCurrentUserRating()
    }, [])

    return (
        <Row justify="end" align="middle">
            <Col span={16}>
                <Rate
                    allowHalf
                    allowClear={true}
                    defaultValue={2.5}
                    onChange={addNewRating}
                    value={rating}
                />
            </Col>
            <Col span={4}>
                {avgRating} {displayAvg}
            </Col>
        </Row>
    )
}

export default FiveStarMediaRating
