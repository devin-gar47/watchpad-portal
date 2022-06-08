import React, { useEffect, useState } from 'react'
import { Container, Col, Form, Row } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import {
    BsPlayFill,
    BsFillPauseFill,
    BsFillSkipStartFill,
    BsArrowClockwise,
    BsArrowCounterclockwise,
} from 'react-icons/bs'
import {
    toHoursAndMinutes,
    toHoursMinutesAndSeconds,
} from '../utils/time-utils'
import '../css/DurationBar.css'
import DurationComments from '../components/DurationComments'
import DurationCommentBox from '../components/DurationCommentBox'

function DurationBar({ runtime }) {
    let params = useParams()

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

    function handleRestart() {
        setCurrentPosition(0)
    }

    function handleSkipBackward() {
        if (currentPosition - 10 < 0) {
            setCurrentPosition(0)
        } else {
            setCurrentPosition(currentPosition - 10)
        }
    }

    function handleSkipForward() {
        if (currentPosition >= runtimeInSeconds) {
            setCurrentPosition(runtimeInSeconds)
        } else {
            setCurrentPosition(currentPosition + 10)
        }
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
        <div>
            <Row className="justify-content-center no-gutters">
                <Col sm={8}>
                    <Row>
                        <Col>
                            <Form.Range
                                value={currentPosition}
                                min={0}
                                max={runtimeInSeconds}
                                onChange={(e) => changePosition(e)}
                                data-testid="duration-bar-slider"
                            />
                            <Row>
                                <Col className="text-start">
                                    <span data-testid="duration-bar-converted-position">
                                        {convertedPosition}
                                    </span>
                                </Col>
                                <Col className="text-center">
                                    {isPaused ? (
                                        <BsPlayFill
                                            onClick={() =>
                                                handlePauseAndStart()
                                            }
                                            className="pause-and-play-button"
                                            data-testid="play-button"
                                        />
                                    ) : (
                                        <BsFillPauseFill
                                            onClick={() =>
                                                handlePauseAndStart()
                                            }
                                            className="pause-and-play-button"
                                            data-testid="pause-button"
                                        />
                                    )}
                                    <BsArrowCounterclockwise
                                        onClick={() => handleSkipBackward()}
                                        className="skip-backward-button"
                                        data-testid="skip-backward-button"
                                    />
                                    <BsArrowClockwise
                                        onClick={() => handleSkipForward()}
                                        className="skip-forward-button"
                                        data-testid="skip-forward-button"
                                    />
                                    <BsFillSkipStartFill
                                        onClick={() => handleRestart()}
                                        className="restart-button"
                                        data-testid="restart-button"
                                    />
                                </Col>
                                <Col className="text-end">
                                    <span data-testid="duration-bar-converted-runtime">
                                        {toHoursAndMinutes(runtime)}
                                    </span>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Container>
                <Row>
                    <DurationComments currentPosition={currentPosition} />
                    <DurationCommentBox currentPosition={currentPosition} />
                </Row>
            </Container>
        </div>
    )
}

export default DurationBar
