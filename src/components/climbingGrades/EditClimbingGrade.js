import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router"
import { getSingleGrade, updateGrade } from "../managers/GradeManager"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export const EditClimbingGrade = () => {
    //assigning the climbingGrade state to an object of key value pairs that are all set to empty strings
    const [climbingGrade, setClimbingGrade] = useState({
        rating: ""
    })

    /*invoking useParams and assigning its return value to climbingGradeId. This hook returns an object of 
    key/value pairs of the dynamic params from the current URL that were matched by the <Route path>*/
    const { climbingGradeId } = useParams()
    /*Invoking useNavigate and assigning it to navigate so that we can navigate our application programmatically*/
    const navigate = useNavigate()

    /*getting the singleClimbingGrade from the ClimbingGradesManager.js file by the climbingGradeId param and setting 
    that data into the climbingGrades state*/
    useEffect(() => {
        getSingleGrade(climbingGradeId).then(data => setClimbingGrade(data))
    }, [climbingGradeId])

    //handles the submission of an climbingGrade edit
    const handleSubmit = (evt) => {
        evt.preventDefault() //preventing browser reload/refresh
        //Invoking the PUT method in the ClimbingGradeManager.js file and navigating back to the climbingGrade list
        updateGrade(climbingGradeId, climbingGrade).then((data) => {
            navigate(`/climbingGradeList`)
        })
    }

    //function to change copy of the initial climbingGrade state and set the new climbingGrade value to the state
    const changeClimbingGradeState = (event) => {
        const climbingGradeCopy = { ...climbingGrade } //creating a copy of the climbingGrade state
        climbingGradeCopy[event.target.name] = event.target.value
        setClimbingGrade(climbingGradeCopy)
    }

    //HTML form the user will see to update the climbingGrade
    return <>
        <Form>
            <h2 className="activityForm_title">Update Climbing Grade</h2>
            <Form.Group className="mb-3" controlId="formBasicClimbingGrade">
                <Form.Label className="profile_edit">Rating:</Form.Label>
                <Form.Control className="input" required autoFocus
                    type="text"
                    value={climbingGrade.rating}
                    name="rating"
                    //When the value changes the changeClimbingGradeState function is triggered
                    onChange={changeClimbingGradeState} />
            </Form.Group>

            <Button type="submit"
                onClick={handleSubmit} //when save is clicked the handleSubmit function is triggered
                className="button is-success">
                Save
            </Button>
            {/* when cancel is clicked it navigates the user back to the climbingGrade list */}
            <Button onClick={() => navigate("/climbingGradeList")}>Cancel</Button>
        </Form>
    </>
}