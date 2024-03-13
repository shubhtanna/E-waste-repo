import { useReducer } from 'react';
import authReducer from '../Slices/authSlice'
import {combineReducers} from '@reduxjs/toolkit';
import productReducer from '../Slices/productSlice'
import userReducer from '../Slices/userSlice'

const rootReducer = combineReducers({
    auth : authReducer,
    user : userReducer,
    product : productReducer
});

export default rootReducer