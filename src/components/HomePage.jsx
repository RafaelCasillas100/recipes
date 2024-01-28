import Header from "./Header/Header";
import MealDescription from "./Meals/MealDescription";
import MealList from "./Meals/MealList";
import PageTour, {
  MEAL_DESCRIPTION_CONTAINER_ID,
  MEAL_LIST_CONTAINER_ID,
} from "./PageTour";
import { useBookmarkedRecipes } from "../hooks/useBookmarkedRecipes";
import classes from "./HomePage.module.css";

const HomePage = () => {
  const {
    bookmarkedRecipes,
    isRecipeBookmarked,
    toggleBookmarkedRecipe,
    removeRecipeBookmarked,
  } = useBookmarkedRecipes();

  return (
    <div className={classes.app}>
      <Header
        bookmarkedRecipes={bookmarkedRecipes}
        removeRecipeBookmarked={removeRecipeBookmarked}
      />

      <div id={MEAL_LIST_CONTAINER_ID}>
        <MealList />
      </div>

      <div id={MEAL_DESCRIPTION_CONTAINER_ID}>
        <MealDescription
          isRecipeBookmarked={isRecipeBookmarked}
          toggleBookmarkedRecipe={toggleBookmarkedRecipe}
        />
      </div>

      <PageTour />
    </div>
  );
};

export default HomePage;
