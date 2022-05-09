import { useParams } from 'react-router-dom'
import Grid from '../components/Grid'

function SearchResults() {
    let params = useParams()
    let searchQuery = params.searchQuery
    return (
        <div className="body">
            <Grid searchQuery={searchQuery} />
        </div>
    )
}

export default SearchResults
