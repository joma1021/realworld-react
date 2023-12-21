import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import { UserSessionContext } from "../../common/auth/auth-provider";
import {
  favoriteArticle,
  unfavoriteArticle,
} from "../../services/article-service";

type FavoriteState = {
  favorite: boolean;
  count: number;
};

type FavoriteProps = {
  updateFavorite: Dispatch<SetStateAction<FavoriteState>>;
  favorite: boolean;
  count: number;
  slug: string;
};

export function FavoriteButtonLarge(props: FavoriteProps) {
  const [favoriteState, setFavoriteState] = useState<FavoriteState>({
    favorite: props.favorite,
    count: props.count,
  });
  const { userContext } = useContext(UserSessionContext);
  const navigate = useNavigate();

  useEffect(() => {
    setFavoriteState({ favorite: props.favorite, count: props.count });
  }, [props]);

  async function handleOnClick() {
    if (favoriteState.favorite) {
      const response = await unfavoriteArticle(
        userContext.authToken,
        props.slug
      );
      if (response.ok) {
        setFavoriteState({
          favorite: false,
          count: favoriteState.count - 1,
        });
        props.updateFavorite({
          favorite: false,
          count: favoriteState.count - 1,
        });
      }
    } else {
      const response = await favoriteArticle(userContext.authToken, props.slug);
      if (response.ok) {
        setFavoriteState({
          favorite: true,
          count: favoriteState.count + 1,
        });
        props.updateFavorite({
          favorite: true,
          count: favoriteState.count + 1,
        });
      }
    }
  }

  return (
    <button
      className={`btn btn-sm btn-${
        !favoriteState.favorite ? "outline-" : ""
      }primary`}
      onClick={
        userContext.isLoggedIn
          ? () => handleOnClick()
          : () => navigate("/login")
      }
    >
      <i className="ion-heart"></i>
      &nbsp; {favoriteState.favorite ? "Unfavorite" : "Favorite"} Article{" "}
      <span className="counter">({favoriteState.count})</span>
    </button>
  );
}

export function FavoriteButtonSmall(props: {
  favorite: boolean;
  count: number;
  slug: string;
}) {
  const [favoriteState, setFavoriteState] = useState<FavoriteState>({
    favorite: props.favorite,
    count: props.count,
  });

  const { userContext } = useContext(UserSessionContext);
  const navigate = useNavigate();

  async function handleOnClick() {
    if (favoriteState.favorite) {
      const response = await unfavoriteArticle(
        userContext.authToken,
        props.slug
      );
      if (response.ok) {
        setFavoriteState({
          favorite: false,
          count: favoriteState.count - 1,
        });
      }
    } else {
      const response = await favoriteArticle(userContext.authToken, props.slug);
      if (response.ok) {
        setFavoriteState({
          favorite: true,
          count: favoriteState.count + 1,
        });
      }
    }
  }
  return (
    <button
      className={`btn btn-${
        !favoriteState.favorite ? "outline-" : ""
      }primary btn-sm pull-xs-right`}
      onClick={
        userContext.isLoggedIn ? handleOnClick : () => navigate("/login")
      }
    >
      <i className="ion-heart"></i> {favoriteState.count}
    </button>
  );
}
