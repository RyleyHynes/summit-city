import { Link, useNavigate } from "react-router-dom"
import "./NavBar.css"

/*function to create NavBar which will be invoked in application views*/
export const NavBar = () => {
    /*invoking useNavigate and assigning its return value to navigate*/
    const navigate = useNavigate()
    return (
        <header>
            <nav className="cite">
                <img
                    /*custom onClick to navigate you back to the home page*/
                    onClick={() => navigate("/home")}
                    className="logo"
                    src={"/images/Summit.png"}
                    alt="logo"
                />
                <ul className="navbar">
                    {
                        <li className="navbar__item active">
                            {/*creates hyperLink for home*/}
                            <Link className="navbar" to="/home">Home</Link>
                        </li>
                    }
                    {
                        <li className="navbar__item active">
                            {/*creates hyperLink for profile*/}
                            <Link className="navbar" to="/profile">Profile</Link>

                        </li>
                    }
                    {
                        <li className="navbar__item active">
                            {/*creates hyperLink for Helpful Links*/}
                            <Link className="navbar" to="/links">Helpful Links</Link>
                        </li>
                    }
                    {

                        localStorage.getItem("summit_user")
                            ? <li className="navbar__item navbar__logout">
                                {/*creates hyperLink with custom onClick for Logout*/}
                                <Link className="navbar" to="" onClick={() => {
                                    /*removing summit_user from local storage*/
                                    localStorage.removeItem("summit_user")
                                    /*redirecting the user to base route of application*/
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