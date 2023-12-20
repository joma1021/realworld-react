import TagsSidebar from "../components/tags/tags-sidebar";
import FeedTabs from "../components/tabs/feed-tabs";
import ArticleList from "../components/articles/article-list";
import { useContext } from "react";
import { UserSessionContext } from "../common/auth/auth-provider";

export default function HomePage() {
  const { userContext } = useContext(UserSessionContext);
  return (
    <div className="home-page">
      {!userContext.isLoggedIn && (
        <div className="banner">
          <div className="container">
            <h1 className="logo-font">conduit</h1>
            <p>A place to share your knowledge.</p>
          </div>
        </div>
      )}
      <div className="container page">
        <div className="row">
          <div className="col-md-9">
            <FeedTabs />
            <ArticleList />
          </div>

          <TagsSidebar />
        </div>
      </div>
    </div>
  );
}
