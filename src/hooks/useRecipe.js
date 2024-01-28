import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { RECIPE_ID, useQueryParams } from "./useQueryParams";

const getRecipe = async (recipeId) => {
  const recipeData = await axios.get(
    `https://forkify-api.herokuapp.com/api/v2/recipes/${recipeId}`,
    { params: { key: "4921d73e-5fc2-47b6-90a8-dfe1ae39f7cc" } }
  );
  return recipeData.data.data.recipe;
};

const MINUTE = 1000 * 60;
const RECIPE_QUERY_KEY = "recipe";

export const getRecipeQueryKey = (recipeId) => [RECIPE_QUERY_KEY, recipeId];

export const useRecipe = () => {
  const { getSearchParam } = useQueryParams();
  const recipeId = getSearchParam(RECIPE_ID);

  const recipeQueryKey = getRecipeQueryKey(recipeId);
  return useQuery({
    queryKey: recipeQueryKey,
    queryFn: () => getRecipe(recipeId),
    enabled: !!recipeId,
    gcTime: 30 * MINUTE,
    staleTime: 30 * MINUTE,
  });
};
