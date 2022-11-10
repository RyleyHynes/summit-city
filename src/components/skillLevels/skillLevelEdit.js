import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router"
import { getSingleHikeSkillLevel, updateHikeSkillLevel } from "../managers/SkillLevelManager"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export const EditSkillLevel = () => {
    //assigning the skillLevel state to an object of key value pairs that are all set to empty strings
    const [skillLevel, setSkillLevel] = useState({
        level: ""
    })

    /*invoking useParams and assigning its return value to skillLevelId. This hook returns an object of 
    key/value pairs of the dynamic params from the current URL that were matched by the <Route path>*/
    const { skillLevelId } = useParams()
    /*Invoking useNavigate and assigning it to navigate so that we can navigate our application programmatically*/
    const navigate = useNavigate()

    /*getting the singleSkillLevel from the SkillLevelsManager.js file by the skillLevelId param and setting 
    that data into the skillLevels state*/
    useEffect(() => {
        getSingleHikeSkillLevel(skillLevelId).then(data => setSkillLevel(data))
    }, [skillLevelId])

    //handles the submission of an skillLevel edit
    const handleSubmit = (evt) => {
        evt.preventDefault() //preventing browser reload/refresh
        //Invoking the PUT method in the SkillLevelManager.js file and navigating back to the skillLevel list
        updateHikeSkillLevel(skillLevelId, skillLevel).then((data) => {
            navigate(`/skillLevelList`)
        })
    }

    //function to change copy of the initial skillLevel state and set the new skillLevel value to the state
    const changeSkillLevelState = (event) => {
        const skillLevelCopy = { ...skillLevel } //creating a copy of the skillLevel state
        skillLevelCopy[event.target.name] = event.target.value
        setSkillLevel(skillLevelCopy)
    }

    //HTML form the user will see to update the skillLevel
    return <>
        <Form>
            <h2 className="activityForm_title">Update Skill Level</h2>
            <Form.Group className="mb-3" controlId="formBasicSkillLevel">
                <Form.Label className="profile_edit">Skill Level:</Form.Label>
                <Form.Control className="input" required autoFocus
                    type="text"
                    value={skillLevel.level}
                    name="level"
                    //When the value changes the changeSkillLevelState function is triggered
                    onChange={changeSkillLevelState} />
            </Form.Group>

            <Button type="submit"
                onClick={handleSubmit} //when save is clicked the handleSubmit function is triggered
                className="button is-success">
                Save
            </Button>
            {/* when cancel is clicked it navigates the user back to the skillLevel list */}
            <Button onClick={() => navigate("/skillLevelList")}>Cancel</Button>
        </Form>
    </>
}