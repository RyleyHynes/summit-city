import { Link, useNavigate } from "react-router-dom"
import { useEffect, useRef, useState } from "react";
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';

//function for the nav bar which accepts 3 props
export const NavBar = ({ token, setToken, setStaff }) => {
    /*Invoking useNavigate and assigning it to navigate so that we can navigate our application programmatically*/
    const navigate = useNavigate()

    // const [selectionBorder, setSelection] = useState({
    //     selection:"home",
    //     style: "border-2 border-blue"
    // })

    // const handleChange = (selection) => {
    //     setSelection({
    //         ...selectionBorder, selection
    //     })
    // }
    const [staff, setStaffState] = useState()
    console.log(token)
    //getting the is_staff property out of local storage for the current user and setting it to the staff state
    useEffect(() => {
        setStaffState(localStorage.getItem("is_staff"))
    }, [setStaff])

    //HTML for the navbar 
    return (
        <Nav fill variant="pills" defaultActiveKey={window.location.pathname}>
            {
                token
                    ? <>
                        <Nav.Item>
                            <img
                                onClick={() => navigate("/home")}
                                className="logo"
                                src={"/images/Summit.png"}
                                alt="logo"
                            />
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link href="/home"><b>Home</b></Nav.Link>
                        </Nav.Item>

                        <Nav.Item>
                            <Nav.Link href="/activities"><b>activities</b></Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link href="/myHikes"><b>My Hikes</b></Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link href="/myClimbs"><b>My Climbs</b></Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link href="/links">Helpful Links</Nav.Link>
                        </Nav.Item>

                        {/* if the user is staff they will also have the below nav bar options */}
                        {staff === "true"
                            ?
                            <>
                                <Nav.Item>
                                    <Nav.Link href="/artistList" className="navbar-item"><b>Artist List</b></Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link href="/profiles" className="navbar-item"><b>User Profiles</b></Nav.Link>
                                </Nav.Item>
                            </>
                            : <></>
                        }
                        <Nav.Item>
                            <Nav.Link href={`/profiles/${localStorage.getItem("user_id")}`} className="navbar-item"><b>Profile</b></Nav.Link>
                        </Nav.Item>
                    </>
                    :
                    ""
            }

            {/*initial login / register page navbar*/}
            {
                token
                    ? <>
                        <button onClick={() => {
                            setToken('')
                            setStaff('')
                            navigate('/login')
                        }}>Logout</button>
                    </>
                    :
                    <>
                        <Nav.Item>
                            <Nav.Link href="/register"><b>Register</b></Nav.Link>
                        </Nav.Item>

                        <Nav.Item>
                            <Nav.Link href="/login"><b>Login</b></Nav.Link>
                        </Nav.Item>
                    </>
            }

        </Nav>
    )
}