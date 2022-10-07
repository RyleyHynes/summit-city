import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { createMyHike } from "../managers/MyHikeManager"
import { deleteHike } from "../managers/HikeManager"
import { getAllHikes } from "../managers/HikeManager"
import "./List.css"

export const HikeList = ({ setStaff }) => {
    //setting up initial state for shows
    const [hikes, setHikes] = useState([])
    //setting up initial state for addShow and setting it to false
    const [addHike, setAddHike] = useState(false)
    //setting up initial state for staff
    const [staff, setStaffState] = useState()
    const [searchTerms, setSearchTerms] = useState("")
    const [filteredHikes, setFilteredHikes] = useState([])

    /*Invoking useNavigate and assigning it to navigate so that we can navigate our application programmatically*/
    const navigate = useNavigate()

    //function to get the friday schedule and set it into shows state
    const getCurrentHikeList = () => {
        getAllHikes().then(data => setHikes(data))
    }

    //observing the user in local storage and the boolean on is_staff 
    useEffect(() => {
        setStaffState(localStorage.getItem("is_staff"))
    }, [setStaff])

    //observing and invoking the getCurrentFridaySchedule
    useEffect(() => {
        getCurrentHikeList()
    }, [])

    useEffect(
        () => {
            if (searchTerms !== "") {
                getAllHikes(searchTerms).then(data => setFilteredHikes(data[0].hikes))
            }
            else {
                setFilteredHikes(hikes)
            }
        },
        [searchTerms, hikes]
    )
    //function to add show to users custom lineup
    const handleAddHike = (evt) => {
        evt.preventDefault() //preventing browser reload/refresh
        const hike = { hike_id: evt.target.id }
        setAddHike(evt.target.id)
        createMyHike(hike).then((data) => {
            setAddHike(data)
        })

    }


    return (
        <>
            <h2 className="showForm_title">Hike List</h2>
            {/* if the user is staff they will have the option to add a new show*/}
            <div className="topButtons">
                {
                    (staff === "true")
                        ?
                        <>
                            <button className="dayButtons" onClick={() => navigate("/addHikeForm")}>Add Show</button>
                        </>
                        :
                        <>

                        </>
                }
                {/* buttons to toggle between friday and saturdays schedule */}
                <button className="dayButtons" onClick={() => navigate("/fridaySchedule")}>Friday</button>
                <button className="dayButtons" onClick={() => navigate("/saturdaySchedule")}>Saturday</button>
                <input
                    className="input search mx-4"
                    type="text"
                    placeholder="Search Items"
                    onChange={
                        (changeEvent) => {
                            let search = changeEvent.target.value
                            setSearchTerms(search)
                        }
                    }
                />
            </div>
            <article>
                <ul className="hikeContainer">
                    {/* mapping through each hike and displaying its information */}
                    {filteredHikes.map((hike) => {
                        return (
                            <div className="individualHike" key={`hike-${hike.id}`}>
                                <section className="hikeList" key={`hike-${hike.id}`}>
                                    <div className="imageContainer">
                                        <img className="hikePicture" src={hike?.hike_image_url} alt='hike'></img>
                                    </div>
                                    <div className="textContainer">
                                        <div className="hikeInfo"><b>Name:</b>{hike?.name}</div>
                                        <div className="hikeInfo"><b>Distance:</b>{hike?.distance}</div>
                                        <div className="hikeInfo"><b>Estimated Length:</b>{hike?.estimated_length}</div>
                                        <div className="hikeInfo"><b>Description:</b>{hike?.description}</div>
                                        <div className="hikeInfo"><b>Hike Skill Level:</b>{hike?.hike_skill_level.level}</div>
                                    </div>
                                </section>
                                <section className="bottomButtons">
                                    <button className="alterButton" id={hike.id} onClick={handleAddHike}>Add to MyLineup</button>

                                    {/* if the user is staff they will have the option to edit or delete a hike */}

                                    {
                                        (staff === "true")
                                            ?
                                            <>
                                                <button className="alterButton" onClick={() => navigate(`/hikes/${hike.id}/edit`)}>edit</button>
                                                <button className="alterButton" onClick={(evt) => {
                                                    evt.preventDefault()
                                                    deleteHike(hike.id).then(getCurrentHikeList)
                                                }}>Delete</button>
                                            </>
                                            :
                                            <>

                                            </>
                                    }
                                </section>
                            </div>
                        )
                    })}
                </ul>
            </article>
        </>
    )

}





// import { useEffect, useState } from "react"
// import { useNavigate } from "react-router-dom"
// import { deleteHike, getHikes, getSearchHikes } from "../managers/HikeManager"
// // import "./List.css"

// //function to list off the hikes that has a prop of seStaff
// export const HikeList = ({ searchTermState }) => {
//     //setting initial state of hike to an empty array
//     const [hikes, setHikes] = useState([])
//     //setting initial state of staff
//     const [staff, setStaffState] = useState()
//     const [searchTerms, setSearchTerms] = useState("")
//     const [filteredHikes, setFilteredHikes] = useState([])
//     const [completedHikes, setCompletedHikes] = useState(false)
//     const [bucketListHikes, setBucketListHikes] = useState(false)

