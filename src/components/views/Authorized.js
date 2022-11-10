import {Navigate, Outlet} from "react-router-dom"

//function to check if the summit user is authorized and if not it routes them to the login
export const Authorized = () => {
    if(localStorage.getItem("summit_token")) {
        return <Outlet />
    }
    return <Navigate to='/login' replace />
}