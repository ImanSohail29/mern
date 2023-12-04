import axios from "axios";
import AdminCreateProductPageComponent from "./components/AdminCreateProductPageComponent";
import { uploadImagesApiRequest, uploadImagesCloudinaryApiRequest } from "./components/utils/utils";
import { useDispatch, useSelector } from "react-redux";
import { insertCategory } from "../../redux/slices/categorySlice"

const createProductApiRequest = async (formInputs) => {
    const { data } = await axios.post("/api/products/admin", { ...formInputs })
    return data
}
const createNewCategory = async (category) => {
    console.log("new Category:" + category)
    const { data } = await axios.post("/api/categories", { category })
    return data
}

const AdminCreateProductPage = () => {
    const reduxDispatch = useDispatch()
    const { categories } = useSelector((state) => state.category)

    return (
        <AdminCreateProductPageComponent
            categories={categories}
            createProductApiRequest={createProductApiRequest}
            uploadImagesApiRequest={uploadImagesApiRequest}
            uploadImagesCloudinaryApiRequest={uploadImagesCloudinaryApiRequest}
            createNewCategory={createNewCategory}
            reduxDispatch={reduxDispatch}
            insertCategory={insertCategory}
        >
        </AdminCreateProductPageComponent>
    )
}
export default AdminCreateProductPage;