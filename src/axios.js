import axios from 'axios'

/* base url to make requests to the movie database 

instance.get('/foo-bar') --> https://api.themoviedb.org/3/foo-bar

*/

const instance = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
})

export default instance
