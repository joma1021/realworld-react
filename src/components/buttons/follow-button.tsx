import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import { UserSessionContext } from "../../common/auth/auth-provider";
import { followUser, unfollowUser } from "../../services/profile-service";

type FollowButtonProps = {
  updateFollow: Dispatch<SetStateAction<boolean>>;
  following: boolean;
  username: string;
};

export function FollowButton(props: FollowButtonProps) {
  const [following, setFollowing] = useState(props.following);
  const { userContext } = useContext(UserSessionContext);
  const navigate = useNavigate();

  useEffect(() => {
    setFollowing(props.following);
  }, [props.following]);

  async function handleOnClick() {
    if (following) {
      const response = await unfollowUser(
        userContext.authToken,
        props.username
      );
      if (response.ok) {
        setFollowing(false);
        props.updateFollow(false);
      }
    } else {
      const response = await followUser(userContext.authToken, props.username);
      if (response.ok) {
        setFollowing(true);
        props.updateFollow(true);
      }
    }
  }

  return (
    <button
      className={`btn btn-sm btn-${!following ? "outline-" : ""}secondary`}
      onClick={
        userContext.isLoggedIn ? handleOnClick : () => navigate("/login")
      }
    >
      <i className="ion-plus-round"></i>
      &nbsp; {following ? "Unfollow" : "Follow"} {props.username}{" "}
      <span className="counter"></span>
    </button>
  );
}

export function ActionFollowButton(props: {
  following: boolean;
  username: string;
}) {
  const [following, setFollowing] = useState(props.following);
  const { userContext } = useContext(UserSessionContext);
  const navigate = useNavigate();

  async function handleOnClick() {
    if (following) {
      const response = await unfollowUser(
        userContext.authToken,
        props.username
      );
      if (response.ok) {
        setFollowing(false);
      }
    } else {
      const response = await followUser(userContext.authToken, props.username);
      if (response.ok) {
        setFollowing(true);
      }
    }
  }

  return (
    <button
      className={`btn btn-sm btn-${
        !following ? "outline-" : ""
      }secondary action-btn`}
      onClick={
        userContext.isLoggedIn ? handleOnClick : () => navigate("/login")
      }
    >
      <i className="ion-plus-round"></i>
      &nbsp; {following ? "Unfollow" : "Follow"} {props.username}{" "}
      <span className="counter"></span>
    </button>
  );
}
