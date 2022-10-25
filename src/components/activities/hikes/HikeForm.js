import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { getAllHikeSkillLevels } from "../../managers/SkillLevelManager";
import { createNewHike } from "../../managers/HikeManager";
import { getAllTags } from "../../managers/TagManager";



export const HikeForm = () => {
    /*Invoking useNavigate and assigning it to navigate so that we can navigate our application programmatically*/
    const navigate = useNavigate()
    //setting up initial state for stages
    const [skillLevels, setSkillLevels] = useState([])
    const [tags, setTags] = useState([])
    const [tagsForHike, setTagsForHike] = useState([])

    //observes and invokes getter functions and sets them to their respective states
    useEffect(() => {
        getAllHikeSkillLevels().then(data => setSkillLevels(data))
        getAllTags().then(tagsData => setTags(tagsData))
    }, [])

    const updateTags = (tagId) => {
        let tagsCopy = [...tagsForHike]
        const index = tagsCopy.indexOf(tagId)
        if (index < 0) {
            tagsCopy.push(tagId)
        } else {
            tagsCopy.splice(index, 1)
        }
        setTagsForHike(tagsCopy)
    }

    //assigning the currentHike state to an object of key value pairs 
    const [currentHike, setCurrentHike] = useState({
        name: "",
        distance: "",
        location: "",
        estimated_length: "",
        description: "",
        hike_image_url: "",
        hike_skill_level: 0,
        tags: []
    })

    //function to change copy of the initial currentHike state and set the new currentHike value to the state
    const changeHikeState = (domEvent) => {
        const newHike = { ...currentHike } //creating a copy of the initial currentHike state
        newHike[domEvent.target.name] = domEvent.target.value
        setCurrentHike(newHike)
    }

    //HTML for the create new hike form
    return (
        <>
            <Form>
                <h2 className="hikeForm_title">Create New Hike</h2>

                <Form.Group className="mb-3" controlId="formBasicDate">
                    <Form.Label className="profile_edit">Name: </Form.Label>
                    <input type="text" name="name" required className="form-control" value={currentHike.name}
                        //When the value changes the changeHikeState function is triggered
                        onChange={changeHikeState} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicDate">
                    <Form.Label className="profile_edit">Distance: </Form.Label>
                    <input type="number" name="distance" required className="form-control" value={currentHike.distance}
                        //When the value changes the changeHikeState function is triggered
                        onChange={changeHikeState} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicDate">
                    <Form.Label className="profile_edit">Location: </Form.Label>
                    <input type="text" name="location" required className="form-control" value={currentHike.location}
                        //When the value changes the changeHikeState function is triggered
                        onChange={changeHikeState} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicDate">
                    <Form.Label className="profile_edit">Estimate Length: </Form.Label>
                    <input type="number" name="estimated_length" required className="form-control" value={currentHike.estimated_length}
                        //When the value changes the changeHikeState function is triggered
                        onChange={changeHikeState} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicDate">
                    <Form.Label className="profile_edit">Description: </Form.Label>
                    <input type="text" name="description" required className="form-control" value={currentHike.description}
                        //When the value changes the changeHikeState function is triggered
                        onChange={changeHikeState} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicDate">
                    <Form.Label className="profile_edit">Hike Image(URL): </Form.Label>
                    <input type="text" name="hike_image_url" required className="form-control" value={currentHike.hike_image_url}
                        //When the value changes the changeHikeState function is triggered
                        onChange={changeHikeState} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicStage">
                    <Form.Label className="profile_edit">Skill Level: </Form.Label>
                    <Form.Select className="form-control" name="hike_skill_level" value={currentHike.hike_skill_level} required onChange={changeHikeState}>
                        <option value="0">Choose Skill Level</option>
                        {/* mapping through the stages to display as a drop down menu */}
                        {
                            skillLevels.map(skillLevel => {
                                return <option value={skillLevel.id} key={`skillLevel--${skillLevel.id}`}>{skillLevel.level}</option>
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
                                                checked={tagsForHike.includes(tag.id)}
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
                    //hike object to be sent to the API
                    const hike = {
                        name: currentHike.name,
                        distance: currentHike.distance,
                        location: currentHike.location,
                        estimated_length: currentHike.estimated_length,
                        description: currentHike.description,
                        hike_image_url: currentHike.hike_image_url,
                        hike_skill_level: parseInt(currentHike.hike_skill_level),
                        tags: tagsForHike
                    }
                    /*Invoking the POST method with the hike object and then navigating to fridaysSchedule*/
                    createNewHike(hike)
                        .then(() => navigate("/hikeList"))
                }}
                    className="btn btn-primary">Create Hike</Button>
                {/* when cancel is clicked it navigates the user back to the friday schedule */}
                <Button onClick={() => navigate("/hikeList")}>Cancel</Button>
            </Form>
        </>
    )
}


