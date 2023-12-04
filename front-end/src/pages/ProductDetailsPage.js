import ProductDetailsPageComponent from "./components/ProductDetailsPageComponet";
import { useDispatch } from "react-redux";
import {addToCart} from "../redux/slices/cartSlice"
import axios from "axios";
const getProductDetails=async(id)=>{
const {data}=await axios.get(`/api/products/get-one/${id}`)
console.log("hello data:"+data)
return data
}
const writeReviewApiRequest=async(productId,formInputs)=>{
    const {data}=await axios.post(`/api/users/review/${productId}`,{...formInputs})
    return data
}
const ProductDetailsPage = () => {
    const dispatch=useDispatch()
    return (
        <ProductDetailsPageComponent  addToCartReduxAction={addToCart} reduxDispatch={dispatch} getProductDetails={getProductDetails} writeReviewApiRequest={writeReviewApiRequest}></ProductDetailsPageComponent>
    );

};
export default ProductDetailsPage;