import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getAllCategories } from "../../managers/CategoryManager"
import { createPost } from "../../managers/PostManager"
import { getSingleProfile } from "../../managers/ProfileManager"
import { getAllHikeSkillLevels } from "../../managers/SkillLevelManager"
import { getAllTags } from "../../managers/TagManager"




// import { useEffect, useState } from "react"
// import { useNavigate } from "react-router-dom"

// export const HikeForm = () => {
//     //invoking useNavigate and assigning its return value to a variable 
//     const navigate = useNavigate()

//     //set initial hike state (updateHike is the function that changes the state.)
//     const [hike, addHike] = useState({
//         name: "",
//         distance: "",
//         location: "",
//         estimated_length:"",
//         description: "",
//         completed: false,
//         bucket_list: false,
//         hike_image_url:"",
//         activity: 0,
//         hike_skill_level: 0,
//         tags: "",
//     })


//     const [skillLevels, setSkillLevels] = useState([])


//     // get summitUser out of local storage
//     const localSummitUser = localStorage.getItem("summit_user")
//     const summitUserObject = JSON.parse(localSummitUser)
//     const userId = summitUserObject



//     useEffect(() => {
//         fetch(`http://localhost:8088/skillLevels`)
//             .then((response) => response.json())
//             .then((skillLevelArray) => {
//                 setSkillLevels(skillLevelArray)
//             })
//     },
//         []
//     )

//     const handleSaveButtonClick = (event) => {
//         event.preventDefault()

//         //create an object to be saved to the API 
//         const hikeToSendToAPI = {
//             name: hike.name,
//             location: hike.location,
//             distance: parseFloat(hike.distance, 2),
//             description: hike.description,
//             attractions: hike.attractions,
//             skillLevelId: parseInt(hike.skillLevelId),
//             completed: hike.completed,
//             bucketList: hike.bucketList,
//             scheduleDate: hike.scheduleDate,
//             userId: userId.id,
//             url: hike.url
//         }
//         //Perform the fetch() to POST the object to the API
//         //copied the url of the hikes from the API, second argument is to fetch is options, that is in the {} after the url, added method of POST with the header, for body, turned the object hikeToSendToApi into a string. When JSON serve response the user will be directed back to the ticket page via navigate("/hikes)")
//         //Post request to JSON server, when completed, navigate user back to session list - route found in application views.js

//         return fetch(`http://localhost:8088/hikes`, {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify(hikeToSendToAPI),
//         })
//             .then((response) => response.json())
//             .then(() => {
//                 navigate("/hikes"); //same as shown in application views
//             })
//     };

//     // onChange event will update the hike properties when changed.  updating state each time it is changed and it will update the copy and property listed. in the callback function in the onChange, parameter of event, and set a target. 
//     // Then calling the update function to change the new state
//     // added onclick to the submit button, passed clickEvent into the argument for the handleSaveButtonFunction
//     return (
//         <form className="hikeForm">
//             <h2 className="newHike">New Hike</h2>
//             <fieldset>
//                 <div className="form_group" key={hike.id}>
//                     <label htmlFor="Name"><b>Name:</b></label>
//                     <input
//                         required autoFocus
//                         type="text"
//                         className="form-control"
//                         placeholder="Hike Name"
//                         value={hike.name}
//                         onChange={
//                             (event) => {
//                                 const copy = { ...hike }
//                                 copy.name = event.target.value
//                                 addHike(copy)
//                             }}
//                     />
//                 </div>
//             </fieldset>

//             <fieldset>
//                 <div className="form_group" key={hike.id}>
//                     <label htmlFor="Name"><b>Location:</b></label>
//                     <input
//                         required 
//                         type="text"
//                         className="form-control"
//                         placeholder="Hike Location"
//                         value={hike.location}
//                         onChange={
//                             (event) => {
//                                 const copy = { ...hike }
//                                 copy.location = event.target.value
//                                 addHike(copy)
//                             }}
//                     />
//                 </div>
//             </fieldset>

