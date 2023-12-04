import axios from "axios";
import ProductsPageComponent from "./components/ProductsPageComponent";
const fetchProducts=async(abctrl)=>{
    const {data}=await axios.get("/api/products/admin",{signal:abctrl.signal})
    return data
}
const deleteProducts=async(productId)=>{
    const {data}=await axios.delete(`/api/products/admin/${productId}`)
    return data
}
const AdminProductsPage = () => {
    const abctrl=""
return <ProductsPageComponent fetchProducts={()=>fetchProducts(abctrl)} deleteProducts={deleteProducts}></ProductsPageComponent>
};
export default AdminProductsPage;