import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const getRecipes = async (mealName) => {
  const recipesData = await axios.get(
    "https://forkify-api.herokuapp.com/api/v2/recipes",
    {
      params: { search: mealName, key: "4921d73e-5fc2-47b6-90a8-dfe1ae39f7cc" },
    }
  );
  return recipesData.data.data.recipes;
};

const MINUTE = 1000 * 60;
const RECIPES_QUERY_KEY = "recipes";

export const getRecipesQueryKey = (mealName) => [RECIPES_QUERY_KEY, mealName];

export const useRecipes = (mealName) => {
  const recipesQueryKey = getRecipesQueryKey(mealName);
  return useQuery({
    queryKey: recipesQueryKey,
    queryFn: () => getRecipes(mealName),
    enabled: !!mealName,
    gcTime: 30 * MINUTE,
    staleTime: 30 * MINUTE,
  });
};
