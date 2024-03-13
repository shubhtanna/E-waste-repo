import {createSlice} from '@reduxjs/toolkit'
import { set } from 'mongoose'

const initialState = {
    step : 1,
    product:null,
    editProduct:false,
}

const productSlice = createSlice({
    name:"product",
    initialState,
    reducers:{
        setStep: (state,action) => {
            state.step = action.payload
        },
        setProduct: (state,action) => {
            state.product = action.payload
        },
        setEditproduct: (state,action) => {
            state.editProduct = action.payload
        },
        resetProductState: (state) => {
            state.step = 1
            state.product = null
            state.editProduct = false
        }
    }
})

export const {setEditproduct, setProduct, setStep, resetProductState} = productSlice.actions
export default productSlice.reducer