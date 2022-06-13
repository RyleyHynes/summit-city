import { Link, useNavigate } from "react-router-dom"
import "./NavBar.css"
export const NavBar = () => {
    const navigate = useNavigate()
    return <ul className="navbar">
        <li className="navbar__item active">
            <Link className="navbar__link" to="/hikes">Hikes</Link>
        </li>
        <li className="navbar__item active">
            <Link className="navbar__link" to="/climbs">Climbs</Link>
        </li>
        {
            localStorage.getItem("summit_user")
                ? <li className="navbar__item navbar__logout">
                    <Link className="navbar__link" to="" onClick={() => {
                        localStorage.removeItem("summit_user")
                        navigate("/", { replace: true })
                    }}>Logout</Link>
                </li>
                : ""
        }
    </ul>
    
}