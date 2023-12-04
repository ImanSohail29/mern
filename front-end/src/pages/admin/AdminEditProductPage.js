import { useSelector } from "react-redux";
import AdminEditProductPageComponent from "./components/AdminEditProductPageComponent";
import axios from "axios";
import { uploadImagesApiRequest, uploadImagesCloudinaryApiRequest } from "./components/utils/utils";
const fetchProduct = async (productId) => {
    const { data } = await axios.get(`/api/products/get-one/${productId}`)
    return data
}
const updateProductApiRequest = async (productId, formInputs) => {
    const { data } = await axios.put(`/api/products/admin/${productId}`, { ...formInputs })
    return data
}
const imageDeleteHandler = async (imagePath, productId) => {
    let encoded = encodeURIComponent(imagePath)
    if (process.env.NODE_ENV === "production") {
        await axios.delete(`/api/products/admin/image/${encoded}/${productId}`)
    } else {
        await axios.delete(`/api/products/admin/image/${encoded}/${productId}?cloudinary=true`)
    }
}

const AdminEditProductPage = () => {
    const { categories } = useSelector((state) => state.category)

    return (
        <AdminEditProductPageComponent
            categories={categories}
            fetchProduct={fetchProduct}
            updateProductApiRequest={updateProductApiRequest}
            imageDeleteHandler={imageDeleteHandler}
            uploadImagesApiRequest={uploadImagesApiRequest}
            uploadImagesCloudinaryApiRequest={uploadImagesCloudinaryApiRequest}>
        </AdminEditProductPageComponent>
    )
};
export default AdminEditProductPage;