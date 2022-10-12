import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router"
import { getAllHikeSkillLevels } from "../../managers/SkillLevelManager"
import { getSingleHike, updateHike } from "../../managers/HikeManager"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { getAllTags } from "../../managers/TagManager";

export const HikeEdit = () => {

    const [tags, setTags] = useState([])
    const [tagsForHike, setTagsForHike] = useState([])
    //setting up initial state for stages
    const [stages, setStages] = useState([])
    //setting up initial state for artists
    const [skillLevels, setHikeSkillLevel] = useState([])
    //assigning the currentShow state to an object of key value pairs 
    const [hike, setEditHike] = useState({
        name: "",
        distance: "",
        location: "",
        estimated_length: "",
        description: "",
        hike_image_url: "",
        hike_skill_level: 0,
        tags: []
    })


        const updateTags = (tagId) => {
            const tagsCopy = [...tagsForHike]
            const index = hike.tags.indexOf(tagId)
            if (index < 0) {
            tagsCopy.push(tagId)
            } else {
            tagsCopy.splice(index, 1)
            }
            setTagsForHike(tagsCopy)
        }

    /*invoking useParams and assigning its return value to showId. This hook returns an object of 
    key/value pairs of the dynamic params from the current URL that were matched by the <Route path>*/
    const { hikeId } = useParams()
    /*Invoking useNavigate and assigning it to navigate so that we can navigate our application programmatically*/
    const navigate = useNavigate()


    //observes and invokes getSingleShow by the showId param and sets it into the editShow state 
    useEffect(() => {
        getSingleHike(hikeId).then(data => {setEditHike(data) 
            const tagIds = data.tags?.map(t => t.id) 
            setTagsForHike(tagIds)
        })
        getAllTags().then(data => setTags(data))
        getAllHikeSkillLevels().then(data => setHikeSkillLevel(data))
        }, [hikeId])

    //function to submit the updated show 
    const handleSubmit = (evt) => {
        evt.preventDefault() //preventing browser reload/refresh
        hike.tags = tagsForHike
        updateHike(hikeId, hike).then((data) => {
            navigate("/hikeList")
        })
    }

    //function to change copy of the initial show state and set the new show value to the state
    const changeHikeState = (event) => {
        const hikeCopy = { ...hike } //creating a copy of the initial show state
        hikeCopy[event.target.name] = event.target.value
        setEditHike(hikeCopy)
    }

    //HTML for the edit show form
    return <>
        <Form>
            <h2 className="showForm_title">Update Hike</h2>
            <Form.Group className="mb-3" controlId="formBasicArtist">
                <Form.Label className="profile_edit">Name:</Form.Label>
                <Form.Control className="input" required autoFocus
                    type="text"
                    value={hike.name}
                    name="name"
                    //When the value changes the changeHikeState function is triggered
                    onChange={changeHikeState} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicGenre">
                <Form.Label className="profile_edit">Distance:</Form.Label>
                <Form.Control className="input" required autoFocus
                    type="text"
                    value={hike.distance}
                    name="distance"
                    onChange={changeHikeState} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicDescription">
                <Form.Label className="profile_edit">Location:</Form.Label>
                <Form.Control required autoFocus
                    as="textarea" rows={2}
                    value={hike.artist_location}
                    name="location"
                    onChange={changeHikeState} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicDescription">
                <Form.Label className="profile_edit">Estimated Length:</Form.Label>
                <Form.Control required autoFocus
                    as="textarea" rows={2}
                    value={hike.estimated_length}
                    name="estimated_length"
                    onChange={changeHikeState} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicDescription">
                <Form.Label className="profile_edit">Description:</Form.Label>
                <Form.Control required autoFocus
                    as="textarea" rows={2}
                    value={hike.description}
                    name="description"
                    onChange={changeHikeState} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicURL">
                <Form.Label className="profile_edit">Hike Image (URL):</Form.Label>
                <Form.Control className="input" required autoFocus
                    type="text"
                    value={hike.hike_image_url}
                    name="hike_image_url"
                    onChange={changeHikeState} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicStage">
                    <Form.Label className="profile_edit">Skill Level: </Form.Label>
                    <Form.Select className="form-control" name="hike_skill_level" value={hike.hike_skill_level?.id} required onChange={changeHikeState}>
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

            <Button type="submit"
                onClick={handleSubmit} //when save is clicked the handleSubmit function is triggered
                className="button is-success">
                Save
            </Button>
            {/* when cancel is clicked it navigates the user back to the artist list */}
            <Button onClick={() => navigate("/hikeList")}>Cancel</Button>
        </Form>
    </>
}

// import { useEffect, useState } from "react"
// import { useNavigate, useParams } from "react-router"
// import { getSingleHike, updateHike } from "../../managers/HikeManager"
// import { getAllHikeSkillLevels } from "../../managers/SkillLevelManager"
// import Form from 'react-bootstrap/Form'
// import Button from 'react-bootstrap/Button';



