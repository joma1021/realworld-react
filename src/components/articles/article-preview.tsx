import { Link } from "react-router-dom";
import { ArticleData } from "../../models/article";

export default function ArticlePreview(props: { article: ArticleData }) {
  return (
    <div className="article-preview">
      <div className="article-meta">
        <Link to={`/profile/${props.article.author.username}`}>
          <img src={`${props.article.author.image}`} />
        </Link>
        <div className="info">
          <a
            href={`/profile/${props.article.author.username}`}
            className="author"
          >
            {props.article.author.username}
          </a>
          <span className="date">{props.article.createdAt}</span>
        </div>
        {/* <FavoriteButtonSmall favorite={props.article.favorited} count={props.article.favoritesCount} slug={props.article.slug} /> */}
      </div>
      <Link to={`/article/${props.article.slug}`} className="preview-link">
        <h1>{props.article.title}</h1>
        <p>{props.article.description}</p>
        <span>Read more...</span>
        <ul className="tag-list">
          {props.article.tagList.map((tag) => (
            <li key={tag} className="tag-default tag-pill tag-outline">
              {tag}
            </li>
          ))}
        </ul>
      </Link>
    </div>
  );
}
