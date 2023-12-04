import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
export const addToCart = createAsyncThunk('addToCart', async (productData) => {
    const { id, quantity, sameProduct } = productData
    const { data } = await axios.get(`/api/products/get-one/${id}`)
    const productAdded = {
        productId: data._id,
        name: data.name,
        price: data.price,
        image: data.images[0] ?? null,
        count: data.count,
        quantity: quantity,
    }
    return { productAdded, sameProduct }
})
export const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cartItems: [],
        itemsCount: 0,
        cartSubtotal: 0,
    },
    reducers: {
        removeFromCart: (state, action) => {
            console.log("state.cartItems" + state.cartItems)
            console.log("state.itemsCount" + state.itemsCount)
            console.log("state.cartSubtotal" + state.cartSubtotal)
            console.log("action.payload" + action.payload)
            state.cartItems = state.cartItems.filter((item) => item.productId !== action.payload.productId)
            state.itemsCount = state.itemsCount - action.payload.quantity
            state.cartSubtotal = state.cartSubtotal - (action.payload.price * action.payload.quantity)
        }
    },
    extraReducers: (builder) => {
        builder.addCase(addToCart.fulfilled, (state, action) => {
            const { productAdded, sameProduct } = action.payload

            const productAlreadyExistsInState = state.cartItems.find((product) => {
                return (product.productId === productAdded.productId)
            })

            if (productAlreadyExistsInState) {
                state.itemsCount = 0
                state.cartSubtotal = 0
                state.cartItems.map((item) => {
                    if (item.productId === productAlreadyExistsInState.productId && sameProduct) {
                        item.quantity = Number(productAdded.quantity)
                    }
                    else if (item.productId === productAlreadyExistsInState.productId) {
                        item.quantity += Number(productAdded.quantity)
                    }
                    state.itemsCount += Number(item.quantity)
                    state.cartSubtotal += (Number(item.quantity) * Number(item.price))
                })
            }
            else {
                state.itemsCount += Number(productAdded.quantity)
                state.cartSubtotal += Number(productAdded.quantity) * Number(productAdded.price)
                state.cartItems = [...state.cartItems, productAdded]

            }
        })
        builder.addCase(addToCart)

    },
})
export const { removeFromCart } = cartSlice.actions
export default cartSlice.reducer


