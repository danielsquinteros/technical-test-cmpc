import { createSlice } from "@reduxjs/toolkit";
import { metricsApi } from "../../domains/metrics/api/metrics";
import { PieTrace, Trace } from "@/domains/metrics/types";

const initState = {
    products : {
        total: null,
        profitMargin: null,
        criticalStock: null,
        groupTag: null,
    }
}

const slice = createSlice({
    name: 'metrics',
    initialState: initState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addMatcher(
            metricsApi.endpoints.productsTotalMetric.matchFulfilled,
            (state, {payload}) => {
                const { total_products } = payload;
                state.products.total = total_products
            }
        )
        builder.addMatcher(
            metricsApi.endpoints.productsProfitMarginMetric.matchFulfilled,
            (state, {payload}) => {
                state.products.profitMargin = payload
            }
        )
        builder.addMatcher(
            metricsApi.endpoints.productsCriticalStockMetric.matchFulfilled,
            (state, {payload}) => {
                state.products.criticalStock = payload
            }
        )
        builder.addMatcher(
            metricsApi.endpoints.productsByGroupTagMetric.matchFulfilled,
            (state, {payload}) => {
                state.products.groupTag = payload
            }
        )
    }
})

export default slice.reducer;

export const selectProductMetric = (state: { metrics: { products: { total: number, criticalStock: Trace[], groupTag: PieTrace, profitMargin: Trace[] } }; }) => state.metrics.products;