import { useState } from "react"
import { ApplicationViews } from "./components/views/ApplicationViews"
import { NavBar } from "./components/nav/NavBar"

//function that authenticates the user
export const Groove = () => {
    //setting the initial token state to the summit_token found in local storage
    const [token, setTokenState] = useState(localStorage.getItem('summit_token'))
    //setting the initial userId state to the userId found in local storage
    const [userId, setUserIdState] = useState(localStorage.getItem('user_id'))
    //setting initial staff state to the is_staff property found in local storage
    const [staff, setStaffState] = useState(localStorage.getItem('is_staff'))

    const setToken = (newToken) => {
        localStorage.setItem('summit_token', newToken)
        setTokenState(newToken)
    }

    const setUserId = (userId) => {
        localStorage.setItem('user_id', userId)
        setUserIdState(userId)
    }

    const setStaff = (staff) => {
        localStorage.setItem('is_staff', staff)
        setStaffState(staff)
    }

    return <>
    <NavBar token={token} setToken={setToken} setStaff={setStaff} />
    <ApplicationViews token={token} setToken={setToken} setUserId={setUserId} userId={userId} setStaff={setStaff} />
    </>
}