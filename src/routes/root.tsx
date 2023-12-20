import TagsSidebar from "../components/tags/tags-sidebar";
import FeedTabs from "../components/tabs/feed-tabs";
import ArticleList from "../components/articles/article-list";

export default function HomePage() {
  return (
    <div className="home-page">
      {/* {!userSession.isLoggedIn && ( */}
      <div className="banner">
        <div className="container">
          <h1 className="logo-font">conduit</h1>
          <p>A place to share your knowledge.</p>
        </div>
      </div>
      {/* )} */}
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
