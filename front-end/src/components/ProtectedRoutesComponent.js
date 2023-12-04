import { Navigate, Outlet } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import UserChatComponent from "./UserChatComponent";
import { useEffect, useState } from "react";
import axios from "axios";

const ProtectedRoutesComponent = ({ admin }) => {
    const [isAuth, setIsAuth] = useState()
    useEffect(() => {
        console.log("Inside useEffuect")
        console.log(" admin:  "+admin)
        axios.get("/api/get-token").then(function(res){
            if (res.data.token) {
                console.log("Inside res.data.token :  "+res.data.token)
                setIsAuth(res.data.token)
            }
        })
    }, [isAuth])
    if (isAuth === undefined){
        console.log("Hello:0")
        console.log("isAuth : "+isAuth)
        return <LoginPage></LoginPage>
    } 
    else if (isAuth && admin && isAuth !== "admin") {
        console.log("Hello:1")
        console.log("isAuth"+isAuth)
        return <Navigate to="/login" />
    } else if (isAuth && admin) {
        console.log("Hello:2")
        console.log("isAuth"+isAuth)
        return (<Outlet></Outlet>)
    } else if (isAuth && !admin) {
        console.log("Hello:3")
        console.log("isAuth"+isAuth)
        return (<>
            <UserChatComponent></UserChatComponent>
            <Outlet></Outlet>
        </>)
    }else{
        console.log("Hello:4")
        console.log("isAuth"+isAuth)
        return <Navigate to="/login" />
    }
};
export default ProtectedRoutesComponent;