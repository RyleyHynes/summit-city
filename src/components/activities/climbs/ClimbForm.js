import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { getAllTags } from "../../managers/TagManager";
import { getAllGrades } from "../../managers/GradeManager";
import { createNewClimb } from "../../managers/ClimbManager";
import { getAllClimbTypes } from "../../managers/ClimbTypeManager";



export const ClimbForm = () => {
    /*Invoking useNavigate and assigning it to navigate so that we can navigate our application programmatically*/
    const navigate = useNavigate()
    //setting up initial state for grades
    const [grades, setGrades] = useState([])
    //setting up initial state for grades
    const [climbTypes, setClimbTypes] = useState([])
    const [tags, setTags] = useState([])
    const [tagsForClimb, setTagsForClimb] = useState([])

    //observes and invokes getter functions and sets them to their respective states
    useEffect(() => {
        getAllGrades().then(data => setGrades(data))
        getAllClimbTypes().then(climbTypeData => setClimbTypes(climbTypeData))
        getAllTags().then(tagsData => setTags(tagsData))
    }, [])

    const updateTags = (tagId) => {
        let tagsCopy = [...tagsForClimb]
        const index = tagsCopy.indexOf(tagId)
        if (index < 0) {
            tagsCopy.push(tagId)
        } else {
            tagsCopy.splice(index, 1)
        }
        setTagsForClimb(tagsCopy)
    }

    //assigning the currentClimb state to an object of key value pairs 
    const [currentClimb, setCurrentClimb] = useState({
        name: "",
        description: "",
        location: "",
        climb_image_url: "",
        climb_type: 0,
        grade:0,
        tags: []
    })

    //function to change copy of the initial currentClimb state and set the new currentClimb value to the state
    const changeClimbState = (domEvent) => {
        const newClimb = { ...currentClimb } //creating a copy of the initial currentClimb state
        newClimb[domEvent.target.name] = domEvent.target.value
        setCurrentClimb(newClimb)
    }

    //HTML for the create new climb form
    return (
        <>
            <Form>
                <h2 className="climbForm_title">Create New Climb</h2>

                <Form.Group className="mb-3" controlId="formBasicDate">
                    <Form.Label className="profile_edit">Name: </Form.Label>
                    <input type="text" name="name" required className="form-control" value={currentClimb.name}
                        //When the value changes the changeClimbState function is triggered
                        onChange={changeClimbState} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicDate">
                    <Form.Label className="profile_edit">Description: </Form.Label>
                    <input type="text" name="description" required className="form-control" value={currentClimb.description}
                        //When the value changes the changeClimbState function is triggered
                        onChange={changeClimbState} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicDate">
                    <Form.Label className="profile_edit">Location: </Form.Label>
                    <input type="text" name="location" required className="form-control" value={currentClimb.location}
                        //When the value changes the changeClimbState function is triggered
                        onChange={changeClimbState} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicDate">
                    <Form.Label className="profile_edit">Climb Image(URL): </Form.Label>
                    <input type="text" name="climb_image_url" required className="form-control" value={currentClimb.climb_image_url}
                        //When the value changes the changeClimbState function is triggered
                        onChange={changeClimbState} />
                </Form.Group>


                <Form.Group className="mb-3" controlId="formBasicClimbType">
                    <Form.Label className="profile_edit">Climb Type: </Form.Label>
                    <Form.Select className="form-control" name="climb_type" value={currentClimb.climb_type} required onChange={changeClimbState}>
                        <option value="0">Choose Type</option>
                        {/* mapping through the climb types to display as a drop down menu */}
                        {
                            climbTypes.map(climbTypes => {
                                return <option value={climbTypes.id} key={`climbTypes--${climbTypes.id}`}>{climbTypes.name}</option>
                            })
                        }
                    </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicGrade">
                    <Form.Label className="profile_edit">Grade: </Form.Label>
                    <Form.Select className="form-control" name="grade" value={currentClimb.grade} required onChange={changeClimbState}>
                        <option value="0">Choose Grade</option>
                        {/* mapping through the grades to display as a drop down menu */}
                        {
                            grades.map(grade => {
                                return <option value={grade.id} key={`grade--${grade.id}`}>{grade.rating}</option>
                            })
                        }
                    </Form.Select>
                </Form.Group>

                <div className="field">
                    <label htmlFor="content" className="label">Tags: </label>
                    {
                        tags.map(tag => {
                            return (
                                <div className="field" key={`tag--${tag.id}`}>
                                    <div className="control">
                                        <label className="checkbox" htmlFor={tag.label}>
                                            <input type="checkbox" name={tag.label}
                                                checked={tagsForClimb.includes(tag.id)}
                                                onChange={() => {
                                                    updateTags(tag.id)
                                                }} />
                                            {tag.label}
                                        </label>
                                    </div>
                                </div>
                            )
                        })

                    }
                </div>

                <Button variant="primary" type="submit" onClick={event => {
                    event.preventDefault() //preventing browser reload/refresh
                    //climb object to be sent to the API
                    const climb = {
                        name: currentClimb.name,
                        description: currentClimb.description,
                        location: currentClimb.location,
                        climb_image_url: currentClimb.climb_image_url,
                        climb_type: parseInt(currentClimb.climb_type),
                        grade: parseInt(currentClimb.grade),
                        tags: tagsForClimb
                    }
                    /*Invoking the POST method with the climb object and then navigating to climb list*/
                    createNewClimb(climb)
                        .then(() => navigate("/climbList"))
                }}
                    className="btn btn-primary">Create Climb</Button>
                {/* when cancel is clicked it navigates the user back to the climb list */}
                <Button onClick={() => navigate("/climbList")}>Cancel</Button>
            </Form>
        </>
    )
}