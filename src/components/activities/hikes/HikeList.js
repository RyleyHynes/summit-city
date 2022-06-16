import { useEffect, useState } from "react"
import { useNavigate } from "react-router"
import { Link } from "react-router-dom"
import "./Hike.css"
// import { getHikes } from "../../../manager/APIManager"


export const HikeList = ({ searchTermState }) => {
    //declaring new variable and function using the useState function. It created an empty array called hikes and a function called setHikes
    const [hikes, setHikes] = useState([])
    //we do not want to modify the array of hikes from the api, but we still want to display a list of hikes. creating another variable of filteredHikes
    const [filteredHikes, setFilteredHikes] = useState([])
    //added the useNavigate hook for the user Added hike button 
    const navigate = useNavigate()



    //gettting summitUserObject from local storage (the summit user object is from the login page of who logged in and is the key shown on the local storage in application under devtools) localSummitUser returns as a string because on the login page it is converted to a string with JSON.stringify is used.
    const localSummitUser = localStorage.getItem("summit_user")
    //converting it from a string to an object 
    const summitUserObject = JSON.parse(localSummitUser)



    //declared function to run the fetch and now we can invoke the function whenever we want. have to pass the function to the props

    useEffect(
        () => {
            fetch(`http://localhost:8088/hikes`)
                .then(response => response.json())
                .then((hikesArray) => {
                    setHikes(hikesArray)//passes what you want the new value to be
                })
        },
        [] //when this array is empty, you are observing initial component state

    )

    useEffect(
        () => {
            fetch(`http://localhost:8088/hikes`)
                .then(response => response.json())
                .then((hikesArray) => {
                    setFilteredHikes(hikesArray)//passes what you want the new value to be
                })
        },
        [hikes]
    )


    useEffect(
        () => {
            const searchedHikes = hikes.filter(hike => {
                return hike.name.toLowerCase().includes(searchTermState.toLowerCase()) ||
                    hike.skillLevel.toLowerCase().startsWith(searchTermState.toLowerCase()) ||
                    hike.distance.toLowerCase().includes(searchTermState.toLowerCase()) ||
                    hike.location.toLowerCase().includes(searchTermState.toLowerCase())
            })
            setFilteredHikes(searchedHikes)
        },
        [searchTermState]
    )




    return <>
        <button onClick={() => navigate("/hikes")}>View All Hikes</button>
        <button onClick={() => navigate("/hike/create")}>Add Hike</button>

        <h2>List of Hikes</h2>
        <article className="hikes">
            <ul>
                {
                    filteredHikes.map
                        ((hike) => {
                            return <>
                                <section className="hike_list" key={`session--${hike.id}`}>
                                    <div className="name">Name: {hike.name}</div>
                                    <div className="location">Location: {hike.location}</div>
                                    <div className="skillLevel">Skill Level: {hike.skillLevel}</div>
                                    <div className="distance">Distance: {hike.distance}</div>
                                    <div className="estLength">Estimated Completion Time: {hike.estLength}</div>
                                    <div className="description">description: {hike.description}</div>
                                </section>
                                <footer>
                                    <Link to={`/hikes/${hike.id}/edit`}><button className="edit_btn">EDIT Hike</button></Link>
                                </footer>
                            </>
                        })

                }

            </ul>
        </article>

    </>
}