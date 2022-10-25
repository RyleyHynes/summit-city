import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router"
import { getAllClimbSkillLevels } from "../../managers/SkillLevelManager"
import { getSingleClimb, updateClimb } from "../../managers/ClimbManager"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { getAllTags } from "../../managers/TagManager";
import { getAllGrades } from "../../managers/GradeManager";
import { getAllClimbTypes } from "../../managers/ClimbTypeManager";

export const ClimbEdit = () => {

    const [tags, setTags] = useState([])
    const [tagsForClimb, setTagsForClimb] = useState([])
    //setting up initial state for skillLevels
    const [grades, setGrades] = useState([])
    const [climbTypes, setClimbTypes] = useState([])

    //assigning the currentClimb state to an object of key value pairs 
    const [climb, setEditClimb] = useState({
        name: "",
        description: "",
        location: "",
        climb_image_url: "",
        climb_skill_level: 0,
        grade:0,
        tags: []
    })


        const updateTags = (tagId) => {
            const tagsCopy = [...tagsForClimb]
            const index = climb.tags.indexOf(tagId)
            if (index < 0) {
            tagsCopy.push(tagId)
            } else {
            tagsCopy.splice(index, 1)
            }
            setTagsForClimb(tagsCopy)
        }

    /*invoking useParams and assigning its return value to climbId. This hook returns an object of 
    key/value pairs of the dynamic params from the current URL that were matched by the <Route path>*/
    const { climbId } = useParams()
    /*Invoking useNavigate and assigning it to navigate so that we can navigate our application programmatically*/
    const navigate = useNavigate()


    //observes and invokes getSingleClimb by the climbId param and sets it into the editClimb state 
    useEffect(() => {
        getSingleClimb(climbId).then(data => {setEditClimb(data) 
            const tagIds = data.tags?.map(t => t.id) 
            setTagsForClimb(tagIds)
        })
        getAllTags().then(tagData => setTags(tagData))
        getAllGrades().then(gradeData => setGrades(gradeData))
        getAllClimbTypes().then(typeData => setClimbTypes(typeData))
        }, [climbId])

    //function to submit the updated climb 
    const handleSubmit = (evt) => {
        evt.preventDefault() //preventing browser reload/refresh
        climb.tags = tagsForClimb
        updateClimb(climbId, climb).then((data) => {
            navigate("/climbList")
        })
    }

    //function to change copy of the initial climb state and set the new climb value to the state
    const changeClimbState = (event) => {
        const climbCopy = { ...climb } //creating a copy of the initial climb state
        climbCopy[event.target.name] = event.target.value
        setEditClimb(climbCopy)
    }

    //HTML for the edit climb form
    return <>
        <Form>
            <h2 className="climbForm_title">Update Climb</h2>
            <Form.Group className="mb-3" controlId="formBasicArtist">
                <Form.Label className="profile_edit">Name:</Form.Label>
                <Form.Control className="input" required autoFocus
                    type="text"
                    value={climb.name}
                    name="name"
                    //When the value changes the changeClimbState function is triggered
                    onChange={changeClimbState} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicDescription">
                <Form.Label className="profile_edit">Description:</Form.Label>
                <Form.Control required autoFocus
                    as="textarea" rows={2}
                    value={climb.description}
                    name="description"
                    onChange={changeClimbState} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicDescription">
                <Form.Label className="profile_edit">Location:</Form.Label>
                <Form.Control required autoFocus
                    as="textarea" rows={2}
                    value={climb.location}
                    name="location"
                    onChange={changeClimbState} />
            </Form.Group>
            
            <Form.Group className="mb-3" controlId="formBasicURL">
                <Form.Label className="profile_edit">Climb Image (URL):</Form.Label>
                <Form.Control className="input" required autoFocus
                    type="text"
                    value={climb.climb_image_url}
                    name="climb_image_url"
                    onChange={changeClimbState} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicStage">
                    <Form.Label className="profile_edit">Climb Type: </Form.Label>
                    <Form.Select className="form-control" name="climb_type" value={climb?.climb_type?.id} required onChange={changeClimbState}>
                        <option value="0">Choose Type</option>
                        {/* mapping through the stages to display as a drop down menu */}
                        {
                            climbTypes.map(climbType => {
                                return <option value={climbType.id} key={`climbType--${climbType.id}`}>{climbType.name}</option>
                            })
                        }
                    </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicStage">
                    <Form.Label className="profile_edit">Grade: </Form.Label>
                    <Form.Select className="form-control" name="grade" value={climb?.grade?.id} required onChange={changeClimbState}>
                        <option value="0">Choose grade</option>
                        {/* mapping through the stages to display as a drop down menu */}
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

            <Button type="submit"
                onClick={handleSubmit} //when save is clicked the handleSubmit function is triggered
                className="button is-success">
                Save
            </Button>
            {/* when cancel is clicked it navigates the user back to the artist list */}
            <Button onClick={() => navigate("/climbList")}>Cancel</Button>
        </Form>
    </>
}



