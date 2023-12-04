import axios from "axios";
import {useDispatch} from 'react-redux'
import LoginPageComponent from "./components/LoginPageComponent";
import {login} from "./../redux/slices/userSlice"

const loginUserApiRequest=async(email,password,doNotLogout)=>{
   const {data}=await axios.post("api/users/login",{email,password,doNotLogout})
   if(data.userLoggedIn.doNotLogout){
      localStorage.setItem("userInfo",JSON.stringify(data.userLoggedIn))
   }
   return data
}
const LoginPage = () => {
   const reduxDispatch=useDispatch()
   return <LoginPageComponent loginUserApiRequest={loginUserApiRequest} reduxDispatch={reduxDispatch} loginAction={login}/>
};
export default LoginPage;