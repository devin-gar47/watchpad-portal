import { createSlice } from '@reduxjs/toolkit'

export const watchlistSlice = createSlice({
    name: 'Watchlist Entries',
    initialState: [],
    reducers: {
        setWatchlistEntries: (state, action) => {
            return action.payload
        },
        myAddWatchlist: (state, action) => {
            const arr = [...state, action.payload]
            return arr
        },
    },
})

export const { setWatchlistEntries, myAddWatchlist } = watchlistSlice.actions

export default watchlistSlice.reducer
