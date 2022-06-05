import axios from 'axios'
import React from 'react'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import '../css/Media.scss'
import CommentBox from '../components/CommentBox'
import LikeDislikes from '../components/LikeDislikes'
import DurationBar from '../components/DurationBar'
import CommentDisplay from '../components/CommentDisplay'
import '../css/Buttons.css'
import '../css/Comments.scss'
import AddWatchlist from '../components/AddWatchlist'
import {
    Layout,
    Image,
    Row as AntRow,
    Col as AntCol,
    Space,
    Typography,
} from 'antd'
import { Col, Row } from 'react-bootstrap'
import logo from '../static/watchpad_logo.png'
import FiveStarMediaRating from '../components/FiveStarMediaRating'

const base_url = 'https://image.tmdb.org/t/p/original/'
function MediaPage() {
    // const userInformation = useSelector((store) => store.userInformation)

    let params = useParams()
    const [runtime, setRuntime] = useState(0)
    const { Sider, Content } = Layout
    const { Title, Paragraph } = Typography

    // const[likesTotal, setLikesTotal] = useState(0)
    // const[dislikesTotal, setDislikesTotal] = useState(0)

    /*
    async function fetchData() {
    let fetchUrl = `https://api.themoviedb.org/3/movie/${params.movieId}?${process.env.REACT_APP_APIKEY}=&language=en-US`
    console.log(fetchUrl)
    const data = await axios.get(fetchUrl)
    console.log(data);

    var obj = data.parseJSON('{"title": ""}');
    return data

    }
    */
    const [movie, setMovie] = useState('WAITING FOR DATA')
    const getMovieInfo = async () => {
        const response = await fetch(
            `https://api.themoviedb.org/3/movie/${params.movieId}?api_key=${process.env.REACT_APP_APIKEY}&language=en-US`
        )
        const data = await response.json()
        setMovie(data)
        console.log(movie)
        console.log(data)
        setRuntime(data.runtime)
        return data
    }

    const saveMedia = async () => {
        const response = await axios.post(
            `${process.env.REACT_APP_API_BASE_URL}/api/media/save-media`,
            {
                id: params.movieId,
            }
        )
        console.log(response)
    }

    useEffect(() => {
        saveMedia()
        getMovieInfo()
    }, [])

    return (
        <Layout>
            <Sider width={375} style={{ padding: '10px 10px' }}>
                <Space direction="vertical" size="small">
                    <h2 className="m-0">{movie.title}</h2>
                    <Image
                        key={movie.id}
                        src={`${base_url}${movie.poster_path}`}
                        alt={movie.title}
                        rightMargin="10px"
                        fallback={logo}
                    />

                    <Paragraph className="movie-description">
                        {movie.overview}
                    </Paragraph>

                    <AntRow wrap={false} align="middle">
                        <AntCol span={8}>
                            <LikeDislikes />
                        </AntCol>
                        <AntCol span={16}>
                            <FiveStarMediaRating />
                        </AntCol>
                    </AntRow>
                    <AntRow>
                        <AddWatchlist />
                    </AntRow>
                </Space>
            </Sider>

            <Content style={{ padding: '0 10px' }}>
                <Row>
                    <Col lg={6}>
                        <CommentDisplay />
                    </Col>
                    <Col
                        className="d-flex align-items-center justify-content-center"
                        lg={6}
                    >
                        <h2>Reserved for live feed chat...</h2>
                    </Col>
                </Row>

                <DurationBar runtime={runtime} />
            </Content>
        </Layout>
    )
}

export default MediaPage
