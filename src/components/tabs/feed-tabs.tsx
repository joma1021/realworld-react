import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Tab } from "../../models/tab";

export default function FeedTabs() {
  // const userSession = useContext<UserSessionStore>(UserSessionContext);
  const [searchParams, setSearchParams] = useSearchParams();

  // const [tab, setTab] = useState(userSession.isLoggedIn ? Tab.Your : Tab.Global);
  const [tab, setTab] = useState(false ? Tab.Your : Tab.Global);

  useEffect(() => {
    const filter = searchParams.get("filter");
    if (filter) setTab(filter);
  }, [searchParams]);

  return (
    <div className="feed-toggle">
      <ul className="nav nav-pills outline-active">
        {/* {userSession.isLoggedIn && (
          <li className="nav-item">
            <Link
              class={`nav-link ${tab.value == Tab.Your && "active"}`}
              style="cursor: pointer;"
              href={`/?filter=${Tab.Your}`}
            >
              Your Feed
            </Link>
          </li>
        )} */}

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
