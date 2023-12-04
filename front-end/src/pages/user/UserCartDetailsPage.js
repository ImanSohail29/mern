import { useDispatch, useSelector } from "react-redux";
import UserCartDetailsPageComponent from "./components/UserCartDetailsPageComponent";
import { addToCart,removeFromCart } from "../../redux/slices/cartSlice";
import axios from "axios";
const UserCartDetailsPage=()=>{
    const cartItems=useSelector((state)=>{return state.cart.cartItems})
    const itemsCount=useSelector((state)=>{return state.cart.itemsCount})
    const cartSubtotal=useSelector((state)=>{return state.cart.cartSubtotal})
    const userInfo=useSelector((state)=>{return state.user.userInfo})
    const reduxDispatch=useDispatch()
const getUser=async()=>{
    const {data}=await axios.get("/api/users/profile/"+userInfo._id)
    return data
}
const createOrder=async(orderData)=>{
    const {data}=await axios.post("/api/orders",{...orderData})
    return data
}
    return(
      <UserCartDetailsPageComponent cartItems={cartItems} itemsCount={itemsCount} cartSubtotal={cartSubtotal} reduxDispatch={reduxDispatch} addToCart={addToCart} removeFromCart={removeFromCart} userInfo={userInfo} getUser={getUser} createOrder={createOrder}></UserCartDetailsPageComponent>
    );

};
export default UserCartDetailsPage;