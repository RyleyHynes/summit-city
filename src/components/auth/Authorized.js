import { Navigate, useLocation } from "react-router-dom"


export const Authorized = ({ user }) => {
    const location = useLocation()

    if (localStorage.getItem("summit_user")) {
        return user
    }
    else {
        return <Navigate
            to={`/login/${location.search}`}
            replace
            state={{ location }} />
    }
}

