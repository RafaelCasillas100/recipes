import React, { useState } from "react";
import { Tour } from "antd";
import { RECIPE_ID, SEARCH_KEY, useQueryParams } from "../hooks/useQueryParams";

export const SEARCHER_CONTAINER_ID = "searcher-container";
export const MEAL_LIST_CONTAINER_ID = "meal-list-container";
export const MEAL_DESCRIPTION_CONTAINER_ID = "meal-description-container";
export const OPTIONS_CONTAINER_ID = "options-container";

const PageTour = () => {
  const [open, setOpen] = useState(true);
  const { setQueryParam } = useQueryParams();

  const steps = [
    {
      title: "Search for a recipe or an ingredient",
      placement: "top",
      target: () => document.getElementById(SEARCHER_CONTAINER_ID),
    },
    {
      title: "Choose your best option",
      placement: "right",
      target: () => document.getElementById(MEAL_LIST_CONTAINER_ID),
    },
    {
      title: "See all the ingredients, change servings and bookmark it",
      placement: "top",
      target: () => document.getElementById(MEAL_DESCRIPTION_CONTAINER_ID),
    },
    {
      title: "You can see your bookmarked recipes",
      placement: "top",
      target: () => document.getElementById(OPTIONS_CONTAINER_ID),
    },
  ];

  const tryOnChange = (stepNumber) => {
    if (stepNumber === 1) setQueryParam(SEARCH_KEY, "carrot");
    if (stepNumber === 2) setQueryParam(RECIPE_ID, "5ed6604591c37cdc054bca65");
  };

  return (
    <Tour
      onChange={tryOnChange}
      open={open}
      onClose={() => setOpen(false)}
      steps={steps}
    />
  );
};
export default PageTour;
