import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
export const getCategories = createAsyncThunk('getCategories', async () => {
    const { data } = await axios.get('/api/categories')
    return data
})

const categorySlice = createSlice({
    name: 'category',
    initialState: {
        categories: [],
    },
    reducers: {
        insertCategory: (state, action) => {
            state.categories = []
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getCategories.fulfilled, (state, action) => {
            state.categories = action.payload
        })
    },
})
export const { insertCategory } = categorySlice.actions
export default categorySlice.reducer