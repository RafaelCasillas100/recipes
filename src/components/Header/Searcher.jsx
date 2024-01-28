import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { SEARCHER_CONTAINER_ID } from "../PageTour";
import { recipesOptions } from "./recipesOptions";
import classes from "./Searcher.module.css";
import { SEARCH_KEY, useQueryParams } from "../../hooks/useQueryParams";

const Searcher = ({ searchRef, showRecipesMatches, setShowRecipesMatches }) => {
  const [inputValue, setInputValue] = useState("");
  const [recipesMatches, setRecipesMatches] = useState([]);
  const { setQueryParam, getSearchParam } = useQueryParams();

  const searchParam = getSearchParam(SEARCH_KEY);
  useEffect(() => {
    if (searchParam) setInputValue(searchParam);
  }, [searchParam]);

  const onInputTextChange = (newInputValue) => {
    setInputValue(newInputValue);
    setShowRecipesMatches(true);

    const filteredRecipes = recipesOptions.filter((option) =>
      option.startsWith(newInputValue)
    );
    setRecipesMatches(filteredRecipes);
  };

  const onSearch = (newInputValue) => {
    setInputValue(newInputValue);
    setQueryParam(SEARCH_KEY, newInputValue);
    setShowRecipesMatches(false);
  };

  return (
    <div
      id={SEARCHER_CONTAINER_ID}
      ref={searchRef}
      className={classes.container}
    >
      <input
        value={inputValue}
        onFocus={() => onInputTextChange(inputValue)}
        onChange={(e) => onInputTextChange(e.target.value)}
        className={classes.input}
        placeholder="Search your favorite recipe"
        type="text"
      />
      <button className={classes.button} onClick={() => onSearch(inputValue)}>
        <FontAwesomeIcon className={classes.search} icon={faMagnifyingGlass} />{" "}
        SEARCH
      </button>

      {showRecipesMatches && recipesMatches.length ? (
        <div className={classes["results-list"]}>
          {recipesMatches.map((recipeTitle) => (
            <div
              key={recipeTitle}
              className={classes.results}
              onClick={() => onSearch(recipeTitle)}
            >
              {recipeTitle}
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default Searcher;
