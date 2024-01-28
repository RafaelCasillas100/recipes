import { useState } from "react";

export const useBookmarkedRecipes = () => {
  const [bookmarkedRecipes, setBookmarkedRecipes] = useState([]);

  const isRecipeBookmarked = (recipeId) => {
    return !!bookmarkedRecipes.find((recipe) => recipe.id === recipeId);
  };

  const addRecipeBookmarked = (recipe) => {
    const newRecipes = [...bookmarkedRecipes];
    newRecipes.push(recipe);
    setBookmarkedRecipes(newRecipes);
  };

  const removeRecipeBookmarked = (recipe) => {
    const newRecipes = bookmarkedRecipes.filter(
      (bookmarkedRecipe) => bookmarkedRecipe.id !== recipe.id
    );
    setBookmarkedRecipes(newRecipes);
  };

  const toggleBookmarkedRecipe = (recipe) => {
    if (isRecipeBookmarked(recipe.id)) removeRecipeBookmarked(recipe);
    else addRecipeBookmarked(recipe);
  };

  return {
    bookmarkedRecipes,
    isRecipeBookmarked,
    toggleBookmarkedRecipe,
    removeRecipeBookmarked,
  };
};
