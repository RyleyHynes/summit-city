import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { deleteClimbType, getAllClimbTypes, getSearchClimbTypes } from "../managers/ClimbTypeManager"
// import "./List.css"

//function to list off the climbingTypes that has a prop of seStaff
export const ClimbingTypeList = ({ searchTermState }) => {
    //setting initial state of climbingType to an empty array
    const [climbingTypes, setClimbingTypes] = useState([])
    //setting initial state of staff
    const [staff, setStaffState] = useState()
    /*Invoking useNavigate and assigning it to navigate so that we can navigate our application programmatically*/
    const navigate = useNavigate()

    //getting the is_staff property out of local storage for the current user and setting it to the staff state
    useEffect(() => {
        setStaffState(localStorage.getItem("is_staff"))
    }, [])

    //getting the climbingTypes from the ClimbingTypesManager.js file and setting that data into the climbingTypes state
    useEffect(() => {
        getAllClimbTypes().then(data => setClimbingTypes(data))
    }, [])



    //Displaying the HTML for the climbingTypes that will be listed out
    return (
        <>
            <h2 className="activityListTitle">Climbing Types</h2>
            {/* if the user is staff they will be able to see a button that will bring them to the add climbingType form */}
            <div className="topButtons">
                {
                    (staff === "true")
                        ?
                        <>
                            <button className="staffButton" onClick={() => navigate("/climbList")}>Back to Climbs</button>
                            <button className="staffButton" onClick={() => navigate("/climbingType/create")}>Add Climbing Type</button>
                        </>
                        :
                        <>

                        </>
                }
            </div>
            <article>
                <ul className="activityContainer">
                    {/* mapping through each climbingType to get their image, name, genre, and description */}
                    {climbingTypes.map((climbingType) => {
                        return (
                            <div className="individualActivity" key={`climbingType-${climbingType.id}`}>
                                <section className="activityList" key={`climbingType-${climbingType.id}`}>

                                    <div className="imageContainer">
                                        <img className="activityPicture" src={climbingType?.climb_type_image} alt='climb'></img>
                                    </div>
                                    <div className="textContainer">
                                        <div className="activityInfo"><b>Name: </b>{climbingType.name}</div>
                                    </div>
                                </section>
                                <section className="bottomButtons">
                                    {/* if the user is staff they will have the option to edit or delete each climbingType */}
                                    {
                                        (staff === "true")
                                            ?
                                            <>
                                                <button className="alterButton" onClick={() => navigate(`/climbingType/${climbingType.id}/edit`)}>Edit</button>
                                                <button className="alterButton" onClick={() => {
                                                    deleteClimbType(climbingType.id).then(() => { getAllClimbTypes().then(setClimbingTypes) })
                                                }}>Delete</button>
                                            </>
                                            :
                                            <>

                                            </>
                                    }
                                </section>
                            </div>
                        )
                    })}
                </ul>
            </article>
        </>
    )
}