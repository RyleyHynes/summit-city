import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { saveClimb } from "../../../manager/APIManager"

export const ClimbForm = () => {

    //set initial hike state (updateHike is the function that changes the state.)
    const [climb, setClimb] = useState({
        name: "",
        location: "",
        skillLevel: "",
        distance: "",
        description: "",
    })

    //invoking useNavigate and assigning its return value to a variable 
    const navigate = useNavigate()

    //get summitUser out of local storage
    // const localSummitUser = localStorage.getItem("summit_user")
    // const summitUserObject = JSON.parse(localSummitUser)

    useEffect(() => {
        fetch(`http://localhost:8088/climbs`)
            .then((response) => response.json())
            .then((climbArray) => {
                setClimb(climbArray)
            })
    },
        []
    )

    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        //create an object to be saved to the API 
        const climbsToSendToApi = {
            name: climb.name,
            location: climb.location,
            type: climb.type,
            grade: climb.grade,
            description: climb.description
            // scheduleDate: ""
        }
        //Perform the fetch() to POST the object to the API
        //copied the url of the climbs from the API, second argument is to fetch is options, that is in the {} after the url, added method of POST with the header, for body, turned the object hikeToSendToApi into a string. When JSON serve response the user will be directed back to the ticket page via navigate("/hikes)")
        saveClimb(climbsToSendToApi)
            .then(() => {
                navigate("/climbs")
            })
    }

    // onChange event will update the hike properties when changed.  updating state each time it is changed and it will update the copy and property listed. in the callback function in the onChange, parameter of event, and set a target. 
    // Then calling the update function to change the new state
    // added onclick to the submit button, passed clickEvent into the argument for the handleSaveButtonFunction
    return (
        <form className="climbForm">
            <h2 className="climbForm__title">New Climb</h2>
            <fieldset>
                <div className="form_group" key={climb.id}>
                    <label htmlFor="Name">Name:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Climb Name"
                        value={climb.name}
                        onChange={
                            (event) => {
                                const copy = { ...climb }
                                copy.name = event.target.value
                                setClimb(copy)
                            }}
                    />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group" key={climb.id}>
                    <label htmlFor="Name">Location:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Climb Location"
                        value={climb.location}
                        onChange={
                            (event) => {
                                const copy = { ...climb }
                                copy.location = event.target.value
                                setClimb(copy)
                            }}
                    />
                </div>
            </fieldset>

            <fieldset>
                <div className="form_group" key={climb.id}>
                    <label htmlFor="Type">Type of Climbing:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Type of Climbing"
                        value={climb.type}
                        onChange={
                            (event) => {
                                const copy = { ...climb }
                                copy.type = event.target.value
                                setClimb(copy)
                            }}
                    />
                </div>
            </fieldset>

            <fieldset>
                <div className="form_group" key={climb.id}>
                    <label htmlFor="grade">Climbing Grade:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Climbing Grade"
                        value={climb.grade}
                        onChange={
                            (event) => {
                                const copy = { ...climb }
                                copy.grade = event.target.value
                                setClimb(copy)
                            }
                        } />
                </div>
            </fieldset>

            <fieldset>
                <div>
                    <label htmlFor="description">Description:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Climb Description"
                        value={climb.description}
                        onChange={
                            (event) => {
                                const copy = { ...climb }
                                copy.description = event.target.value
                                setClimb(copy)
                            }
                        } />
                </div>
            </fieldset>

            {/* <select value={hike.skillLevel}
                        onChange={
                            (event) => {
                                const copy = { ...hike }
                                copy.skillLevel = event.target.value
                                updateHike(copy)
                            }
                        }><option value="0">Select Skill Level</option>
                        {HikeSearch.map((hike) => {
return <option key = {hike.id}>{hike.skillLevel}</option>
                        })}
                    </select> */}


            <button onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
                className="btn btn-primary">
                Submit Climb
            </button>
        </form >
    )

}