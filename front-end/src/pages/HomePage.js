import { useSelector } from "react-redux";
import HomePageComponent from "./components/HomePageComponent";
import axios from "axios";
const getBestSellers=async()=>{
    const {data}=await axios.get("/api/products/bestSeller")
    return data
}
const HomePage=()=>{
const {categories}=useSelector((state)=>state.category)
    return(
       <HomePageComponent categories={categories} getBestSellers={getBestSellers}></HomePageComponent>
    )
};
export default HomePage;