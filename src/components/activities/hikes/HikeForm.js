// import { useEffect, useState } from "react"
// import { useNavigate } from "react-router-dom"
// import { createNewHike } from "../../managers/HikeManager"
// import { getAllHikeSkillLevels } from "../managers/SkillLevelManager"
// import { getAllTags } from "../managers/TagManager"
// import Button from 'react-bootstrap/Button';



// export const HikeForm = () => {
//     const navigate = useNavigate()

//     const [tags, setTags] = useState([])
//     const [skillLevels, setSkillLevels] = useState([])
//     /*
//         Since the input fields are bound to the values of 
//         the properties of this state variable, you need
//         to provide some default values.
//      */
//     const [hike, setHike] = useState({
//         name: "",
//         distance: "",
//         location: "",
//         estimated_length: "",
//         description: "",
//         hike_image_url: "",
//         hike_skill_level: 0
//     })
//     const [tagsForPost, setTagsForPost] = useState([])


//     useEffect(() => {
//         getAllTags().then(tagsData => setTags(tagsData))
//         getAllHikeSkillLevels().then(skillLevelData => setSkillLevels(skillLevelData))
//     }, [])

//     const updateTag = (tagId) => {
//         let tagsCopy = [...tagsForPost]
//         const index = tagsCopy.indexOf(tagId)
//         if (index < 0) {
//             tagsCopy.push(tagId)
//         } else {
//             tagsCopy.splice(index, 1)
//         }
//         setTagsForPost(tagsCopy)
//     }

//         const changeHikeState = (event) => {
//             const newHike = { ...hike }
//             newHike[event.target.name] = event.target.value
//             setHike(newHike)
//         }

//         return (
//             <form className="hikeForm">
//                 <h2 className="hikeForm__title">Register New Hike</h2>
//                 <fieldset>
//                     <div className="form-group">
//                         <label htmlFor="name">Name: </label>
//                         <input type="text" name="name" required autoFocus className="form-control"
//                             value={hike.name}
//                             onChange={changeHikeState} />
//                     </div>
//                 </fieldset>

//                 <fieldset>
//                     <div className="form-group">
//                         <label htmlFor="name">Distance: </label>
//                         <input type="number" name="distance" required autoFocus className="form-control"
//                             value={hike.distance}
//                             onChange={changeHikeState} />
//                     </div>
//                 </fieldset>

//                 <fieldset>
//                     <div className="form-group">
//                         <label htmlFor="name">Location: </label>
//                         <input type="text" name="location" required autoFocus className="form-control"
//                             value={hike.location}
//                             onChange={changeHikeState} />
//                     </div>
//                 </fieldset>

//                 <fieldset>
//                     <div className="form-group">
//                         <label htmlFor="name">Estimated Length: </label>
//                         <input type="number" name="estimated_length" required autoFocus className="form-control"
//                             value={hike.estimated_length}
//                             onChange={changeHikeState} />
//                     </div>
//                 </fieldset>

//                 <fieldset>
//                     <div className="form-group">
//                         <label htmlFor="name">Description: </label>
//                         <input type="text" name="description" required autoFocus className="form-control"
//                             value={hike.description}
//                             onChange={changeHikeState} />
//                     </div>
//                 </fieldset>

//                 <fieldset>
//                     <div className="form-group">
//                         <label htmlFor="name">Hike Image URL: </label>
//                         <input type="text" name="hike_image_url" required autoFocus className="form-control"
//                             value={hike.hike_image_url}
//                             onChange={changeHikeState} />
//                     </div>
//                 </fieldset>

//                 <fieldset>
//                     <div>
//                         <label className="profile_edit" htmlFor="skillLevelId">Skill Level: </label>
//                         <select className="form-control" name="skillLevel" value={hike.hike_skill_level?.id} required onChange={changeHikeState}>
//                             <option value="0">Choose Skill Level</option>
//                             {/* mapping through the skillLevels to display as a drop down menu */}
//                             {
//                                 skillLevels.map(skillLevel => {
//                                     return <option value={skillLevel.id} key={`skillLevel--${skillLevel.id}`}>{skillLevel.level}</option>
//                                 })
//                             }
//                         </select>
//                     </div>
//                 </fieldset>

//                 <div className="field">
//                     <label htmlFor="content" className="label">Tags: </label>
//                     {
//                         tags.map(tag => {
//                             return (
//                                 <div className="field" key={`tag--${tag.id}`}>
//                                     <div className="control">
//                                         <label className="checkbox" htmlFor={tag.label}>
//                                             <input type="checkbox" name={tag.label}
//                                                 checked={tagsForPost.includes(tag.id)}
//                                                 onChange={() => {
//                                                     updateTag(tag.id)
//                                                 }} />
//                                             {tag.label}
//                                         </label>
//                                     </div>
//                                 </div>
//                             )
//                         })

//                     }
//                 </div>

