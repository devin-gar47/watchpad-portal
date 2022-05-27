import { useParams } from 'react-router-dom'

const requests = {
    fetchPopular: `/movie/popular?api_key=${process.env.REACT_APP_APIKEY}&language=en-US`,
    //fetchMovie: `/movie/${params.movieId}?api_key=<${process.env.REACT_APP_APIKEY}&language=en-US`
    fetchTopRated: `/movie/top_rated?api_key=${process.env.REACT_APP_APIKEY}&withlanguage=en-US`,
}

export default requests
