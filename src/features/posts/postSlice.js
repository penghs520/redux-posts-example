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
      prepare(title, content) {
        return {
          payload: {
            id: nanoid(),
            title,
            content,
          },
        }
      },
    },
  },
})

export const { postAdded } = postSlice.actions

export default postSlice.reducer
