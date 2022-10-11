import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { createNewHikeSkillLevel } from "../managers/SkillLevelManager";

//function to display the form for a new skill level
export const SkillLevelForm = () => {
    //invoking useNavigate and assigning its return value to navigate so that we can navigate through our application programmatically
    const navigate = useNavigate()
    const [currentSkillLevel, setCurrentSkillLevel] = useState({
        level: ""
    })

    //function to change copy of the initial state and set it to the state
    const changeSkillLevelState = (domEvent) => {
        const newSkillLevel = { ...currentSkillLevel } //creating a copy of the initial state
        newSkillLevel[domEvent.target.name] = domEvent.target.value
        setCurrentSkillLevel(newSkillLevel)
    }

    //HTML for the Level form that the user sees
    return(
        <>
        <Form>
            <h2>Create a New Skill Level</h2>
            <Form.Group className="mb-3" controlId="formBasicLevel">
                    <Form.Label className="profile_edit">Level: </Form.Label>
                    <Form.Control type="text" name="level" required autoFocus className="form-control" value={currentSkillLevel.level}
                        // when the value of the Form.Control changes we trigger the changeSkillLevelFunction
                        onChange={changeSkillLevelState} />
                </Form.Group>
                <Button variant="primary" type="submit" onClick={event => {
                    //preventing browser reload/refresh
                    event.preventDefault()

                    //skillLevel object to be sent to API
                    const skillLevel = {
                        level: currentSkillLevel.level
                    }
                    /*Send POST request to API containing the skillLevel object above*/
                    createNewHikeSkillLevel(skillLevel)
                        .then(() => navigate("/skillLevelList")) //navigating back to the skillLevel list after submission
                }}
                    className="btn btn-primary">Create Skill Level</Button>
                {/* when cancel is clicked it navigates the user back to the skillLevel list */}
                <Button onClick={() => navigate("/skillLevelList")}>Cancel</Button>
        </Form>
        </>
    )
}