// export const HikeEdit = () => {
//     const [skillLevels, setSkillLevels] = useState()
//     // assigning hike state to an object of key value pairs that are all set to empty strings
//     const [hike, setHike] = useState({
//         name: "",
//         distance: "",
//         location: "",
//         estimated_length: "",
//         description: "",
//         hike_image_url: "",
//         skillLevelId: 0
//     })

//     /* invoking useParams and assigning its return value to hikeId. This hook returns an object of 
//     key/value pairs of the dynamic params from the current URL that were matched by the <Route path>*/
//     const { hikeId } = useParams()
//     //invoking use navigate and assigning its return value to navigate so that we can navigate through our application programatically
//     const navigate = useNavigate()

    
//     /*getting the singleHike from the HikeManager.js file by the hikeId param and 
//     setting that data into the hike state*/
//     useEffect(() => {
//         getSingleHike().then(data => setHike(data))
//     }, [hikeId])

//     useEffect(() => {
//         getAllHikeSkillLevels().then(data => setSkillLevels(data))
//     }, [])

//     //handles submission of a hike edit
//     const handleSubmit = (evt) => {
//         evt.preventDefault() //preventing the browser from reload/refreshing 
//         //invoking the PUT method in the HikeManager.js file and navigating back to the hike list
//         updateHike(hikeId, hike).then((data) => {
//             navigate(`hikeList`)
//         })
//     }

//     //function to change copy of the initial hike state and set the new hike value to the state
//     const changeHikeState = (event) => {
//         const hikeCopy = { ...hike } //creating a copy of the hike state
//         hikeCopy[event.target.name] = event.target.value
//         setHike(hikeCopy)
//     }
//     return <>
//         <Form>
//             <h2 className="showForm_title">Update Hike</h2>
//             <Form.Group className="mb-3" controlId="formBasicHike">
//                 <Form.Label className="profile_edit">Hike Name:</Form.Label>
//                 <Form.Control className="input" required autoFocus
//                     type="text"
//                     value={hike.name}
//                     name="name"
//                     //When the value changes the changeHikeState function is triggered
//                     onChange={changeHikeState} />
//             </Form.Group>

//             <Form.Group className="mb-3" controlId="formBasicHike">
//                 <Form.Label className="profile_edit">Distance:</Form.Label>
//                 <Form.Control className="input" required autoFocus
//                     type="number"
//                     value={hike.distance}
//                     name="distance"
//                     //When the value changes the changeHikeState function is triggered
//                     onChange={changeHikeState} />
//             </Form.Group>

//             <Form.Group className="mb-3" controlId="formBasicHike">
//                 <Form.Label className="profile_edit">Location:</Form.Label>
//                 <Form.Control className="input" required autoFocus
//                     type="text"
//                     value={hike.location}
//                     name="location"
//                     //When the value changes the changeHikeState function is triggered
//                     onChange={changeHikeState} />
//             </Form.Group>

//             <Form.Group className="mb-3" controlId="formBasicHike">
//                 <Form.Label className="profile_edit">Estimated_length:</Form.Label>
//                 <Form.Control className="input" required autoFocus
//                     type="number"
//                     value={hike.estimated_length}
//                     name="estimated_length"
//                     //When the value changes the changeHikeState function is triggered
//                     onChange={changeHikeState} />
//             </Form.Group>

//             <Form.Group className="mb-3" controlId="formBasicHike">
//                 <Form.Label className="profile_edit">Description:</Form.Label>
//                 <Form.Control className="input" required autoFocus
//                     type="text"
//                     value={hike.description}
//                     name="description"
//                     //When the value changes the changeHikeState function is triggered
//                     onChange={changeHikeState} />
//             </Form.Group>

//             <Form.Group className="mb-3" controlId="formBasicHike">
//                 <Form.Label className="profile_edit">Hike Image URL:</Form.Label>
//                 <Form.Control className="input" required autoFocus
//                     type="text"
//                     value={hike.hike_image_url}
//                     name="hike_image_url"
//                     //When the value changes the changeHikeState function is triggered
//                     onChange={changeHikeState} />
//             </Form.Group>

//             <fieldset>
//                 <div>
//                 <label className="profile_edit" htmlFor="skillLevelId">Skill Level: </label>
//                     <select className="form-control" name="skillLevel" value={hike.hike_skill_level?.id} required onChange={changeHikeState}>
//                     <option value="0">Choose Skill Level</option>
//                     {/* mapping through the skillLevels to display as a drop down menu */}
//                     {
//                         skillLevels.map(skillLevel => {
//                             return <option value={skillLevel.id} key={`skillLevel--${skillLevel.id}`}>{skillLevel.level}</option>
//                         })
//                     }
//                     </select>
//                 </div>
//             </fieldset>
            
//             <Button type="submit"
//                 onClick={handleSubmit}
//                 className="button is-success">
//                     Save
//                 </Button>
//                 <Button onCLick={()=> navigate("/hikeList")}>Cancel</Button>
//         </Form>
//     </>
// }
