import React from 'react'
import { useDispatch } from 'react-redux'
import { reactionAdded } from './postSlice'

const reactionEmoji = {
    thumbsUp: '👍',
    hooray: '🎉',
    heart: '❤️',
    rocket: '🚀',
    eyes: '👀'
}

export const ReactionButton = ({ post }) => {
    const dispatch = useDispatch()

    const onReactionClick = (name) => {
        console.log(name)
        dispatch(reactionAdded({ postId: post.id, reaction: name }))
    }

    const reactionButtons = Object.entries(reactionEmoji).map(([name, emoji]) => {
        return (
            <button key={name} type="button" className="muted-button reaction-button" onClick={() => onReactionClick(name)}>
                {emoji} {post.reactions[name]}
            </button>
        )
    })

    return <div>{reactionButtons}</div>
}