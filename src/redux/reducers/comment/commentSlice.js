import { createSlice } from '@reduxjs/toolkit'

export const commentSlice = createSlice({
    name: 'Media Comments',
    initialState: [],
    reducers: {
        setMediaComments: (state, action) => {
            return action.payload
        },
        myAddComment: (state, action) => {
            const arr = [...state, action.payload]
            return arr
        },

        myDeleteComment: (state, action) => {
            const arr = state.filter(
                (commentSlice) => commentSlice !== action.payload
            )

            return arr
        },
    },
})

export const { setMediaComments, myAddComment, myDeleteComment } =
    commentSlice.actions

export default commentSlice.reducer
