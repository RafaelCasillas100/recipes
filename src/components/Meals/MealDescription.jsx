import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClock,
  faUserGroup,
  faBookmark,
  faCirclePlus,
  faCircleMinus,
  faCheck,
  faArrowRight,
  faFaceSmile,
} from "@fortawesome/free-solid-svg-icons";
import classes from "./MealDescription.module.css";
import Loader from "../common/Loader";
import { useEffect, useState } from "react";
import TooltipEl from "../common/TooltipEl";
import { useRecipe } from "../../hooks/useRecipe";
import { RECIPE_ID, useQueryParams } from "../../hooks/useQueryParams";

const MealDescription = ({ isRecipeBookmarked, toggleBookmarkedRecipe }) => {
  const [additionalServings, setAdditionalServings] = useState(0);
  const [tooltipText, setTooltipText] = useState(null);

  const { data: recipe, isLoading, isError } = useRecipe();
  const { getSearchParam } = useQueryParams();
  const recipeId = getSearchParam(RECIPE_ID);

  useEffect(() => {
    setAdditionalServings(0);
  }, [recipeId]);

  if (isLoading)
    return (
      <div className={classes.loading}>
        <Loader />
      </div>
    );

  if (isError)
    return (
      <div className={classes["meal-description"]}>Error to fetch data</div>
    );

  if (!recipe)
    return (
      <div className={classes["meal-description"]}>
        <p className={classes["default-text"]}>
          <FontAwesomeIcon
            className={`${classes.icon} ${classes["happy-face"]}`}
            icon={faFaceSmile}
          />{" "}
          Start by searching for a recipe or an ingredient
        </p>
      </div>
    );

  const increaseServing = () => {
    if (additionalServings === 10) return;
    setAdditionalServings((lastVal) => lastVal + 1);
  };

  const decreaseServing = () => {
    if (!additionalServings) return;
    setAdditionalServings((lastVal) => lastVal - 1);
  };

  const isBookmarked = isRecipeBookmarked(recipe.id);

  const toggleBookmark = (recipe) => {
    toggleBookmarkedRecipe(recipe);
    if (isBookmarked) setTooltipText("Removed");
    else setTooltipText("Added");

    setTimeout(() => setTooltipText(null), 1000);
  };

  return (
    <div className={classes["meal-description"]}>
      <div className={classes.title}>
        <h1>{recipe.title.toUpperCase()}</h1>
      </div>
      <div className={classes["img-container"]}>
        <img
          className={classes.img}
          src={recipe.image_url}
          alt={recipe.title}
        />
      </div>

      <div className={classes["info-container"]}>
        <div className={classes["minutes-servings"]}>
          <p>
            <FontAwesomeIcon className={classes.icon} icon={faClock} />{" "}
            {recipe.cooking_time} MINUTES
          </p>
          <p>
            <FontAwesomeIcon className={classes.icon} icon={faUserGroup} />{" "}
            {recipe.servings + additionalServings} SERVINGS{" "}
            <span onClick={decreaseServing}>
              <FontAwesomeIcon
                className={`${classes.icon} ${classes.minus}`}
                icon={faCircleMinus}
              />
            </span>
            <span onClick={increaseServing}>
              <FontAwesomeIcon
                className={`${classes.icon} ${classes.plus}`}
                icon={faCirclePlus}
              />
            </span>
          </p>
        </div>
        <div
          onClick={() => toggleBookmark(recipe)}
          className={
            isBookmarked
              ? classes["bookmark-container-bookmarked"]
              : classes["bookmark-container-default"]
          }
        >
          <FontAwesomeIcon className={classes.icon} icon={faBookmark} />
        </div>
      </div>

      <div className={classes["ingredients-container"]}>
        <h1>RECIPE INGREDIENTS</h1>
        {recipe.ingredients.slice(0, 9).map((ingredient, i) => (
          <p key={i}>
            <FontAwesomeIcon className={`${classes.check}`} icon={faCheck} />{" "}
            {((recipe.servings + additionalServings) * ingredient.quantity) /
              recipe.servings}{" "}
            {ingredient.unit}{" "}
            {ingredient.description.length > 65
              ? `${ingredient.description.slice(0, 30)}...`
              : ingredient.description}
          </p>
        ))}
        <a href={recipe.source_url} target="_blank" rel="noreferrer">
          <button className={classes["button-cook"]}>
            HOW TO COOK IT{" "}
            <FontAwesomeIcon
              className={classes["right-arrow"]}
              icon={faArrowRight}
            />
          </button>
        </a>
      </div>

      <TooltipEl tooltipText={tooltipText} />
    </div>
  );
};

export default MealDescription;
