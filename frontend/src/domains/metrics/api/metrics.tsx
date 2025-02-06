import { createApi } from '@reduxjs/toolkit/query/react';
import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseFetchQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:3000/api/',
  });

export const metricsApi = createApi({
    reducerPath: 'metricsApi',
    baseQuery: baseFetchQuery,
    endpoints: (builder) => ({
        productsTotalMetric: builder.mutation({
            query: (body?) => ({
                url: '/metrics/products/total',
                method: 'POST',
                body,
              }),          
        }),
        productsProfitMarginMetric: builder.mutation({
            query: (body?) => ({
                url: '/metrics/products/profit-margin',
                method: 'POST',
                body,
              }),   
        }),
        productsCriticalStockMetric: builder.mutation({
            query: (body?) => ({
                url: '/metrics/products/critical-stock',
                method: 'POST',
                body,
              }),   
        }),
        productsByGroupTagMetric: builder.mutation({
            query: (body?) => ({
                url: '/metrics/products/group-tag',
                method: 'POST',
                body,
              }),   
        })
    })
})

export const { 
    useProductsTotalMetricMutation,
    useProductsProfitMarginMetricMutation,
    useProductsCriticalStockMetricMutation,
    useProductsByGroupTagMetricMutation,
} = metricsApi