import { useContext, useEffect, useState } from "react";
import { UserSessionContext } from "../../common/auth/auth-provider";
import { validateInput } from "../../common/helpers";
import {
  createComment,
  deleteComment,
  getComments,
} from "../../services/comment-service";
import { Link } from "react-router-dom";
import { CommentData } from "../../models/comment";

export interface commentState {
  isLoading: boolean;
  refreshComments: boolean;
}

export default function Comments(props: { slug: string }) {
  const { userContext } = useContext(UserSessionContext);
  const [refreshComments, setRefreshComments] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [comments, setComments] = useState<CommentData[]>();

  useEffect(() => {
    getComments(props.slug, userContext.authToken).then((comments) =>
      setComments(comments)
    );
  }, [refreshComments]);

  async function onSubmitComment(event: any) {
    event.preventDefault();
    setIsLoading(true);

    const comment = event.target.comment.value;

    if (!validateInput(comment)) {
      setIsLoading(false);
      return;
    }

    const response = await createComment(
      props.slug,
      comment,
      userContext.authToken
    );
    if (!response.ok) {
      setIsLoading(false);
      return;
    }
    setIsLoading(false);
    event.target.comment.value = "";
    setRefreshComments(!refreshComments);
  }

  async function onDeleteComment(commentId: number) {
    const response = await deleteComment(
      props.slug,
      commentId,
      userContext.authToken
    );
    if (response.ok) setRefreshComments(!refreshComments);
  }

  if (isLoading) return <div>Loading Comments...</div>;

  return (
    <div className="row">
      <div className="col-xs-12 col-md-8 offset-md-2">
        {userContext.isLoggedIn ? (
          <form className="card comment-form" onSubmit={onSubmitComment}>
            <div className="card-block">
              <textarea
                className="form-control"
                name="comment"
                placeholder="Write a comment..."
                rows={3}
              ></textarea>
            </div>
            <div className="card-footer">
              <img src={userContext.image} className="comment-author-img" />
              <button
                className="btn btn-sm btn-primary"
                type="submit"
                disabled={isLoading}
              >
                Post Comment{" "}
              </button>
            </div>
          </form>
        ) : (
          <div className="row">
            <div className="col-xs-12 col-md-8 offset-md-2">
              <p>
                <Link to="/login">Sign in</Link>
                &nbsp; or &nbsp;
                <Link to="/register">Sign up</Link>
                &nbsp; to add comments on this article.
              </p>
            </div>
          </div>
        )}
        {!comments ? (
          <div>Sth. went wrong...</div>
        ) : (
          <div className="tag-list">
            {comments.map((comment) => (
              <div className="card" key={comment.id}>
                <div className="card-block">
                  <p className="card-text">{comment.body}</p>
                </div>
                <div className="card-footer">
                  <Link
                    to={`/profile/${comment.author}`}
                    className="comment-author"
                  >
                    <img
                      src={comment.author.image}
                      className="comment-author-img"
                    />
                  </Link>
                  &nbsp;
                  <Link
                    to={`/profile/${comment.author}`}
                    className="comment-author"
                  >
                    {comment.author.username}
                  </Link>
                  <span className="date-posted">{comment.createdAt}</span>
                  {comment.author.username == userContext.username && (
                    <span className="mod-options">
                      <i
                        className="ion-trash-a"
                        onClick={() => onDeleteComment(comment.id)}
                      ></i>
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
