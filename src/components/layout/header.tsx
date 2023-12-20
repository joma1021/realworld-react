import { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { UserSessionContext } from "../../common/auth/auth-provider";

export default function Header() {
  const { userContext } = useContext(UserSessionContext)!;
  const { pathname } = useLocation();

  return (
    <nav className="navbar navbar-light">
      <div className="container">
        <Link className="navbar-brand" to="/">
          conduit
        </Link>
        {userContext.username ? (
          <ul className="nav navbar-nav pull-xs-right">
            <li className="nav-item">
              <Link
                className={`nav-link ${pathname == "/" ? "active" : ""}`}
                to="/"
                id="home"
              >
                Home
              </Link>
            </li>

            <li className="nav-item">
              <Link
                className={`nav-link ${pathname == "/editor" ? "active" : ""}`}
                to="/editor"
                id="editor"
              >
                <i className="ion-compose"></i>&nbsp;New Article{" "}
              </Link>
            </li>

            <li className="nav-item">
              <Link
                className={`nav-link ${
                  pathname == "/settings" ? "active" : ""
                }`}
                to="/settings"
                id="settings"
              >
                {" "}
                <i className="ion-gear-a"></i>&nbsp;Settings{" "}
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  pathname.includes("/profile") ? "active" : ""
                }`}
                to={`/profile/${userContext.username}`}
                id="profile"
              >
                {userContext.image && (
                  <img
                    width={25}
                    height={25}
                    src={userContext.image}
                    className="user-pic"
                  />
                )}
                {userContext.username}
              </Link>
            </li>
          </ul>
        ) : (
          <ul className="nav navbar-nav pull-xs-right">
            <li className="nav-item">
              <Link
                className={`nav-link ${pathname == "/" ? "active" : ""}`}
                to="/"
                id="home"
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${pathname == "/login" ? "active" : ""}`}
                to="/login"
                id="login"
              >
                Sign in
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  pathname == "/register" ? "active" : ""
                }`}
                to="/register"
                id="register"
              >
                Sign up
              </Link>
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
}
