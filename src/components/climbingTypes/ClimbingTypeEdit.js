import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router"
import { getSingleClimbType, updateClimbType } from "../managers/ClimbTypeManager"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export const EditClimbingType = () => {
    //assigning the climbingType state to an object of key value pairs that are all set to empty strings
    const [climbingType, setClimbingType] = useState({
        name: "",
        climb_type_image: ""
    })

    /*invoking useParams and assigning its return value to climbingTypeId. This hook returns an object of 
    key/value pairs of the dynamic params from the current URL that were matched by the <Route path>*/
    const { climbingTypeId } = useParams()
    /*Invoking useNavigate and assigning it to navigate so that we can navigate our application programmatically*/
    const navigate = useNavigate()

    /*getting the singleClimbingType from the ClimbingTypesManager.js file by the climbingTypeId param and setting 
    that data into the climbingTypes state*/
    useEffect(() => {
        getSingleClimbType(climbingTypeId).then(data => setClimbingType(data))
    }, [climbingTypeId])

    //handles the submission of an climbingType edit
    const handleSubmit = (evt) => {
        evt.preventDefault() //preventing browser reload/refresh
        //Invoking the PUT method in the ClimbingTypeManager.js file and navigating back to the climbingType list
        updateClimbType(climbingTypeId, climbingType).then((data) => {
            navigate(`/climbingTypeList`)
        })
    }

    //function to change copy of the initial climbingType state and set the new climbingType value to the state
    const changeClimbingTypeState = (event) => {
        const climbingTypeCopy = { ...climbingType } //creating a copy of the climbingType state
        climbingTypeCopy[event.target.name] = event.target.value
        setClimbingType(climbingTypeCopy)
    }

    //HTML form the user will see to update the climbingType
    return <>
        <Form>
            <h2 className="showForm_title">Update Climbing Type</h2>
            <Form.Group className="mb-3" controlId="formBasicClimbingType">
                <Form.Label className="profile_edit">Name:</Form.Label>
                <Form.Control className="input" required autoFocus
                    type="text"
                    value={climbingType.name}
                    name="name"
                    //When the value changes the changeClimbingTypeState function is triggered
                    onChange={changeClimbingTypeState} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicURL">
                <Form.Label className="profile_edit">URL Image:</Form.Label>
                <Form.Control className="input" required autoFocus
                    type="text"
                    value={climbingType.climb_type_image}
                    name="artist_image"
                    onChange={changeClimbingTypeState} />
            </Form.Group>

            <Button type="submit"
                onClick={handleSubmit} //when save is clicked the handleSubmit function is triggered
                className="button is-success">
                Save
            </Button>
            {/* when cancel is clicked it navigates the user back to the climbingType list */}
            <Button onClick={() => navigate("/climbingTypeList")}>Cancel</Button>
        </Form>
    </>
}