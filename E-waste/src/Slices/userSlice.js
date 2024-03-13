import {createSlice} from '@reduxjs/toolkit'
import { LoaderIcon } from 'react-hot-toast'

const initialState =  {
    user:localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null,
    loading:false,
}

const userSlice = createSlice({
    name: "User",
    initialState : initialState,
    reducers: {
        setUser(state, value){
            state.user = value.payload;
        },
        setLoading(state, value){
            state.loading = value.payload
        }
    },
});

export const {setUser, setLoading} = userSlice.actions;
export default userSlice.reducer