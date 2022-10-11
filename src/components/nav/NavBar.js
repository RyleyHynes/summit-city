import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react";
import Nav from 'react-bootstrap/Nav'


//function for the nav bar which accepts 3 props
export const NavBar = ({ token, setToken, setStaff }) => {
    /*Invoking useNavigate and assigning it to navigate so that we can navigate our application programmatically*/
    const navigate = useNavigate()
    const [staff, setStaffState] = useState()
    
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
                            <Nav.Link href="/home"><b>Home</b></Nav.Link>
                        </Nav.Item>

                        {/* <Nav.Item>
                            <Nav.Link href="/fridaySchedule"><b>Groove Schedule</b></Nav.Link>
                        </Nav.Item>

                        <Nav.Item>
                            <Nav.Link href="/myFridaySchedule"><b>My Schedule</b></Nav.Link>
                        </Nav.Item> */}

                        {/* if the user is staff they will also have the below nav bar options */}
                        {staff === "true"
                            ?
                            <>
                                <Nav.Item>
                                    <Nav.Link href="/skillLevelList" className="navbar-item"><b>Skill Levels</b></Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link href="/climbingGradeList" className="navbar-item"><b>Climbing Grades</b></Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link href="/climbingTypeList" className="navbar-item"><b>Climbing Types</b></Nav.Link>
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
                                <button  onClick={() => {
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
