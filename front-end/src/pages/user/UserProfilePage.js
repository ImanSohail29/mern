import axios from "axios";
import UserProfilePageComponent from "./components/UserProfilePageComponent";
import { useDispatch, useSelector } from "react-redux";
import {login} from "./../../redux/slices/userSlice"
const updateUserApiRequest=async(name,lastName,phoneNumber,address,country,zipCode,city,state,password)=>{
  const {data}=await axios.put(
      '/api/users/profile',{name,lastName,phoneNumber,address,country,zipCode,city,state,password},
  )
  return data
 }
 const fetchUser=async(userId)=>{ 
  const {data}=await axios.get("/api/users/profile/"+userId)
  console.log(data)
  return data
 }
const UserProfilePage = () => {
  const {userInfo}=useSelector((state)=>{return state.user})
  console.log(userInfo)
  const reduxDispatch=useDispatch()
  
  return (
      <UserProfilePageComponent 
      updateUserApiRequest={updateUserApiRequest} 
      fetchUser={fetchUser}
      userInfoFromRedux={userInfo}
      reduxDispatch={reduxDispatch}
      login={login}
      localStorage={window.localStorage}
      sessionStorage={window.sessionStorage}

      ></UserProfilePageComponent>
    )

};
export default UserProfilePage;