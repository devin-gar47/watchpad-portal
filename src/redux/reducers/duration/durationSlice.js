import { createSlice } from '@reduxjs/toolkit'

export const durationSlice = createSlice({
    name: 'Duration Comments',
    initialState: [],
    reducers: {
        setDurationComments: (state, action) => {
            return action.payload
        },
        myAddDurationComment: (state, action) => {
            const arr = [...state, action.payload]
            return arr.sort((a,b) => (parseInt(String(a.duration_timestamp))) < (parseInt(String(b.duration_timestamp))) ? 1:-1)
        },
    },
})

export const { setDurationComments, myAddDurationComment } =
    durationSlice.actions

export default durationSlice.reducer
