import Product from "./Product";

export interface ProductsReducerState {
    products: Product[],
    selectedProduct?: Product,
    loading: boolean,
    product: Product | null,
    error?: string | null,
}
export default ProductsReducerState;