import { useContext, useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Tab } from "../../models/tab";
import {
  getGlobalArticles,
  getYourArticles,
} from "../../services/article-service";
import { ArticlesDTO } from "../../models/article";
import ArticlePreview from "./article-preview";
import { UserSessionContext } from "../../common/auth/auth-provider";

export default function ArticleList() {
  const { userContext } = useContext(UserSessionContext);
  const [searchParams, setSearchParams] = useSearchParams();

  const filter =
    searchParams.get("filter") ??
    (userContext.isLoggedIn ? Tab.Your : Tab.Global);
  const page = Number(searchParams.get("page") ?? 1);

  const [articles, setArticles] = useState<ArticlesDTO>({
    articles: [],
    articlesCount: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const filter =
      searchParams.get("filter") ??
      (userContext.isLoggedIn ? Tab.Your : Tab.Global);
    const page = Number(searchParams.get("page") ?? 1);

    if (filter == Tab.Your) {
      getYourArticles(userContext.authToken, page)
        .then((articles) => {
          setArticles(articles);
        })
        .then(() => setIsLoading(false));
    } else if (filter == Tab.Global) {
      setIsLoading(true);
      getGlobalArticles(null, page, userContext.authToken)
        .then((articles) => {
          setArticles(articles);
        })
        .then(() => setIsLoading(false));
    } else {
      setIsLoading(true);
      getGlobalArticles(filter, page, userContext.authToken)
        .then((articles) => {
          setArticles(articles);
        })
        .then(() => setIsLoading(false));
    }
  }, [searchParams]);

  if (isLoading) return <div>Loading Articles...</div>;

  return (
    <div>
      <>
        {articles!.articles.length == 0 ? (
          <div>No articles are here... yet.</div>
        ) : (
          <ul>
            {articles!.articles.map((article) => (
              <ArticlePreview article={article} key={article.slug} />
            ))}
          </ul>
        )}

        <ul className="pagination">
          {Array(Math.ceil(articles!.articlesCount / 10))
            .fill(null)
            .map((_, i) => (
              <li
                className={`page-item  ${i == page - 1 ? "active" : ""}`}
                key={i}
              >
                <Link
                  className="page-link"
                  style={{ cursor: "pointer" }}
                  to={`/?filter=${filter}&page=${i + 1}`}
                >
                  {i + 1}
                </Link>
              </li>
            ))}
        </ul>
      </>
    </div>
  );
}
