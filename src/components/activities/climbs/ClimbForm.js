import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export const ClimbForm = () => {

    //set initial climb state (updateClimb is the function that changes the state.)
    const [climb, addClimb] = useState({
        name: "",
        location: "",
        typeId: 0,
        gradeId: 0,
        description: "",
        completed: false,
        bucketList: false,
        scheduleDate: "",
        userId: 0,
        url:""
    })

    //invoking useNavigate and assigning its return value to a variable 
    const navigate = useNavigate()

    const [types, setTypes] = useState([])
    const [grades, setGrades] = useState([])


    // get summitUser out of local storage
    const localSummitUser = localStorage.getItem("summit_user")
    const summitUserObject = JSON.parse(localSummitUser)
    const userId = summitUserObject



    useEffect(() => {
        fetch(`http://localhost:8088/types`)
            .then((response) => response.json())
            .then((typeArray) => {
                setTypes(typeArray)
            })
    },
        []
    )

    useEffect(() => {
        fetch(`http://localhost:8088/grades`)
            .then((response) => response.json())
            .then((gradeArray) => {
                setGrades(gradeArray)
            })
    },
        []
    )

    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        //create an object to be saved to the API 
        const climbToSendToAPI = {
            name: climb.name,
            location: climb.location,
            typeId: parseInt(climb.typeId),
            gradeId: parseInt(climb.gradeId),
            description: climb.description,
            completed: climb.completed,
            scheduleDate: climb.scheduleDate,
            userId: userId.id,
            url: climb.url
        }
        //Perform the fetch() to POST the object to the API
        //copied the url of the climbs from the API, second argument is to fetch is options, that is in the {} after the url, added method of POST with the header, for body, turned the object climbToSendToApi into a string. When JSON serve response the user will be directed back to the ticket page via navigate("/climbs)")
        //Post request to JSON server, when completed, navigate user back to session list - route found in application views.js

        return fetch(`http://localhost:8088/climbs`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(climbToSendToAPI),
        })
            .then((response) => response.json())
            .then(() => {
                navigate("/climbs"); //same as shown in application views
            })
    };

    // onChange event will update the climb properties when changed.  updating state each time it is changed and it will update the copy and property listed. in the callback function in the onChange, parameter of event, and set a target. 
    // Then calling the update function to change the new state
    // added onclick to the submit button, passed clickEvent into the argument for the handleSaveButtonFunction
    return (
        <>
        <form className="climbForm">
            <h2 className="climbForm__title">New Climb</h2>
            <fieldset>
                <div className="form_group" key={climb.id}>
                    <label htmlFor="Name"><b>Name:</b></label>
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
                                addClimb(copy)
                            }}
                    />
                </div>
            </fieldset>

            <fieldset>
                <div className="form_group" key={climb.id}>
                    <label htmlFor="Name"><b>Location:</b></label>
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
                                addClimb(copy)
                            }}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form_group" key={climb.id}>
                    <label htmlFor="description"><b>Description:</b></label>
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
                                addClimb(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form_group" key={climb.id}>
                    <label htmlFor="type"><b>Type:</b></label>
                    <select
                        onChange={(evt) => {
                            const copy = { ...climb }; //created a copy of existing state
                            copy.typeId = parseInt(evt.target.value) //to modify
                            addClimb(copy)
                        }}
                    >
                        <option key={0}>Select Type of Climb</option>
                        {
                            types.map((type) => {
                                return <option key={type.id} value={type.id}>{type.name}</option>
                            })}
                    </select>
                </div>
            </fieldset>
            <fieldset>
                <div className="form_group" key={climb.id}>
                    <label htmlFor="grade"><b>Grade:</b></label>
                    <select
                        onChange={(evt) => {
                            const copy = { ...climb }; //created a copy of existing state
                            copy.gradeId = parseFloat(evt.target.value,2) //to modify
                            addClimb(copy)
                        }}
                    >
                        <option key={0}>Select Climbing Grade: </option>
                        {
                            grades.map((grade) => {
                                return <option key={grade.id} value={grade.id}>{grade.rating}</option>
                            })}
                    </select>
                </div>
            </fieldset>
            <fieldset>
                <div className="form_group" key={climb.id}>
                    <span><b>Completed:</b></span>
                    <input  type="radio" className="req-form-control"
                        name="completed" value={true}
                        onChange={
                            (event) => {
                                const copy = { ...climb }
                                copy.completed = true
                                addClimb(copy)
                            }} />
                    <label htmlFor="yes">True</label>
                    <input  type="radio" className="req-form-control"
                        name="completed" value={false}  onChange={
                            (event) => {
                                const copy = { ...climb }
                                copy.completed = false
                                addClimb(copy)
                            }} />
                    <label htmlFor="false">False</label>
                </div>
            </fieldset>
            <fieldset>
                <div className="form_group" key={climb.id}>
                    <span><b>Bucket List:</b></span>
                    <input  type="radio" className="req-form-control"
                        name="bucketList" value={true}
                        onChange={
                            (event) => {
                                const copy = { ...climb }
                                copy.bucketList = true
                                addClimb(copy)
                            }} />
                    <label htmlFor="true">True</label>
                    <input  type="radio" className="req-form-control"
                        name="bucketList" value={false}  onChange={
                            (event) => {
                                const copy = { ...climb }
                                copy.bucketList = false
                                addClimb(copy)
                            }} />
                    <label htmlFor="false">False</label>
                </div>
            </fieldset>
            <fieldset>
                <div className="form_group" key={climb.id}>
                    <label className="label" htmlFor="description"><b>Photo URL:</b></label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control-site"
                        placeholder="Insert Photo of Hike"
                        value={climb.url}
                        onChange={
                            (event) => {
                                const copy = { ...climb }
                                copy.url = event.target.value
                                addClimb(copy)
                            }
                        } />
                </div>
            </fieldset>

            <button onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
                className="climbAlterButton">
                Submit Climb
            </button>
            <button className="hikeAlterButton" onClick={() => navigate("/climbs")}>Cancel</button>
        </form >
        </>
    )

}