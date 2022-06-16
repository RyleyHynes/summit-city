import { useEffect, useState } from "react"
import { useNavigate } from "react-router"
import { Link } from "react-router-dom"
import "./Climb.css"
// import { getClimbs } from "../../../manager/APIManager"


export const ClimbList = ({ searchTermState }) => {
    //declaring new variable and function using the useState function. It created an empty array called climbs and a function called setClimbs
    const [climbs, setClimbs] = useState([])
    //we do not want to modify the array of climbs from the api, but we still want to display a list of climbs. creating another variable of filteredClimbs
    const [filteredClimbs, setFilteredClimbs] = useState([])
    //added the useNavigate hook for the user Added hike button 
    const navigate = useNavigate()



    //gettting summitUserObject from local storage (the summit user object is from the login page of who logged in and is the key shown on the local storage in application under devtools) localSummitUser returns as a string because on the login page it is converted to a string with JSON.stringify is used.
    const localSummitUser = localStorage.getItem("summit_user")
    //converting it from a string to an object 
    const summitUserObject = JSON.parse(localSummitUser)



    //declared function to run the fetch and now we can invoke the function whenever we want. have to pass the function to the props

    useEffect(
        () => {
            fetch(`http://localhost:8088/climbs`)
                .then(response => response.json())
                .then((climbsArray) => {
                    setClimbs(climbsArray)//passes what you want the new value to be
                })
        },
        [] //when this array is empty, you are observing initial component state

    )

    useEffect(
        () => {
            fetch(`http://localhost:8088/climbs`)
                .then(response => response.json())
                .then((climbsArray) => {
                    setFilteredClimbs(climbsArray)//passes what you want the new value to be
                })
        },
        [climbs]
    )


    useEffect(
        () => {
            const searchedClimbs = climbs.filter(climb => {
                return climb.name.toLowerCase().includes(searchTermState.toLowerCase()) ||
                    climb.skillLevel.toLowerCase().startsWith(searchTermState.toLowerCase()) ||
                    climb.distance.toLowerCase().includes(searchTermState.toLowerCase()) ||
                    climb.location.toLowerCase().includes(searchTermState.toLowerCase())
            })
            setFilteredClimbs(searchedClimbs)
        },
        [searchTermState]
    )




    return <>
        <button onClick={() => navigate("/climbs")}>View All Climbs</button>
        <button onClick={() => navigate("/climb/create")}>Add Climb</button>

        <h2>List of Climbs</h2>
        <article className="climbs">
            <ul>
                {
                    filteredClimbs.map
                        ((climb) => {
                            return <>
                                <section className="hike_list" key={`session--${climb.id}`}>
                                    <div className="name">Name: {climb.name}</div>
                                    <div className="location">Location: {climb.location}</div>
                                    <div className="skillLevel">Climbing Type: {climb.skillLevel}</div>
                                    <div className="distance">CLimbing Grade: {climb.distance}</div>
                                    <div className="estLength">description: {climb.estLength}</div>
                                    <div className="description">Completion Status: {climb.completionStatus}</div>
                                </section>
                                <footer>
                                    <Link to={`/climbs/${climb.id}/edit`}><button className="edit_btn">EDIT Climb</button></Link>
                                </footer>
                            </>
                        })

                }

            </ul>
        </article>

    </>
}