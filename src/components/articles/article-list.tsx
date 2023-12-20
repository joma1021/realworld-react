import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Tab } from "../../models/tab";
import {
  getGlobalArticles,
  getYourArticles,
} from "../../services/article-service";
import { ArticlesDTO } from "../../models/article";
import ArticlePreview from "./article-preview";

export default function ArticleList() {
  // const userSession = useContext<UserSessionStore>(UserSessionContext);
  const authToken = undefined;
  const [searchParams, setSearchParams] = useSearchParams();

  // filter [filter, setFilter] = useState(userSession.isLoggedIn ? Tab.Your : Tab.Global);
  const [filter, setFilter] = useState<string>(false ? Tab.Your : Tab.Global);
  const [page, setPage] = useState(Number(searchParams.get("page") ?? 1));
  const [articles, setArticles] = useState<ArticlesDTO>({
    articles: [],
    articlesCount: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const currentfilter = searchParams.get("filter");
    if (currentfilter) setFilter(currentfilter);

    setPage(Number(searchParams.get("page") ?? 1));

    // if (filter == Tab.Your) {
    //   return getYourArticles(
    //     authToken,
    //     page
    //   );
    // } else
    console.log("Current Filter: " + currentfilter);
    if (filter == Tab.Global) {
      setIsLoading(true);
      getGlobalArticles(null, page, authToken)
        .then((articles) => {
          setArticles(articles);
        })
        .then(() => setIsLoading(false));
    } else {
      setIsLoading(true);
      getGlobalArticles(currentfilter, page, authToken)
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
