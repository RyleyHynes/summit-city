import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { saveHike } from "../../manager/APIManager"

export const HikeForm = () => {

    //set initial hike state (updateHike is the function that changes the state.)
    const [hike, updateHike] = useState({})

    //invoking useNavigate and assigning its return value to a variable 
    const navigate = useNavigate()

    //get summitUser out of local storage
    const localSummitUser = localStorage.getItem("summit_user")
    const summitUserObject = JSON.parse(localSummitUser)


    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        //create an object to be saved to the API 
        const hikeToSendToApi = {
            userId: summitUserObject.userId,
            description: hike.description,
            // scheduleDate: ""
        }
        //Perform the fetch() to POST the object to the API
        //copied the url of the hikes from the API, second argument is to fetch is options, that is in the {} after the url, added method of POST with the header, for body, turned the object hikeToSendToApi into a string. When JSON serve response the user will be directed back to the ticket page via navigate("/hikes)")
        saveHike(hikeToSendToApi)
            .then(() => {
                navigate("/hikes")
            })
    }

    // onChange event will update the hike properties when changed.  updating state each time it is changed and it will update the copy and property listed. in the callback function in the onChange, parameter of event, and set a target. 
    // Then calling the update function to change the new state
    // added onclick to the submit button, passed clickEvent into the argument for the handleSaveButtonFunction
    return (
        <form className="hikeForm">
            <h2 className="hikeForm__title">New Hike</h2>
            <fieldset>
                <div className="form_group">
                    <label htmlFor="description">Description:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Hike Description"
                        value={hike.description}
                        onChange={
                            (event) => {
                                const copy = { ...hike }
                                copy.description = event.target.value
                                updateHike(copy)
                            }
                        }>
                    </input>

                </div>
            </fieldset>
            <button onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
                className= "btn btn-primary">
                Submit Hike
            </button>
        </form>
    )

}