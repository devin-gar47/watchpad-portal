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
            return arr
        },
    },
})

export const { setDurationComments, myAddDurationComment } =
    durationSlice.actions

export default durationSlice.reducer
