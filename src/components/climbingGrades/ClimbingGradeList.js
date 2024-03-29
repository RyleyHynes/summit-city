import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { deleteGrade, getAllGrades, getSearchGrades } from "../managers/GradeManager"
import "./ClimbingGrade.css"

//function to list off the climbingGrades that has a prop of seStaff
export const ClimbingGradeList = ({ searchTermState }) => {
    //setting initial state of climbingGrade to an empty array
    const [climbingGrades, setClimbingGrades] = useState([])
    //setting initial state of staff
    const [staff, setStaffState] = useState()
    /*Invoking useNavigate and assigning it to navigate so that we can navigate our application programmatically*/
    const navigate = useNavigate()

    //getting the is_staff property out of local storage for the current user and setting it to the staff state
    useEffect(() => {
        setStaffState(localStorage.getItem("is_staff"))
    }, [])

    //getting the climbingGrades from the ClimbingGradesManager.js file and setting that data into the climbingGrades state
    useEffect(() => {
        getAllGrades().then(data => setClimbingGrades(data))
    }, [])

    //Displaying the HTML for the climbingGrades that will be listed out
    return (
        <>
            <h2 className="activityListTitle">Climbing Grades</h2>
            {/* if the user is staff they will be able to see a button that will bring them to the add climbingGrade form */}
            <div className="topButtons">
                {
                    (staff === "true")
                        ?
                        <>
                            <button className="gradeButton" onClick={() => navigate("/climbList")}>Back to Climbs</button>
                            <button className="gradeButton" onClick={() => navigate("/climbingGrade/create")}>Add Climbing Grade</button>
                        </>
                        :
                        <>

                        </>
                }
            </div>
            <article>
                <ul className="gradeContainer">
                    {/* mapping through each climbingGrade to get their image, name, genre, and description */}
                    {climbingGrades.map((climbingGrade) => {
                        return (
                            <div className="individualActivity" key={`climbingGrade-${climbingGrade.id}`}>
                                <section className="activityList" key={`climbingGrade-${climbingGrade.id}`}>
                                    <div className="gradeContainer">
                                        <div className="activityInfo"><b>Rating: </b>{climbingGrade.rating}</div>
                                    </div>
                                </section>
                                <section className="bottomButtons">
                                    {/* if the user is staff they will have the option to edit or delete each climbingGrade */}
                                    {
                                        (staff === "true")
                                            ?
                                            <>
                                                <button className="alterButton" onClick={() => navigate(`/climbingGrade/${climbingGrade.id}/edit`)}>Edit</button>
                                                <button className="alterButton" onClick={() => {
                                                    deleteGrade(climbingGrade.id).then(() => { getAllGrades().then(setClimbingGrades) })
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