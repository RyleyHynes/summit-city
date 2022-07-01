import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router"


export const ClimbEdit = () => {
    /* */
    /*state created for climb which is equal to a object with 7 properties*/
    const [climb, editClimb] = useState({
        name: "",
        location: "",
        typeId: "",
        gradeId: 0,
        description: "",
        completed: false,
        bucketList: false
    })
    /*The useParams hook returns an object of key/value pairs of the dynamic params 
    from the current URL that were matched by the <Route path>. Child routes inherit 
    all params from their parent routes. (invoking useParams and assigning its return 
    value to climbId */
    const { climbId } = useParams()
    /*invoking useNavigate and assigning its return value to navigate*/
    const navigate = useNavigate()
    
    /*Creating an initial state of grades which is equal to an empty array. 
    setGrades is the function that will alter the state of grades*/
    const [grades, setGrades] = useState([])
    /*Creating an intial state of types which is equal to an empty array.
    setTypes is the function that will alter the state of types*/
    const [types, setTypes] = useState([])


    /*useEffect to fetch all of the climbs by climbId then store that data into 
    a data array. The editClimb function is invoked with data as an input
    and the state of climb is changed. We are also observing climbId*/
    useEffect(() => {
        fetch(`http://localhost:8088/climbs/${climbId}`)
            .then(response => response.json())
            .then((data) => {
                editClimb(data)
            })
    },
        [climbId]
    )

    /*useEffect to fetch the types, we then store that data in a typeArray 
    and then invoke the setTypes function with typeArray as an input which then 
    changes the types state*/
    useEffect(() => {
        fetch(`http://localhost:8088/types`)
            .then((response) => response.json())
            .then((typeArray) => {
                setTypes(typeArray)
            })
    },
        []
    )
    /*useEffect to fetch the grades, store those grades in the gradeArray, and then
    invoke the setGrades function with gradeArray as an input to change the grades
    state*/
    useEffect(() => {
        fetch(`http://localhost:8088/grades`)
            .then((response) => response.json())
            .then((gradeArray) => {
                setGrades(gradeArray)
            })
    },
        []
    )

    
    const editButtonClick = (event) => {
        event.preventDefault()

        return fetch(`http://localhost:8088/climbs/${climbId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(climb)
        })
            .then(response => response.json())
            .then(() => {
                navigate("/climbs")
            })

    }

    return <>
        <form className="climbForm">
            <h2 className="climbForm__title">Update Climb</h2>
            <fieldset>
                <div className="form_group" key={climb.id}>
                    <label htmlFor="name"><b>Name:</b></label>
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
                                editClimb(copy)
                            }}
                    />
                </div>
            </fieldset>

            <fieldset>
                <div className="form_group" key={climb.id}>
                    <label htmlFor="location"><b>Location:</b></label>
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
                                editClimb(copy)
                            }}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form_group" key={climb.id}>
                    <label htmlFor="type"><b>Type:</b></label>
                    <select
                        value={climb.typeId}
                        onChange={(evt) => {
                            const copy = { ...climb }; //created a copy of existing state
                            copy.typeId = parseInt(evt.target.value) //to modify
                            editClimb(copy)
                        }}
                    >
                        <option value="0">Select Climbing Type</option>
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
                        value={climb.gradeId}
                        onChange={(evt) => {
                            const copy = { ...climb }; //created a copy of existing state
                            copy.gradeId = parseFloat(evt.target.value, 2) //to modify
                            editClimb(copy)
                        }}
                    >
                        <option value="0">Select Skill Level</option>
                        {
                            grades.map((grade) => {
                                return <option key={grade.id} value={grade.id}>{grade.rating}</option>
                            })}
                    </select>
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
                                editClimb(copy)
                            }
                        } />
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
                                editClimb(copy)
                            }} />
                    <label htmlFor="yes">True</label>
                    <input type="radio" className="req-form-control"
                        name="completed" value={false} onChange={
                            (event) => {
                                const copy = { ...climb }
                                copy.completed = false
                                editClimb(copy)
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
                                editClimb(copy)
                            }} />
                    <label htmlFor="true">True</label>
                    <input type="radio" className="req-form-control"
                        name="bucketList" value={false} onChange={
                            (event) => {
                                const copy = { ...climb }
                                copy.bucketList = false
                                editClimb(copy)
                            }} />
                    <label htmlFor="false">False</label>
                </div>
            </fieldset>
            <button
                onClick={(clickEvent) => editButtonClick(clickEvent)}
                className="climbAlterButton">
                Save
            </button>

            <button onClick={() => navigate("/climbs")}
                className="climbAlterButton">
                Cancel</button>
        </form>
    </>
}
