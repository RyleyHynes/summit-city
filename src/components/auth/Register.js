import { useRef } from "react"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { registerUser } from "../managers/AuthManager"

/*Register is a function that accepts two props to register new users*/
export const Register = ({ setToken, setUserId }) => {
    /*invoking useRef and assigning its return value to several variables
    useRef( ) allows you to persist values between rerenders.It can be used 
    to store a mutable value that does not cause a re-render when updated */
    const firstName = useRef()
    const lastName = useRef()
    const email = useRef()
    const username = useRef()
    const bio = useRef()
    const password = useRef()
    const verifyPassword = useRef()
    const passwordDialog = useRef()
    /*Invoking useNavigate and assigning it to navigate so that we can navigate our application programmatically*/
    const navigate = useNavigate()

    //This function handles the registration of a new user
    const handleRegister = (e) => {
        e.preventDefault() //preventing browser reload/refresh

        //creating new user object if the password verification matches
        if (password.current.value === verifyPassword.current.value) {
            const newUser = {
                username: username.current.value,
                first_name: firstName.current.value,
                last_name: lastName.current.value,
                email: email.current.value,
                bio: bio.current.value,
                password: password.current.value
            }

            //validating the user and setting a token and userId
            registerUser(newUser)
                .then(res => {
                    if ("valid" in res && res.valid) {
                        setToken(res.token)
                        localStorage.setItem("is_staff", res.is_staff)
                        setUserId(res.user_id)
                        navigate("/home")
                    }
                })
        } else {
            passwordDialog.current.showModal() //if validation fails, this pop up triggers
        }
    }

    //HTML that user sees on the registration page
    return (
        <section className="columns is-centered">
            <div className="Auth-form-container">
                {/* When the form is submitted, the handleRegister function is triggered */}
                <form className="Auth-form" onSubmit={handleRegister}>
                    <div className="Auth-form-content">
                        <h1 className="Auth-form-title">Summit City</h1>
                        <p className="Auth-form-title">Create an account</p>

                        <div className="form-group mt-3">
                            <label>First Name</label>
                            <div className="control">
                                {/* ref attribute = element to access it directly in the DOM. */}
                                <input className="form-control mt-1" type="text" placeholder="Enter First Name" ref={firstName} />
                            </div>
                        </div>

                        <div className="form-group mt-3">
                            <label>Last Name</label>
                            <div className="control">
                                <input className="form-control mt-1" type="text" placeholder="Enter Last Name" ref={lastName} />
                            </div>
                        </div>

                        <div className="form-group mt-3">
                            <label>Username</label>
                            <div className="control">
                                <input className="form-control mt-1" type="text" placeholder="Enter Username" ref={username} />
                            </div>
                        </div>

                        <div className="form-group mt-3">
                            <label>Email</label>
                            <div className="control">
                                <input className="form-control mt-1" type="email" placeholder="Enter Email" ref={email} />
                            </div>
                        </div>

                        <div className="form-group mt-3">
                            <label>Password</label>
                            <div className="field-body">
                                <div className="form-group mt-3">
                                    <p className="control is-expanded">
                                        <input className="form-control mt-1" type="password" placeholder="Enter Password" ref={password} />
                                    </p>
                                </div>

                                <div className="form-group mt-3">
                                <label>Verify Password</label>
                                    <p className="control is-expanded">
                                        <input className="form-control mt-1" type="password" placeholder="Re-Enter Password" ref={verifyPassword} />
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="form-group mt-3">
                            <label>Bio</label>
                            <div className="control">
                                <textarea className="form-control mt-1" placeholder="Tell us about yourself..." ref={bio}></textarea>
                            </div>
                        </div>

                        <div className="field is-grouped">
                            <div className="control">
                                <button className="btn btn-primary" type="submit">Submit</button>
                            </div>
                            <div className="control">
                                {/* cancels registration and brings you back to login */}
                                <Link to="/login" className="text-center mt-2">Already a member? Login</Link>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </section>
    )
}