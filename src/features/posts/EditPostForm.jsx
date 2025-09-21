import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { postUpdated } from "./postSlice";

export const EditPostForm = () => {

    const { postId } = useParams();
    const post = useSelector((state) =>
        state.posts.find((post) => post.id === postId)
    );

    if (!post) {
        return (
            <section>
                <h2>文章未找到!</h2>
                <p>抱歉，无法找到所请求的文章!</p>
            </section>
        );
    }

    const dispatch = useDispatch();

    // 使用局部状态来管理表单输入
    const [postState, setPost] = useState(post);

    const onTitleChanged = e => setPost({ ...post, title: e.target.value });

    const onContentChanged = e => setPost({ ...post, content: e.target.value });

    const navigate = useNavigate();

    const onCancelClick = () => {
        console.log('取消编辑，回到首页');
        // 处理取消编辑的逻辑
        // 可以使用导航返回到文章详情页或文章列表页
        //redirect('/'); 你现在用的 redirect('/') 只适用于 react-router v6 的 loader/action，不适用于组件内部事件。
        //在组件内部应该用 useNavigate 实现页面跳转
        navigate('/'); //其实我觉得更好的方式应该是 弹出一个modal框来做编辑，当取消时关闭modal就行了
    };

    const onSaveClick = () => {
        // 处理保存编辑的逻辑
        console.log('post', postState);
        dispatch(postUpdated(postState.id, postState.title, postState.content));
        navigate(`/posts/${postState.id}`);
    }

    return (
        <section>
            <h2>编辑文章</h2>
            <form>
                <label htmlFor="postTitle">标题:</label>
                <input type="text" id="postTitle" name="postTitle" value={postState.title} onChange={onTitleChanged} />

                <label htmlFor="postContent">内容:</label>
                <textarea id="postContent" name="postContent" value={postState.content} onChange={onContentChanged}></textarea>

                <button type="button" onClick={onSaveClick}>保存文章</button>
                <button type="button" onClick={onCancelClick}>取消</button>

            </form>

        </section>
    );
}
