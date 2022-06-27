import { Link, useNavigate } from "react-router-dom"
import { Profile } from "../profile/Profile"
import "./NavBar.css"
export const NavBar = () => {
    const navigate = useNavigate()
    console.log(Profile)
    return (
        <header>
            <nav className="cite">
                <img
                    onClick={() => navigate("/home")}
                    className="logo"
                    src={"/images/Summit.png"}
                    alt="logo"
                />
                <ul className="navbar">
                    {
                        <li className="navbar__item active">
                            <Link className="navbar" to="/profile">Profile</Link>

                        </li>
                    }
                    {
                        <li className="navbar__item active">
                            <Link className="navbar" to="/links">Helpful Links</Link>
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
            </nav>
        </header>
    )
}