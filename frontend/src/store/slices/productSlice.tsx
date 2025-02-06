import { createSlice } from "@reduxjs/toolkit";
import { productsApi } from "../../domains/products/api/products";

const initState = {
    total: [],
}

const slice = createSlice({
    name: 'products',
    initialState: initState,
    reducers: {
    },
    extraReducers: (builder) => {
      builder.addMatcher(
            productsApi.endpoints.findAllProducts.matchFulfilled,
            (state, {payload}) => {
                state.total = payload;
            }
        )
    }
})

export default slice.reducer;

export const selectProducts = (state: { products :  { total: [] } }) => state.products;