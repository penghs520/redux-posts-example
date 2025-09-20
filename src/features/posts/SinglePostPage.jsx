
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

export const SinglePostPage = () => {

   let { postId } = useParams();

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

    return (
        <section>
            <article className="post">
                <h2>{post.title}</h2>
                <p>{post.content}</p>
            </article>
        </section>
    );
}