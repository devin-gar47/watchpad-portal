import { createSlice } from '@reduxjs/toolkit'
import { clone } from 'ramda'

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
                (object) => object.comment_id !== action.payload.comment_id
            )

            return arr
        },

        myEditComment: (state, action) => {
            const index = state.findIndex(
                (object => object.comment_id == action.payload.comment_id)
            
            )
            state[index] = action.payload
            return state
        },
    },
})

export const { setMediaComments, myAddComment, myDeleteComment, myEditComment } =
    commentSlice.actions

export default commentSlice.reducer
