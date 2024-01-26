import { AppState } from "../store";

const getFilteredProducts = (state: AppState, search?: string) => {
  return state.productsReducer.products.filter((p) =>
    p.name.toLowerCase().includes(search?.toLowerCase() || "")
  );
};
export default getFilteredProducts;