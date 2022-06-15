import { useEffect, useState } from "react"
import { useNavigate } from "react-router"
import { getHikes } from "../../../manager/APIManager"


export const HikeList = ({ searchTermState }) => {
    //declaring new variable and function using the useState function. It created an empty array called hikes and a function called setHikes
    const [hikes, setHikes] = useState([])
    //we do not want to modify the array of hikes from the api, but we still want to display a list of hikes. creating another variable of filteredHikes
    const [filteredHikes, setFilteredHikes] = useState([])



    //gettting summitUserObject from local storage (the summit user object is from the login page of who logged in and is the key shown on the local storage in application under devtools) localSummitUser returns as a string because on the login page it is converted to a string with JSON.stringify is used.
    const localSummitUser = localStorage.getItem("summit_user")
    //converting it from a string to an object 
    const summitUserObject = JSON.parse(localSummitUser)


    //added the useNavigate hook for the user Added hike button 
    const navigate = useNavigate()

    //declared function to run the fetch and now we can invoke the function whenever we want. have to pass the function to the props

    useEffect(() => {
        getHikes()
            .then(setHikes)
    },
        []

    )

    useEffect(
        () => {
            const myHikes = hikes.filter(hike => hike.UserId === summitUserObject)
            setFilteredHikes(myHikes)
        },
        [hikes]
    )

    



    return <>

        <button onClick={() => navigate("/hike/create")}>Add Hike</button>

        <h2>Hikes</h2>
        <article className="hikes">
            {
                hikes.map(
                    hike => <section className="hike" key={hike.id}>
                        <div className="hike__name">Name: {hike.name}</div>
                        <div className="hike__skillLevel">Skill Level: {hike.skillLevel}</div>
                        <div className="hike__distance">Distance: {hike.distance}</div>
                        <div className="hike__location">Location:{hike.location}</div>
                        <div className="hike__estLength">Estimated Length of Hike: {hike.estLength}</div>
                        <div className="hike__description">Description: {hike.description}</div>
                        <div className="hike__attractions">Attractions: {hike.attractions}</div>
                    </section>
                )
            }
        </article>
    </>
}