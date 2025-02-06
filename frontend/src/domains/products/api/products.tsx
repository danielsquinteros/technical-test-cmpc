import { createApi } from '@reduxjs/toolkit/query/react';
import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseFetchQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:3000/api/',
  });

export const productsApi = createApi({
    reducerPath: 'productsApi',
    baseQuery: baseFetchQuery,
    endpoints: (builder) => ({
        findAllProducts: builder.query({
            query: () => ({
                url: '/products'
            }),
        }),
        createProduct: builder.mutation({
            query: (body) => ({
                url: '/products',
                method: 'POST',
                body,
              }),
        }),
        updateProduct: builder.mutation({
            query: (body) => {
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                const { id, created_at, updated_at, ...rest} = body;
                return {
                    url: `/products/${id}`,
                    method: 'PATCH',
                    body: rest,
                }
            },
        }),
        removeProduct: builder.mutation({
            query: (body) => {
               return {
                   url: `/products/${body.id}`,
                   method: 'DELETE',
               } 
            },
        }),
    })
})

export const { 
    useCreateProductMutation,
    useUpdateProductMutation,
    useFindAllProductsQuery,
    useRemoveProductMutation,
} = productsApi