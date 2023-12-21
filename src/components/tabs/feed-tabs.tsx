import { useContext, useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Tab } from "../../models/tab";
import { UserSessionContext } from "../../common/auth/auth-provider";

export default function FeedTabs() {
  const { userContext } = useContext(UserSessionContext);
  const [searchParams] = useSearchParams();

  const [tab, setTab] = useState(
    userContext.isLoggedIn ? Tab.Your : Tab.Global
  );

  useEffect(() => {
    const filter = searchParams.get("filter");
    if (filter) {
      setTab(filter);
    } else {
      setTab(userContext.isLoggedIn ? Tab.Your : Tab.Global);
    }
  }, [searchParams]);

  return (
    <div className="feed-toggle">
      <ul className="nav nav-pills outline-active">
        {userContext.isLoggedIn && (
          <li className="nav-item">
            <Link
              className={`nav-link ${tab == Tab.Your && "active"}`}
              style={{ cursor: "pointer" }}
              to={`/?filter=${Tab.Your}`}
            >
              Your Feed
            </Link>
          </li>
        )}

        <li className="nav-item">
          <Link
            className={`nav-link ${tab == Tab.Global && "active"}`}
            style={{ cursor: "pointer" }}
            to={`/?filter=${Tab.Global}`}
          >
            Global Feed
          </Link>
        </li>
        {tab != Tab.Your && tab != Tab.Global && (
          <li className="nav-item">
            <Link
              className={"nav-link active"}
              style={{ cursor: "pointer" }}
              to={`/?filter=${tab}`}
            >
              #{tab}
            </Link>
          </li>
        )}
      </ul>
    </div>
  );
}
