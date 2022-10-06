import { useRef, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { loginUser } from "../manager/AuthManager"

import "./Login.css"

/*Login is a function that accepts two props to register new users*/
export const Login = ({ setToken, setUserId }) => {
    /*invoking useRef and assigning its return value to several variables
    useRef( ) allows you to persist values between rerenders.It can be used 
    to store a mutable value that does not cause a re-render when updated */
    const username = useRef()
    const password = useRef()

    /*Invoking useNavigate and assigning it to navigate so that we can navigate our application programmatically*/
    const navigate = useNavigate()

    const [isUnsuccessful, setIsUnsuccessful] = useState(false) //setting initial state of isUnsuccessful to false

    //This function handles the login of a user
    const handleLogin = (e) => {
        e.preventDefault() //preventing browser reload/refresh

        //user object to be checked for login
        const user = {
            username: username.current.value,
            password: password.current.value
        }

        //handling validation for login and if it is unsuccessful we change the state to true
        loginUser(user).then(res => {
            if ("valid" in res && res.valid) {

                setToken(res.token)
                setUserId(res.user_id)
                localStorage.setItem('is_staff', res.is_staff)
                navigate("/home")

            }
            else {
                setIsUnsuccessful(true)
            }
        })
    }

    //HTML that user sees on the login page
    return (
        <section>
            <div className="Auth-form-container">
                {/* When the form is submitted, the handleLogin function is triggered */}
                <form className="Auth-form" onSubmit={handleLogin}>
                    <div className="Auth-form-content">


                        <h1 className="Auth-form-title">Summit City</h1>
                        <h2 className="Auth-form-title">Please sign in</h2>

                        <div className="form-group mt-3">
                            <label>Username</label>
                            <div >
                                {/* ref attribute = element to access it directly in the DOM. */}
                                <input className="form-control mt-1" type="text" ref={username} />
                            </div>
                        </div>

                        <div className="form-group mt-3">
                            <label>Password</label>
                            <div className="control">
                                <input className="form-control mt-1" type="password" ref={password} />
                            </div>
                        </div>


                        <div className="d-grid gap-2 mt-3">
                            <button className="btn btn-primary" type="submit" >Submit</button>
                        </div>
                        <div className="control">
                            {/* cancels registration and brings you back to login */}
                            <Link to="/register" className="forgot-password text-right mt-2">New User? Register Here</Link>
                        </div>

                        {/* if the state of isUnsuccessful changes to true we have a pop up saying invalid, otherwise it shows an empty string aka nothing */}
                        {
                            isUnsuccessful ? <p className="help is-danger">Username or password not valid</p> : ''
                        }
                    </div>
                </form>
            </div>
        </section>
    )
}


