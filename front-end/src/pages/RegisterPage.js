import axios from "axios";
import {login} from "./../redux/slices/userSlice"
import RegisterPageComponent from "./components/RegisterPageComponent";
import { useDispatch } from "react-redux";
const registerUserApiRequest=async(name,lastName,email,password)=>{
    const {data}=await axios.post("api/users/register",{name,lastName,email,password})
    if(data.success==="user created!"){
        return window.location.href="/user"
    }
    return data
}
const RegisterPage = () => {
    const reduxDispatch=useDispatch()
    return(
        <RegisterPageComponent registerUserApiRequest={registerUserApiRequest} reduxDispatch={reduxDispatch} loginAction={login}></RegisterPageComponent>
    )
};
export default RegisterPage;