import React, { useEffect, useState } from 'react'
import { Col, Form, Row } from 'react-bootstrap'
import { BsPlayFill, BsFillPauseFill } from 'react-icons/bs'
import {
    toHoursAndMinutes,
    toHoursMinutesAndSeconds,
} from '../utils/time-utils'
import '../css/DurationBar.css'

function DurationBar({ runtime }) {
    const [currentPosition, setCurrentPosition] = useState(0)
    const [convertedPosition, setConvertedPosition] = useState('00:00:00')
    const [isPaused, setIsPaused] = useState(true)
    const runtimeInSeconds = runtime * 60

    function changePosition(e) {
        const { value } = e.target
        setCurrentPosition(value)
    }

    function handlePauseAndStart() {
        if (currentPosition >= runtimeInSeconds) setCurrentPosition(0)
        setIsPaused(!isPaused)
    }

    useEffect(() => {
        if (!isPaused) {
            setCurrentPosition((prevValue) => parseInt(prevValue) + 1)
            const interval = setInterval(() => {
                setCurrentPosition((prevValue) => parseInt(prevValue) + 1)
            }, 1000)
            return () => clearInterval(interval)
        }
    }, [isPaused])

    useEffect(() => {
        if (currentPosition >= runtimeInSeconds) {
            setIsPaused(true)
        }
        setConvertedPosition(toHoursMinutesAndSeconds(currentPosition))
    }, [currentPosition])

    return (
        <Row className="justify-content-center no-gutters">
            <Col sm={8}>
                <Row>
                    <Col>
                        <Form.Range
                            value={currentPosition}
                            min={0}
                            max={runtimeInSeconds}
                            onChange={(e) => changePosition(e)}
                        />
                        <Row>
                            <Col className="text-start">
                                <span>{convertedPosition}</span>
                            </Col>
                            <Col className="text-center">
                                {isPaused ? (
                                    <BsPlayFill
                                        onClick={() => handlePauseAndStart()}
                                        className="pause-and-play-button"
                                    />
                                ) : (
                                    <BsFillPauseFill
                                        onClick={() => handlePauseAndStart()}
                                        className="pause-and-play-button"
                                    />
                                )}
                            </Col>
                            <Col className="text-end">
                                <span>{toHoursAndMinutes(runtime)}</span>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Col>
        </Row>
    )
}

export default DurationBar
