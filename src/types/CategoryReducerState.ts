import Category from './Category';

export interface CategoryReducerState {
    categories: Category[],
    category : Category | null,
    error?: string,
    loading: boolean
    selectedCategory?: Category
}

export default CategoryReducerState