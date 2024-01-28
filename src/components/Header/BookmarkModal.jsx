import classes from "./BookmarkModal.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTriangleExclamation,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { RECIPE_ID, useQueryParams } from "../../hooks/useQueryParams";

const BookmarkModal = ({ bookmarkedRecipes, removeRecipeBookmarked }) => {
  const { setQueryParam } = useQueryParams();

  if (!bookmarkedRecipes.length)
    return (
      <div className={classes["bookmark-list"]}>
        <div className={classes["default-text-container"]}>
          <p className={classes["default-text"]}>
            <FontAwesomeIcon
              className={classes.icon}
              icon={faTriangleExclamation}
            />{" "}
            No bookmarks yet. Find a nice recipe and bookmark it
          </p>
        </div>
      </div>
    );

  return (
    <div className={classes["bookmark-list"]}>
      {bookmarkedRecipes.map((recipe) => (
        <div
          onClick={() => setQueryParam(RECIPE_ID, recipe.id)}
          key={recipe.id}
          id={recipe.id}
          className={classes["meal-container"]}
        >
          <img
            className={classes.img}
            src={recipe.image_url}
            alt={recipe.title}
          />
          <div className={classes["text-container"]}>
            <h1 className={classes.title}>
              {recipe.title.length > 30
                ? `${recipe.title.toUpperCase().slice(0, 30)}...`
                : recipe.title.toUpperCase()}
            </h1>
            <p className={classes.description}>{recipe.publisher}</p>
          </div>
          <div onClick={() => removeRecipeBookmarked(recipe)}>
            <FontAwesomeIcon className={classes.xmark} icon={faXmark} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default BookmarkModal;