//     /*Invoking useNavigate and assigning it to navigate so that we can navigate our application programmatically*/
//     const navigate = useNavigate()

//     //getting the is_staff property out of local storage for the current user and setting it to the staff state
//     useEffect(() => {
//         setStaffState(localStorage.getItem("is_staff"))
//     }, [])

//     //getting the hikes from the HikesManager.js file and setting that data into the hikes state
//     useEffect(() => {
//         getHikes().then(data => setHikes(data))
//     }, [])


//     useEffect(
//         () => {
//             if (searchTerms !== "") {
//                 getSearchHikes(searchTerms).then(data => setFilteredHikes(data))
//             }
//             else {
//                 setFilteredHikes(hikes)
//             }
//         },
//         [searchTerms, hikes]
//     )

//     useEffect(
//         () => {
//             if (completedHikes) {
//                 const completedHikes = hikes.filter(hike => hike.completed === true)
//                 setFilteredHikes(completedHikes)
//             }
//             else {
//                 setFilteredHikes(hikes)
//             }
//         },
//         [completedHikes]
//     )


//     useEffect(
//         () => {
//             if (bucketListHikes) {
//                 const bucketListHikes = hikes.filter(hike => hike.bucketList === true)
//                 setFilteredHikes(bucketListHikes)
//             }
//             else {
//                 setFilteredHikes(hikes)
//             }
//         },
//         [bucketListHikes]
//     )

//     //Displaying the HTML for the hikes that will be listed out
//     return (
//         <>
//             <div>
//                 <button className="hikeAlterButton" onClick={
//                     () => {
//                         setBucketListHikes(false)
//                         setCompletedHikes(false)
//                     }
//                 }>Hike All Hikes</button>
//                 <button className="hikeAlterButton" onClick={
//                     () => {
//                         setCompletedHikes(true)
//                     }
//                 }>Completed Hikes</button>
//                 <button className="hikeAlterButton" onClick={
//                     () => {
//                         setBucketListHikes(true)
//                     }
//                 }>Bucket List Hikes</button>
//             </div>
//             <h2 className="showForm_title">Hikes</h2>
//             {/* if the user is staff they will be able to see a button that will bring them to the add hike form */}
//             <div className="topButtons">
//                 {
//                     (staff === "true")
//                         ?
//                         <>
//                             <button className="dayButtons" onClick={() => navigate("/addHikeForm")}>Add Hike</button>
//                         </>
//                         :
//                         <>

//                         </>
//                 }
//                 <input
//                     className="input search mx-4"
//                     type="text"
//                     placeholder="Search Items"
//                     onChange={
//                         (changeEvent) => {
//                             let search = changeEvent.target.value
//                             setSearchTerms(search)
//                         }
//                     }
//                 />
//             </div>
//             <article>
//                 <ul className="showContainer">
//                     {/* mapping through each hike to get their image, name, genre, and description */}
//                     {filteredHikes.map((hike) => {
//                         return (
//                             <div className="individualShow" key={`hike-${hike.id}`}>
//                                 <section className="showList" key={`hike-${hike.id}`}>
//                                     <div className="imageContainer">
//                                         <img className="showPicture" src={hike?.hike_image_url} alt='show'></img>
//                                     </div>
//                                     <div className="textContainer">
//                                         <div className="showInfo"><b>Hike Name: </b>{hike.name}</div>
//                                         <div className="showInfo"><b>Skill Level: </b>{hike?.hike_skill_level?.level}</div>
//                                         <div className="showInfo"><b>Distance: </b>{hike?.distance}</div>
//                                         <div className="showInfo"><b>Estimated Length: </b>{hike.estimated_length}</div>
//                                         <div className="showInfo"><b>Location: </b>{hike.location}</div>
//                                         <div className="showInfo"><b>Description: </b>{hike.description}</div>
//                                         <div className="showInfo"><b>Completed: </b>{hike.completed}</div>
//                                         <div className="showInfo"><b>Bucket List: </b>{hike.bucket_list}</div>
//                                     </div>
//                                 </section>
//                                 <section className="bottomButtons">
//                                     {/* if the user is staff they will have the option to edit or delete each hike */}
//                                     {
//                                         (staff === "true")
//                                             ?
//                                             <>
//                                                 <button className="alterButton" onClick={() => navigate(`/hikes/${hike.id}/edit`)}>Edit</button>
//                                                 <button className="alterButton" onClick={() => {
//                                                     deleteHike(hike.id).then(() => { getHikes().then(setHikes) })
//                                                 }}>Delete</button>
//                                             </>
//                                             :
//                                             <>

//                                             </>
//                                     }
//                                 </section>
//                             </div>
//                         )
//                     })}
//                 </ul>
//             </article>
//         </>
//     )
// }
