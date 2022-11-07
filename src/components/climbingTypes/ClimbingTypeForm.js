import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { createNewClimbType } from "../managers/ClimbTypeManager";

//function to display the form for a new skill name
export const ClimbingTypeForm = () => {
    //invoking useNavigate and assigning its return value to navigate so that we can navigate through our application programmatically
    const navigate = useNavigate()
    const [currentClimbingType, setCurrentClimbingType] = useState({
        name: "",
        climb_type_image:""
    })

    //function to change copy of the initial state and set it to the state
    const changeClimbingTypeState = (domEvent) => {
        const newClimbingType = { ...currentClimbingType } //creating a copy of the initial state
        newClimbingType[domEvent.target.name] = domEvent.target.value
        setCurrentClimbingType(newClimbingType)
    }

    //HTML for the Type form that the user sees
    return(
        <>
        <Form>
            <h2>Create a New Climbing Type</h2>
            <Form.Group className="mb-3" controlId="formBasicName">
                    <Form.Label className="edit">Type: </Form.Label>
                    <Form.Control type="text" name="name" required autoFocus className="form-control" value={currentClimbingType.name}
                        // when the value of the Form.Control changes we trigger the changeClimbingTypeState Function
                        onChange={changeClimbingTypeState} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicClimbingTypeImage">
                    <Form.Label className="edit">Climbing Type Image(URL): </Form.Label>
                    <Form.Control type="text" name="climb_type_image" required className="form-control" value={currentClimbingType.climb_type_image}
                        onChange={changeClimbingTypeState} />
                </Form.Group>

                <Button variant="primary" type="submit" onClick={event => {
                    //preventing browser reload/refresh
                    event.preventDefault()

                    //climbingType object to be sent to API
                    const climbingType = {
                        name: currentClimbingType.name,
                        climb_type_image: currentClimbingType.climb_type_image
                    }
                    /*Send POST request to API containing the climbingType object above*/
                    createNewClimbType(climbingType)
                        .then(() => navigate("/climbingTypeList")) //navigating back to the climbingType list after submission
                }}
                    className="btn btn-primary">Create Climbing Type</Button>
                {/* when cancel is clicked it navigates the user back to the climbingType list */}
                <Button onClick={() => navigate("/climbingTypeList")}>Cancel</Button>
        </Form>
        </>
    )
}