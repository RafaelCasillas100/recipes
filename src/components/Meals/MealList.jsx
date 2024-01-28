import classes from "./MealList.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import Loader from "../common/Loader";
import {
  RECIPE_ID,
  SEARCH_KEY,
  useQueryParams,
} from "../../hooks/useQueryParams";
import { useRecipes } from "../../hooks/useRecipes";

const ITEMS_PER_PAGE = 5;

const MealList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { setQueryParam, getSearchParam } = useQueryParams();
  const searchParam = getSearchParam(SEARCH_KEY);
  const { data: recipes, isLoading, isError } = useRecipes(searchParam);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchParam]);

  if (isLoading)
    return (
      <div className={classes.container}>
        <Loader />
      </div>
    );

  if (isError)
    return (
      <div className={classes.container}>
        <p className={classes.message}>Error to fetch data</p>
      </div>
    );

  if (!recipes?.length)
    return (
      <div className={classes.container}>
        {searchParam ? (
          <p className={classes.message}>
            There are no results for "{searchParam}", try with a different
            recipe.
          </p>
        ) : null}
      </div>
    );

  const renderNextPage = () => setCurrentPage((lastVal) => lastVal + 1);
  const renderPreviousPage = () => setCurrentPage((lastVal) => lastVal - 1);

  const TOTAL_PAGES = recipes.length / ITEMS_PER_PAGE;
  const sliceStart = ITEMS_PER_PAGE * (currentPage - 1);

  return (
    <div className={classes.container}>
      <div className={classes["meal-list"]}>
        {recipes
          .slice(sliceStart, sliceStart + ITEMS_PER_PAGE)
          .map((recipe) => (
            <div
              key={recipe.id}
              id={recipe.id}
              onClick={() => setQueryParam(RECIPE_ID, recipe.id)}
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
            </div>
          ))}
      </div>

      <div className={classes["buttons-container"]}>
        {currentPage > 1 ? (
          <button onClick={renderPreviousPage} className={classes.button}>
            <FontAwesomeIcon icon={faArrowLeft} /> Page {currentPage - 1}
          </button>
        ) : (
          <div />
        )}

        {currentPage < TOTAL_PAGES ? (
          <button onClick={renderNextPage} className={classes.button}>
            Page {currentPage + 1} <FontAwesomeIcon icon={faArrowRight} />
          </button>
        ) : null}
      </div>
    </div>
  );
};

export default MealList;
