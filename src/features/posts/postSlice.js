import { createSlice, nanoid } from '@reduxjs/toolkit'
import { add } from 'date-fns'

const initState = [
  { id: '1', title: 'First Post!', content: 'Hello!' },
  { id: '2', title: 'Second Post', content: 'More text' },
]

const postSlice = createSlice({
  name: 'posts',
  initialState: initState,
  reducers: {
    addPost: (state, action) => {
      const { title, content } = action.payload
      const newPost = {
        id: nanoid(),
        title,
        content,
      }
      state.push(newPost)
    },
  },
})

export const { addPost } = postSlice.actions

export default postSlice.reducer
