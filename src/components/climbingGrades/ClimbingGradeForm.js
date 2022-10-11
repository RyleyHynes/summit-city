import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { createNewGrade } from "../managers/GradeManager";

//function to display the form for a new skill rating
export const ClimbingGradeForm = () => {
    //invoking useNavigate and assigning its return value to navigate so that we can navigate through our application programmatically
    const navigate = useNavigate()
    const [currentClimbingGrade, setCurrentClimbingGrade] = useState({
        rating: ""
    })

    //function to change copy of the initial state and set it to the state
    const changeClimbingGradeState = (domEvent) => {
        const newClimbingGrade = { ...currentClimbingGrade } //creating a copy of the initial state
        newClimbingGrade[domEvent.target.name] = domEvent.target.value
        setCurrentClimbingGrade(newClimbingGrade)
    }

    //HTML for the Rating form that the user sees
    return(
        <>
        <Form>
            <h2>Create a New Climbing Grade</h2>
            <Form.Group className="mb-3" controlId="formBasicRating">
                    <Form.Label className="profile_edit">Rating: </Form.Label>
                    <Form.Control type="text" name="rating" required autoFocus className="form-control" value={currentClimbingGrade.rating}
                        // when the value of the Form.Control changes we trigger the changeClimbingGradeState Function
                        onChange={changeClimbingGradeState} />
                </Form.Group>
                <Button variant="primary" type="submit" onClick={event => {
                    //preventing browser reload/refresh
                    event.preventDefault()

                    //climbingGrade object to be sent to API
                    const climbingGrade = {
                        rating: currentClimbingGrade.rating
                    }
                    /*Send POST request to API containing the climbingGrade object above*/
                    createNewGrade(climbingGrade)
                        .then(() => navigate("/climbingGradeList")) //navigating back to the climbingGrade list after submission
                }}
                    className="btn btn-primary">Create Climbing Grade</Button>
                {/* when cancel is clicked it navigates the user back to the climbingGrade list */}
                <Button onClick={() => navigate("/climbingGradeList")}>Cancel</Button>
        </Form>
        </>
    )
}