//                 <Button variant="primary" type="submit" onClick={event => {
//                     event.preventDefault() //preventing browser reload/refresh
//                     //show object to be sent to the API
//                     const newHike = {
//                         name: hike.name,
//                         distance: hike.distance,
//                         location: hike.location,
//                         estimated_length: hike.estimated_length,
//                         description: hike.description,
//                         hikeImageUrl: hike.hike_image_url,
//                         hikeSkillLevel: parseInt(hike.hike_skill_level),
//                         tags: parseInt(hike.tag)
//                     }
//                     /*Invoking the POST method with the hike object and then navigating to fridaysSchedule*/
//                     createNewHike(newHike)
//                         .then(() => navigate("/hikeList"))
//                 }}
//                     className="btn btn-primary">Create Hike</Button>
//                 {/* when cancel is clicked it navigates the user back to the friday schedule */}
//                 <Button onClick={() => navigate("/hikeList")}>Cancel</Button>
//             </form>
//         )


//     }


// // import { useEffect, useState } from "react"
// // import { useNavigate } from "react-router-dom"

// // export const HikeForm = () => {
// //     //invoking useNavigate and assigning its return value to a variable 
// //     const navigate = useNavigate()

// //     //set initial hike state (updateHike is the function that changes the state.)
// //     const [hike, addHike] = useState({
// //         name: "",
// //         distance: "",
// //         location: "",
// //         estimated_length:"",
// //         description: "",
// //         completed: false,
// //         bucket_list: false,
// //         hike_image_url:"",
// //         activity: 0,
// //         hike_skill_level: 0,
// //         tags: "",
// //     })


// //     const [skillLevels, setSkillLevels] = useState([])


// //     // get summitUser out of local storage
// //     const localSummitUser = localStorage.getItem("summit_user")
// //     const summitUserObject = JSON.parse(localSummitUser)
// //     const userId = summitUserObject



// //     useEffect(() => {
// //         fetch(`http://localhost:8088/skillLevels`)
// //             .then((response) => response.json())
// //             .then((skillLevelArray) => {
// //                 setSkillLevels(skillLevelArray)
// //             })
// //     },
// //         []
// //     )

// //     const handleSaveButtonClick = (event) => {
// //         event.preventDefault()

// //         //create an object to be saved to the API 
// //         const hikeToSendToAPI = {
// //             name: hike.name,
// //             location: hike.location,
// //             distance: parseFloat(hike.distance, 2),
// //             description: hike.description,
// //             attractions: hike.attractions,
// //             skillLevelId: parseInt(hike.skillLevelId),
// //             completed: hike.completed,
// //             bucketList: hike.bucketList,
// //             scheduleDate: hike.scheduleDate,
// //             userId: userId.id,
// //             url: hike.url
// //         }
// //         //Perform the fetch() to POST the object to the API
// //         //copied the url of the hikes from the API, second argument is to fetch is options, that is in the {} after the url, added method of POST with the header, for body, turned the object hikeToSendToApi into a string. When JSON serve response the user will be directed back to the ticket page via navigate("/hikes)")
// //         //Post request to JSON server, when completed, navigate user back to session list - route found in application views.js

// //         return fetch(`http://localhost:8088/hikes`, {
// //             method: "POST",
// //             headers: {
// //                 "Content-Type": "application/json",
// //             },
// //             body: JSON.stringify(hikeToSendToAPI),
// //         })
// //             .then((response) => response.json())
// //             .then(() => {
// //                 navigate("/hikes"); //same as shown in application views
// //             })
// //     };

// //     // onChange event will update the hike properties when changed.  updating state each time it is changed and it will update the copy and property listed. in the callback function in the onChange, parameter of event, and set a target. 
// //     // Then calling the update function to change the new state
// //     // added onclick to the submit button, passed clickEvent into the argument for the handleSaveButtonFunction
// //     return (
// //         <form className="hikeForm">
// //             <h2 className="newHike">New Hike</h2>
// //             <fieldset>
// //                 <div className="form_group" key={hike.id}>
// //                     <label htmlFor="Name"><b>Name:</b></label>
// //                     <input
// //                         required autoFocus
// //                         type="text"
// //                         className="form-control"
// //                         placeholder="Hike Name"
// //                         value={hike.name}
// //                         onChange={
// //                             (event) => {
// //                                 const copy = { ...hike }
// //                                 copy.name = event.target.value
// //                                 addHike(copy)
// //                             }}
// //                     />
// //                 </div>
// //             </fieldset>

// //             <fieldset>
// //                 <div className="form_group" key={hike.id}>
// //                     <label htmlFor="Name"><b>Location:</b></label>
// //                     <input
// //                         required 
// //                         type="text"
// //                         className="form-control"
// //                         placeholder="Hike Location"
// //                         value={hike.location}
// //                         onChange={
// //                             (event) => {
// //                                 const copy = { ...hike }
// //                                 copy.location = event.target.value
// //                                 addHike(copy)
// //                             }}
// //                     />
// //                 </div>
// //             </fieldset>

