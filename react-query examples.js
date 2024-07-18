import {
  QueryClient,
  QueryClientProvider,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import App from "./src/App";

// FULL DOCS => https://tanstack.com/query/latest/docs/framework/react/overview

const MINUTE = 1000 * 60;
const RECIPES_QUERY_KEY = "recipes";

export const getRecipesQueryKey = (mealName) => [RECIPES_QUERY_KEY, mealName];

const { data, isLoading, refetch } = useRecipes("cake");

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

const createRecipeMutation = useCreateRecipe(recipeObj, "cake");
createRecipeMutation.mutate();

export const useCreateRecipe = (recipe, mealName) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => createRecipe(recipe),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: getRecipesQueryKey(mealName) });
      closeModal();
    },
    onError: (e) => {
      toast.error(
        e?.response?.data?.msg || "Something went wrong, please try again."
      );
    },
  });
};

export const ProvidedApp = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: Infinity,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  );
};
