import { useSelector } from "react-redux";
import UserOrderDetailsPageComponent from "./components/UserOrderDetailsPageComponent";
import axios from "axios";

const UserOrderDetailsPage = () => {
    const userInfo=useSelector((state)=>{return state.user.userInfo})
    const getUser=async()=>{
        const {data}=await axios.get("/api/users/profile/"+userInfo._id)
        return data
    }
    const getOrder=async(orderId)=>{
        const {data}=await axios.get("/api/orders/user/"+orderId)
        return data
    }
    return (
        <UserOrderDetailsPageComponent userInfo={userInfo} getUser={getUser} getOrder={getOrder}></UserOrderDetailsPageComponent>
    );

};
export default UserOrderDetailsPage;