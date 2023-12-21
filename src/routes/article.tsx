import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { UserSessionContext } from "../common/auth/auth-provider";
import { deleteArticle, getArticle } from "../services/article-service";
import { ArticleData } from "../models/article";
import { FavoriteButtonLarge } from "../components/buttons/favorite-button";
import Comments from "../components/comments/comments";
import { FollowButton } from "../components/buttons/follow-button";

type Params = {
  slug: string;
};

type FavoriteState = {
  favorite: boolean;
  count: number;
};

export default function ArticlePage() {
  const { userContext } = useContext(UserSessionContext);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const [following, setFollowing] = useState(false);
  const [favoriteState, setFavoriteState] = useState<FavoriteState>({
    favorite: false,
    count: 0,
  });
  const [article, setArticle] = useState<ArticleData>();

  const { slug } = useParams<Params>() as Params;

  useEffect(() => {
    getArticle(slug, userContext.authToken).then((article) => {
      setArticle(article);
      setFollowing(article.author.following);
      setFavoriteState({
        count: article.favoritesCount,
        favorite: article.favorited,
      });
      setIsLoading(false);
    });
  }, [slug]);

  async function onDeleteArticle() {
    const response = await deleteArticle(userContext.authToken, slug);
    if (response.ok) navigate("/");
  }

  if (isLoading) return <div>Loading Article...</div>;

  return (
    <>
      {!article ? (
        <div>Sth. went wrong...</div>
      ) : (
        <div className="article-page">
          <div className="banner">
            <div className="container">
              <h1>{article.title}</h1>

              <div className="article-meta">
                <Link to={`/profile/${article.author.username}`}>
                  <img src={article.author.image} />
                </Link>
                <div className="info">
                  <Link
                    to={`/profile/${article.author.username}`}
                    className="author"
                  >
                    {article.author.username}
                  </Link>
                  <span className="date">{article.createdAt}</span>
                </div>
                {userContext.username != article.author.username && (
                  <FollowButton
                    following={following}
                    username={article.author.username}
                    updateFollow={setFollowing}
                  />
                )}
                &nbsp;&nbsp;
                {userContext.username != article.author.username && (
                  <FavoriteButtonLarge
                    favorite={favoriteState.favorite}
                    count={favoriteState.count}
                    slug={slug}
                    updateFavorite={setFavoriteState}
                  />
                )}
                &nbsp;&nbsp;
                {userContext.username == article.author.username && (
                  <button
                    className="btn btn-sm btn-outline-secondary"
                    onClick={() => navigate(`/editor/${slug}`)}
                  >
                    <i className="ion-edit"></i> Edit Article
                  </button>
                )}
                &nbsp;&nbsp;
                {userContext.username == article.author.username && (
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={onDeleteArticle}
                  >
                    <i className="ion-trash-a"></i> Delete Article
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="container page">
            <div className="row article-content">
              <div className="col-md-12">
                <p>{article.body}</p>

                <ul className="tag-list">
                  {article.tagList.map((tag, i) => (
                    <li key={i} className="tag-default tag-pill tag-outline">
                      {tag}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <hr />

            <div className="article-actions">
              <div className="article-meta">
                <Link to={`/profile/${article.author.username}`}>
                  <img src={article.author.image} />
                </Link>
                <div className="info">
                  <Link
                    to={`/profile/${article.author.username}`}
                    className="author"
                  >
                    {article.author.username}
                  </Link>
                  <span className="date">{article.createdAt}</span>
                </div>
                {userContext.username != article.author.username && (
                  <FollowButton
                    following={following}
                    username={article.author.username}
                    updateFollow={setFollowing}
                  />
                )}
                &nbsp;&nbsp;
                {userContext.username != article.author.username && (
                  <FavoriteButtonLarge
                    favorite={favoriteState.favorite}
                    count={favoriteState.count}
                    slug={slug}
                    updateFavorite={setFavoriteState}
                  />
                )}
                &nbsp;&nbsp;
                {userContext.username == article.author.username && (
                  <button
                    className="btn btn-sm btn-outline-secondary"
                    onClick={() => navigate(`/editor/${slug}`)}
                  >
                    <i className="ion-edit"></i> Edit Article
                  </button>
                )}
                &nbsp;&nbsp;
                {userContext.username == article.author.username && (
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={onDeleteArticle}
                  >
                    <i className="ion-trash-a"></i> Delete Article
                  </button>
                )}
              </div>
            </div>
            <Comments slug={slug} />
          </div>
        </div>
      )}
    </>
  );
}
