import axios from "axios";
import AdminEditUserPageComponent from "./components/AdminEditUserPageComponent";
const updateUserApiRequest=async(id,name,lastName,email,isAdmin)=>{
    const {data}=await axios.put(`/api/users/${id}`,{name,lastName,email,isAdmin})
    return data
}
const fetchUser=async(id)=>{
    const {data}=await axios.get(`/api/users/${id}`)
    return data
}
const AdminEditUserPage = () => {
    return (
        <AdminEditUserPageComponent updateUserApiRequest={updateUserApiRequest} fetchUser={fetchUser} ></AdminEditUserPageComponent>
    )
};
export default AdminEditUserPage;