//             <fieldset>
//                 <div className="form_group" key={hike.id}>
//                     <label htmlFor="Name"><b>Distance(miles):</b></label>
//                     <input
//                         required 
//                         type="number"
//                         className="form-control"
//                         placeholder="Hike Distance"
//                         value={hike.distance}
//                         onChange={
//                             (event) => {
//                                 const copy = { ...hike }
//                                 copy.distance = parseFloat(event.target.value, 2)
//                                 addHike(copy)
//                             }}
//                     />
//                 </div>
//             </fieldset>

//             <fieldset>
//                 <div className="form_group" key={hike.id}>
//                     <label htmlFor="description"><b>Description:</b></label>
//                     <input
//                         required 
//                         type="text"
//                         className="form-control"
//                         placeholder="Hike Description"
//                         value={hike.description}
//                         onChange={
//                             (event) => {
//                                 const copy = { ...hike }
//                                 copy.description = event.target.value
//                                 addHike(copy)
//                             }
//                         } />
//                 </div>
//             </fieldset>
//             <fieldset>
//                 <div className="form_group" key={hike.id}>
//                     <label htmlFor="attractions"><b>Attractions:</b></label>
//                     <input
//                         required 
//                         type="text"
//                         className="form-control"
//                         placeholder="Hike Attractions"
//                         value={hike.attractions}
//                         onChange={
//                             (event) => {
//                                 const copy = { ...hike }
//                                 copy.attractions = event.target.value
//                                 addHike(copy)
//                             }
//                         } />
//                 </div>
//             </fieldset>
//             <fieldset>
//                 <div className="form_group" key={hike.id}>
//                     <label htmlFor="skillLevel"><b>Skill Level:</b></label>
//                     <select
//                         onChange={(evt) => {
//                             const copy = { ...hike }; //created a copy of existing state
//                             copy.skillLevelId = parseInt(evt.target.value) //to modify
//                             addHike(copy)
//                         }}
//                     >
//                         <option key={0}>Select Skill Level</option>
//                         {
//                             skillLevels.map((skillLevel) => {
//                                 return <option key={skillLevel.id} value={skillLevel.id}>{skillLevel.level}</option>
//                             })}
//                     </select>
//                 </div>
//             </fieldset>
//             <fieldset>
//                 <div className="boolean" key={hike.id}>
//                     <span><b>Completed:</b></span>
//                     <input type="radio" className="boolean"
//                         name="completed" value={true}
//                         onChange={
//                             (event) => {
//                                 const copy = { ...hike }
//                                 copy.completed = true
//                                 addHike(copy)
//                             }} />
//                     <label htmlFor="yes">True</label>
//                     <input type="radio" className="boolean"
//                         name="completed" value={false} 
//                         onChange={
//                             (event) => {
//                                 const copy = { ...hike }
//                                 copy.completed = false
//                                 addHike(copy)
//                             }} />
//                     <label htmlFor="false">False</label>
//                 </div>
//             </fieldset>
//             <fieldset>
//                 <div className="boolean" key={hike.id}>
//                     <span><b>Bucket List:</b></span>
//                     <input type="radio" className="boolean"
//                         name="bucketList" value={true}
//                         onChange={
//                             (event) => {
//                                 const copy = { ...hike }
//                                 copy.bucketList = true
//                                 addHike(copy)
//                             }} />
//                     <label htmlFor="true">True</label>
//                     <input type="radio" className="boolean"
//                         name="bucketList" value={false} onChange={
//                             (event) => {
//                                 const copy = { ...hike }
//                                 copy.bucketList = false
//                                 addHike(copy)
//                             }} />
//                     <label htmlFor="false">False</label>
//                 </div>
//             </fieldset>
//             <fieldset>
//                 <div className="form_group" key={hike.id}>
//                     <label className="label" htmlFor="description"><b>Photo URL:</b></label>
//                     <input
//                         required 
//                         type="text"
//                         className="form-control-site"
//                         placeholder="Insert Photo of Hike"
//                         value={hike.url}
//                         onChange={
//                             (event) => {
//                                 const copy = { ...hike }
//                                 copy.url = event.target.value
//                                 addHike(copy)
//                             }
//                         } />
//                 </div>
//             </fieldset>
//             <button onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
//                 className="hikeAlterButton">
//                 Submit Hike
//             </button>

//             <button className="hikeAlterButton" onClick={() => navigate("/hikes")}>Cancel</button>
//         </form >
//     )

// }