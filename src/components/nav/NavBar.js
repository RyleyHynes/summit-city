import { Avatar } from "@mui/material"
import { Link, useNavigate } from "react-router-dom"
import "./NavBar.css"
export const NavBar = () => {
    const navigate = useNavigate()
    return <ul className="navbar">
        {
            <li className="navbar__item active">
                <Link className="navbar__home" to="/home">Home</Link>
            </li>
        }
        {
            <li className="navbar__item active">
                    <Avatar alt="Ryley Hynes" src="/images/summit.jpg" sx={{ width: 50, height: 50 }} className="navbar__profile" />
                <Link className="navbar__profile" to="/profile">Profile</Link>

            </li>
        }
        {

            localStorage.getItem("summit_user")
                ? <li className="navbar__item navbar__logout">
                    <Link className="navbar__logout" to="" onClick={() => {
                        localStorage.removeItem("summit_user")
                        navigate("/", { replace: true })
                    }}>Logout</Link>
                </li>
                : ""
        }
    </ul>

}