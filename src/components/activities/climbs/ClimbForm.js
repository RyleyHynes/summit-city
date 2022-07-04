import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

/*creating an exportable function to add climbs*/
export const ClimbForm = () => {

    /*set initial climb state (addClimb is the function that changes the state.)*/
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
        url: ""
    })

    /*invoking useNavigate and assigning its return value to a variable of navigate*/
    const navigate = useNavigate()


    /*Creating an initial state for types, setTypes is the function that 
    will change the state*/
    const [types, setTypes] = useState([])
    /*Creating an initial state for grades, setGrades is the function that 
    will change the state*/
    const [grades, setGrades] = useState([])


    /*get "summit_user" out of local storage*/
    const localSummitUser = localStorage.getItem("summit_user")
    /*taking the "summit_user" string and turning it into an object*/
    const summitUserObject = JSON.parse(localSummitUser)
    /*reassigning summitUserObjects value to userId*/
    const userId = summitUserObject


    /*useEffect to fetch all of the types*/
    useEffect(() => {
        fetch(`http://localhost:8088/types`)
            .then((response) => response.json())
            /*capturing that data and storing it in typeArray*/
            .then((typeArray) => {
                /*invoking setTypes function with the typeArray to change the state 
                of types*/
                setTypes(typeArray)
            })
    },
        []
    )

    /*useEffect to fetch all of the grades*/
    useEffect(() => {
        fetch(`http://localhost:8088/grades`)
            .then((response) => response.json())
            /*storing that data in the gradeArray*/
            .then((gradeArray) => {
                /*invoking the setGrades function with the gradeArray to change the 
                state of grades*/
                setGrades(gradeArray)
            })
    },
        []
    )

    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        /*create an object to be saved to the API*/
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
        /*Perform fetch() to POST the object to the API*/
        return fetch(`http://localhost:8088/userClimbs`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(climbToSendToAPI),
        })
            .then((response) => response.json())
            .then(() => {
                /*invoking navigate with "/climbs" to bring us back to the climbs 
                page after it is complete*/
                navigate("/climbs");
            })
    };

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
                                copy.gradeId = parseFloat(evt.target.value, 2) //to modify
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
                        <input type="radio" className="req-form-control"
                            name="completed" value={true}
                            onChange={
                                (event) => {
                                    const copy = { ...climb }
                                    copy.completed = true
                                    addClimb(copy)
                                }} />
                        <label htmlFor="yes">True</label>
                        <input type="radio" className="req-form-control"
                            name="completed" value={false} onChange={
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
                        <input type="radio" className="req-form-control"
                            name="bucketList" value={true}
                            onChange={
                                (event) => {
                                    const copy = { ...climb }
                                    copy.bucketList = true
                                    addClimb(copy)
                                }} />
                        <label htmlFor="true">True</label>
                        <input type="radio" className="req-form-control"
                            name="bucketList" value={false} onChange={
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
            </form >
        </>
    )
}