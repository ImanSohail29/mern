import axios from "axios";
import UsersPageComponent from "./components/UsersPageComponent";
const fetchUsers=async(abctrl)=>{
    const {data}=await axios.get("/api/users",{signal:abctrl.signal})
    return data
}
const deleteUser=async(userId)=>{
    const {data}=await axios.delete(`/api/users/${userId}`)
    return data
}
const AdminUsersPage =() => {
    const abctrl=""
return <UsersPageComponent fetchUsers={()=>fetchUsers(abctrl)} deleteUser={deleteUser}></UsersPageComponent>
};
export default AdminUsersPage;