// //             <fieldset>
// //                 <div className="form_group" key={hike.id}>
// //                     <label htmlFor="Name"><b>Distance(miles):</b></label>
// //                     <input
// //                         required 
// //                         type="number"
// //                         className="form-control"
// //                         placeholder="Hike Distance"
// //                         value={hike.distance}
// //                         onChange={
// //                             (event) => {
// //                                 const copy = { ...hike }
// //                                 copy.distance = parseFloat(event.target.value, 2)
// //                                 addHike(copy)
// //                             }}
// //                     />
// //                 </div>
// //             </fieldset>

// //             <fieldset>
// //                 <div className="form_group" key={hike.id}>
// //                     <label htmlFor="description"><b>Description:</b></label>
// //                     <input
// //                         required 
// //                         type="text"
// //                         className="form-control"
// //                         placeholder="Hike Description"
// //                         value={hike.description}
// //                         onChange={
// //                             (event) => {
// //                                 const copy = { ...hike }
// //                                 copy.description = event.target.value
// //                                 addHike(copy)
// //                             }
// //                         } />
// //                 </div>
// //             </fieldset>
// //             <fieldset>
// //                 <div className="form_group" key={hike.id}>
// //                     <label htmlFor="attractions"><b>Attractions:</b></label>
// //                     <input
// //                         required 
// //                         type="text"
// //                         className="form-control"
// //                         placeholder="Hike Attractions"
// //                         value={hike.attractions}
// //                         onChange={
// //                             (event) => {
// //                                 const copy = { ...hike }
// //                                 copy.attractions = event.target.value
// //                                 addHike(copy)
// //                             }
// //                         } />
// //                 </div>
// //             </fieldset>
// //             <fieldset>
// //                 <div className="form_group" key={hike.id}>
// //                     <label htmlFor="skillLevel"><b>Skill Level:</b></label>
// //                     <select
// //                         onChange={(evt) => {
// //                             const copy = { ...hike }; //created a copy of existing state
// //                             copy.skillLevelId = parseInt(evt.target.value) //to modify
// //                             addHike(copy)
// //                         }}
// //                     >
// //                         <option key={0}>Select Skill Level</option>
// //                         {
// //                             skillLevels.map((skillLevel) => {
// //                                 return <option key={skillLevel.id} value={skillLevel.id}>{skillLevel.level}</option>
// //                             })}
// //                     </select>
// //                 </div>
// //             </fieldset>
// //             <fieldset>
// //                 <div className="boolean" key={hike.id}>
// //                     <span><b>Completed:</b></span>
// //                     <input type="radio" className="boolean"
// //                         name="completed" value={true}
// //                         onChange={
// //                             (event) => {
// //                                 const copy = { ...hike }
// //                                 copy.completed = true
// //                                 addHike(copy)
// //                             }} />
// //                     <label htmlFor="yes">True</label>
// //                     <input type="radio" className="boolean"
// //                         name="completed" value={false} 
// //                         onChange={
// //                             (event) => {
// //                                 const copy = { ...hike }
// //                                 copy.completed = false
// //                                 addHike(copy)
// //                             }} />
// //                     <label htmlFor="false">False</label>
// //                 </div>
// //             </fieldset>
// //             <fieldset>
// //                 <div className="boolean" key={hike.id}>
// //                     <span><b>Bucket List:</b></span>
// //                     <input type="radio" className="boolean"
// //                         name="bucketList" value={true}
// //                         onChange={
// //                             (event) => {
// //                                 const copy = { ...hike }
// //                                 copy.bucketList = true
// //                                 addHike(copy)
// //                             }} />
// //                     <label htmlFor="true">True</label>
// //                     <input type="radio" className="boolean"
// //                         name="bucketList" value={false} onChange={
// //                             (event) => {
// //                                 const copy = { ...hike }
// //                                 copy.bucketList = false
// //                                 addHike(copy)
// //                             }} />
// //                     <label htmlFor="false">False</label>
// //                 </div>
// //             </fieldset>
// //             <fieldset>
// //                 <div className="form_group" key={hike.id}>
// //                     <label className="label" htmlFor="description"><b>Photo URL:</b></label>
// //                     <input
// //                         required 
// //                         type="text"
// //                         className="form-control-site"
// //                         placeholder="Insert Photo of Hike"
// //                         value={hike.url}
// //                         onChange={
// //                             (event) => {
// //                                 const copy = { ...hike }
// //                                 copy.url = event.target.value
// //                                 addHike(copy)
// //                             }
// //                         } />
// //                 </div>
// //             </fieldset>
// //             <button onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
// //                 className="hikeAlterButton">
// //                 Submit Hike
// //             </button>

// //             <button className="hikeAlterButton" onClick={() => navigate("/hikes")}>Cancel</button>
// //         </form >
// //     )

// // }