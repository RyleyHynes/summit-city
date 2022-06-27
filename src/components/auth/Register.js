import { useState } from "react"
import { useNavigate } from "react-router-dom"
import "./Register.css"

export const Register = (props) => {
    const [customer, setCustomer] = useState({
        email: "",
        name: ""
    })
    let navigate = useNavigate()
    const registerNewUser = () => {
        return fetch("http://localhost:8088/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(customer)
        })
            .then(res => res.json())
            .then(createdUser => {
                if (createdUser.hasOwnProperty("id")) {
                    localStorage.setItem("summit_user", JSON.stringify({
                        id: createdUser.id
                    }))
/*After registering this will bring me back to the login page where I will 
then sign in*/
                    navigate("/login")
                }
            })
    }

    const handleRegister = (e) => {
        e.preventDefault()
        return fetch(`http://localhost:8088/users?email=${customer.email}`)
            .then(res => res.json())
            .then(response => {
                if (response.length > 0) {
                    // Duplicate email. No good.
                    window.alert("Account with that email address already exists")
                }
                else {
                    // Good email, create user.
                    registerNewUser()
                }
            })
    }

    const updateCustomer = (evt) => {
        const copy = { ...customer }
        copy[evt.target.id] = evt.target.value
        setCustomer(copy)
    }

    return (
        <main style={{ textAlign: "center" }}>
            <div> <img
                className="logo"
                src={"/images/Summit.jpeg"}
                alt="logo"
            />
            <form className="form--login" onSubmit={handleRegister}>
                <h1 className="pleaseRegister">Please Register for Summit City</h1>
                <fieldset>
                    <label className="name" htmlFor="name"> Full Name </label>
                    <input onChange={updateCustomer}
                        type="text" id="name" className="form-control"
                        placeholder="Enter your name" required autoFocus />
                </fieldset>
                <fieldset>
                    <label className="email" htmlFor="email"> Email address </label>
                    <input onChange={updateCustomer}
                        type="email" id="email" className="form-control"
                        placeholder="Email address" required />
                </fieldset>
                <fieldset>
                    <button className="registerButton"> Register </button>
                </fieldset>
            </form>
            </div>
        </main>
    )
}
