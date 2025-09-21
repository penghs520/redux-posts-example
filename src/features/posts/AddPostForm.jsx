import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { postAdded } from './postSlice';

export const AddPostForm = () => {

    const [showAddPostForm, setShowAddPostForm] = useState(false);
    const [post, setPost] = useState({ title: '', content: '' });
    const [userId, setUserId] = useState('');

    const dispatch = useDispatch();

    const onUserIdChanged = e => setUserId(e.target.value);

    const users = useSelector(state => state.users);

    //const debounceTimer = useRef(null);

    const onTitleChanged = e => {
        const value = e.target.value;
        setPost({ ...post, title: value })
        //防抖处理 
        // 受控组件的输入内容不要防抖，防抖只用于副作用（如请求、校验等）。这样输入体验才流畅。
        // if (debounceTimer.current) clearTimeout(debounceTimer.current);
        // debounceTimer.current = setTimeout(() => {
        //     console.log("ssss")
        //     setPost({ ...post, title: value })
        // }, 300) //300毫秒
    };
    const onContentChanged = e => setPost({ ...post, content: e.target.value });

    console.log('post:', post);

    const onCancelClick = () => {
        setPost({ title: '', content: '' });
        setShowAddPostForm(false);
    }


    const canSave = Boolean(post.title) && Boolean(post.content) && Boolean(userId);

    const onSaveClick = () => {
        //dispatch({ type: 'posts/addPost', payload: { title: post.title, content: post.content } });
        dispatch(postAdded(post.title, post.content, userId));
        setPost({ title: '', content: '' });
        setShowAddPostForm(false);
    }

    const addPostForm = (
        <section>
            <h2>添加新文章</h2>
            <form>
                <label htmlFor="postTitle">标题:</label>
                <input type="text" id="postTitle" name="postTitle" value={post.title} onChange={onTitleChanged} />

                <label htmlFor="postAuthor">作者:</label>
                <select id="postAuthor" value={userId} onChange={onUserIdChanged}>
                    {/* 默认不选中任何作者 */}
                    <option value=""></option>
                    {
                        users.map(user => (
                            <option key={user.id} value={user.id}>{user.name}</option>
                        ))
                    }
                </select>
                <label htmlFor="postContent">内容:</label>
                <textarea id="postContent" name="postContent" value={post.content} onChange={onContentChanged}></textarea>

                <button type="button" onClick={onSaveClick} disabled={!canSave}>保存文章</button>
                <button type="button" onClick={onCancelClick}>取消</button>

            </form>

        </section>

    );

    //如果你想用 if 语句，可以在 return 之前处理
    let content;
    if (showAddPostForm) {
        content = addPostForm;
    } else {
        content = (
            <section>
                <button onClick={() => setShowAddPostForm(true)}>添加文章</button>
            </section>
        );
    }


    return (
        //不能直接在 return 语句里用 if/else 语句，只能用表达式（如三元运算符、逻辑与等）进行条件渲染

        // {
        //     if ({showAddPostForm}){
        //         addPostForm
        //     } else {
        //         <button>添加文章</button>
        //     }
        // }
        // <>
        //     {showAddPostForm ? addPostForm : <button onClick={() => setShowAddPostForm(true)}>添加文章</button>}
        // </>

        <>{content}</>
    );

}


