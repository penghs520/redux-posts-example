import { createSlice, nanoid } from '@reduxjs/toolkit'
import { sub } from 'date-fns'

const initState = [
  {
    id: '1', date: sub(new Date(), { minutes: 10 }).toISOString(), title: 'First Post!', content: 'Hello!', user: '1',
    reactions: { thumbsUp: 0, hooray: 0, heart: 0, rocket: 0, eyes: 0 }
  },
  {
    id: '2', date: sub(new Date(), { minutes: 5 }).toISOString(), title: 'Second Post', content: 'More text', user: '2',
    reactions: { thumbsUp: 0, hooray: 0, heart: 0, rocket: 0, eyes: 0 }
  },
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
            date: new Date().toISOString(),
            title,
            content,
            user: userId,
            reactions: { thumbsUp: 0, hooray: 0, heart: 0, rocket: 0, eyes: 0 }
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
    reactionAdded(state, action) {
      const { postId, reaction } = action.payload
      const existingPost = state.find(post => post.id === postId)
      if (existingPost) {
        existingPost.reactions[reaction]++
      }
    }
  },
})

export const { postAdded, postUpdated, reactionAdded } = postSlice.actions

export default postSlice.reducer
