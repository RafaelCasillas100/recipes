import classes from "./Header.module.css";
import forkyImage from "../../images/forky.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark } from "@fortawesome/free-solid-svg-icons";
import Searcher from "./Searcher";
import BookmarkModal from "./BookmarkModal";
import { useState, useEffect, useCallback, useRef } from "react";
import { OPTIONS_CONTAINER_ID } from "../PageTour";

const Header = ({ bookmarkedRecipes, removeRecipeBookmarked }) => {
  const [isShowBookmarks, setIsShowBookmarks] = useState(false);
  const [showRecipesMatches, setShowRecipesMatches] = useState(false);
  const bookmarkRef = useRef(null);
  const searchRef = useRef(null);

  const handleClickOutside = useCallback((event) => {
    if (!bookmarkRef.current?.contains(event.target)) setIsShowBookmarks(false);
    if (!searchRef.current?.contains(event.target))
      setShowRecipesMatches(false);
  }, []);

  const showBookmarks = () => {
    if (isShowBookmarks) setIsShowBookmarks(false);
    else setIsShowBookmarks(true);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside]);

  return (
    <div className={classes.header}>
      <img className={classes.image} src={forkyImage} alt="forky" />
      <Searcher
        searchRef={searchRef}
        showRecipesMatches={showRecipesMatches}
        setShowRecipesMatches={setShowRecipesMatches}
      />
      <div
        ref={bookmarkRef}
        id={OPTIONS_CONTAINER_ID}
        className={classes["recipe-book-container"]}
        onClick={showBookmarks}
      >
        <h1 className={classes.bookmarks}>
          <FontAwesomeIcon
            className={`${classes["icon-color"]} ${classes.bookmarks}`}
            icon={faBookmark}
          />{" "}
          BOOKMARKS
        </h1>
        {isShowBookmarks ? (
          <BookmarkModal
            bookmarkedRecipes={bookmarkedRecipes}
            removeRecipeBookmarked={removeRecipeBookmarked}
          />
        ) : null}
      </div>
    </div>
  );
};

export default Header;
