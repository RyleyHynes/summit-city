import { Avatar } from "@mui/material"
import { Link, useNavigate } from "react-router-dom"
import { Profile } from "../profile/Profile"
import "./NavBar.css"
export const NavBar = () => {
    const navigate = useNavigate()
    console.log(Profile)
    return <ul className="navbar">
        {
            <li className="navbar__item active">
                <Link className="navbar" to="/home">Home</Link>
            </li>
        }
        {
            <li className="navbar__item active">
                    {/* <Avatar alt="Ryley Hynes2" src={summitUserObject.url} sx={{ width: 50, height: 50 }} className="navbar__profile" /> */}
                <Link className="navbar" to="/profile">Profile</Link>

            </li>
        }
        {

            localStorage.getItem("summit_user")
                ? <li className="navbar__item navbar__logout">
                    <Link className="navbar" to="" onClick={() => {
                        localStorage.removeItem("summit_user")
                        navigate("/", { replace: true })
                    }}>Logout</Link>
                </li>
                : ""
        }
    </ul>

}