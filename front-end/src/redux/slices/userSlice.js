import { createSlice} from '@reduxjs/toolkit'
import axios from 'axios'
const userInfoInLocalStorage = localStorage.getItem("userInfo")
? JSON.parse(localStorage.getItem("userInfo"))
: sessionStorage.getItem("userInfo")
? JSON.parse(sessionStorage.getItem("userInfo"))
: {}
const userSlice=createSlice({
    name:'user',
    initialState:{userInfo:userInfoInLocalStorage},
    reducers:{
        login:(state,action)=>{
            state.userInfo=action.payload
        },
        logout:(state)=>{
            document.location.href="/login"
            axios.get('/api/logout')
            localStorage.removeItem("userInfo")
            sessionStorage.removeItem("userInfo")
            state.userInfo={}
        }
    },
})
export const { login,logout } = userSlice.actions
export default userSlice
