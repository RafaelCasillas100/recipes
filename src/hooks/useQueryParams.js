import { useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const SEARCH_KEY = "search";
export const RECIPE_ID = "recipeId";

export const useQueryParams = () => {
  const { search } = useLocation();
  const navigate = useNavigate();

  const searchParams = useMemo(() => new URLSearchParams(search), [search]);

  const getSearchParam = (key) => {
    return searchParams.get(key);
  };

  const setQueryParam = (key, value) => {
    searchParams.set(key, value);
    navigate({ search: searchParams.toString() });
  };

  return {
    getSearchParam,
    setQueryParam,
  };
};
