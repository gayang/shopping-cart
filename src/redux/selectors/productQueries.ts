import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import Product from '../../types/Product'
import PaginationQuery from '../../types/Pagination'
const URL = "https://api.escuelajs.co/api/v1/products";

const productQueries = createApi({
    //base query for all the api calls inside this createApi
    reducerPath: "productApi",
    baseQuery: fetchBaseQuery({ baseUrl: URL }),
    tagTypes: ['Products'],
    endpoints: builder => (
        {
            /** a hook is created from dispatch, async thunk action -> return data, error, loading*/
            fetchAllProducts: builder.query<Product[], PaginationQuery>({
                query: ({ limit, offset }) => `?limit=${limit}&offset=${offset}`,
                providesTags: ['Products'] //this works, but might not be the best
            }), // when we call fetchAllProducts, we send get request to `baseUrl?limit=${limit}&offset=${offset}`
            deleteProduct: builder.mutation<boolean, string>({
                query: (productId) => ({ url: `${productId}`, method: 'DELETE' }),
                invalidatesTags: ['Products']
            })
        }
    )
})

export const { useFetchAllProductsQuery, useDeleteProductMutation } = productQueries
export default productQueries