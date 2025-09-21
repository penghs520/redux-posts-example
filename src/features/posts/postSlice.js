import { createSlice, nanoid } from '@reduxjs/toolkit'
import { add } from 'date-fns'

const initState = [
  { id: '1', title: 'First Post!', content: 'Hello!', user: '1' },
  { id: '2', title: 'Second Post', content: 'More text', user: '2' },
]

const postSlice = createSlice({
  name: 'posts',
  initialState: initState,
  reducers: {
    // postAdded: (state, action) => {
    //   const { title, content } = action.payload
    //   const newPost = {
    //     id: nanoid(), Reducer 中永远不应该计算随机值，因为这会使结果不可预测，不过在slice中我们可以使用prepare来生成action payload
    //     title,
    //     content,
    //   }
    //   state.push(newPost)
    // },
    postAdded: {
      reducer(state, action) {
        state.push(action.payload)
      },
      prepare(title, content, userId) {
        return {
          payload: {
            id: nanoid(),
            title,
            content,
            user: userId,
          },
        }
      },
    },
    postUpdated: {
      reducer(state, action) {
        const { id, title, content } = action.payload
        const existingPost = state.find((post) => post.id === id)
        if (existingPost) {
          existingPost.title = title
          existingPost.content = content
        }
      },
      prepare(id, title, content) {
        return {
          payload: {
            id,
            title,
            content,
          },
        }
      },
    },
  },
})

export const { postAdded, postUpdated } = postSlice.actions

export default postSlice.reducer
