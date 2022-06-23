import React, { useState } from "react"
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom"
import "./Login.css"

export const Login = () => {
    /*login has an initial state of email which is set to "ryleyhynes@gmail.com"*/
    const [email, setEmail] = useState("ryleyhynes@gmail.com")
    /*invoking useNavigate and assigning it to navigate*/
    const navigate = useNavigate()

    /*function that handles clicking on the login button*/
    const handleLogin = (e) => {
        e.preventDefault()
        /*making a fetch call to JSON server looking at the users collection to find 
        anybody who matches that email*/
        return fetch(`http://localhost:8088/users?email=${email}`)
            .then(res => res.json())
            .then(foundUsers => {
                if (foundUsers.length === 1) {
                    const user = foundUsers[0]
                    /*if it is a valid login and a valid email in localStorage then 
                    I am setting the item of summit_user*/
                    localStorage.setItem("summit_user", JSON.stringify({
                        /*honey_user has two properties ID Staff*/
                        id: user.id
                    }))

                    navigate("/home")
                }
                else {
                    window.alert("Invalid login")
                }
            })
    }

    return (
        <main className="container--login">
            <section>
                <form className="form--login" onSubmit={handleLogin}>
                    <h1>Summit City</h1>
                    <h2>Please sign in</h2>
                    <fieldset>
                        <label htmlFor="inputEmail"> Email address </label>
                        <input type="email"
                            value={email}
                            onChange={evt => setEmail(evt.target.value)}
                            className="form-control"
                            placeholder="Email address"
                            required autoFocus />
                    </fieldset>
                    <fieldset>
                        <button type="submit">
                            Sign in
                        </button>
                    </fieldset>
                </form>
            </section>
            <section className="link--register">
                <Link to="/register">Not a member yet?</Link>
            </section>
        </main>
    )
}


