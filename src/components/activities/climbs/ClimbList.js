import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { createMyClimb } from "../../managers/MyClimbManager"
import { deleteClimb, getSearchClimbs } from "../../managers/ClimbManager"
import { getAllClimbs } from "../../managers/ClimbManager"
import "./List.css"



export const ClimbList = ({ setStaff }) => {
    //setting up initial state for climbs
    const [climbs, setClimbs] = useState([])
    //setting up initial state for addClimb and setting it to false
    const [addClimb, setAddClimb] = useState(false)
    //setting up initial state for staff
    const [staff, setStaffState] = useState()
    const [searchTerms, setSearchTerms] = useState("")
    const [filteredClimbs, setFilteredClimbs] = useState([])

    /*Invoking useNavigate and assigning it to navigate so that we can navigate our application programmatically*/
    const navigate = useNavigate()

    //function to get the climb list and set it into climbs state
    const getCurrentClimbList = () => {
        getAllClimbs().then(data => setClimbs(data))
    }

    //observing the user in local storage and the boolean on is_staff 
    useEffect(() => {
        setStaffState(localStorage.getItem("is_staff"))
    }, [setStaff])

    //observing and invoking the getCurrentClimbList
    useEffect(() => {
        getCurrentClimbList()
    }, [])

    useEffect(
        () => {
            if (searchTerms !== "") {
                getSearchClimbs(searchTerms).then(data => setFilteredClimbs(data))
            }
            else {
                setFilteredClimbs(climbs)
            }
        },
        [searchTerms, climbs]
    )
    //function to add climb to users custom completed climbs 
    const handleAddClimb = (evt) => {
        evt.preventDefault() //preventing browser reload/refresh
        const climb = { climb_id: evt.target.id }
        setAddClimb(evt.target.id)
        createMyClimb(climb).then((data) => {
            setAddClimb(data)
        })

    }


    return (
        <>
            <h2 className="activityListTitle">Climb List</h2>
            {/* if the user is staff they will have the option to add a new climb*/}
            <div className="topButtons">
                {
                    (staff === "true")
                        ?
                        <>
                            <button className="staffButton" onClick={() => navigate("/climb/create")}>Add Climb</button>
                            <button className="staffButton" onClick={() => navigate("/climbingTypeList")}>Climb Types</button>
                            <button className="staffButton" onClick={() => navigate("/climbingGradeList")}>Climb Grades</button>
                        </>
                        :
                        <>

                        </>
                }
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
                <ul className="activityContainer">
                    {/* mapping through each climb and displaying its information */}
                    {filteredClimbs.map((climb) => {
                        return (
                            <div className="individualActivity" key={`climb-${climb.id}`}>
                                <section className="activityList" key={`climb-${climb.id}`}>
                                    <div className="imageContainer">
                                        <img className="activityPicture" src={climb?.climb_image_url} alt='climb'></img>
                                    </div>
                                    <div className="textContainer">
                                        <div className="activityInfo"><b>Name:</b>{climb?.name}</div>
                                        <div className="activityInfo"><b>Description:</b>{climb?.description}</div>
                                        <div className="activityInfo"><b>Location:</b>{climb?.location}</div>
                                        <div className="activityInfo"><b>Type of Climb:</b>{climb?.climb_type?.name}</div>
                                        <div className="activityInfo"><b>Grade:</b>{climb?.grade?.rating}</div>
                                        {climb?.tags?.map((tag)=>{
                                        return(
                                            <div className="individualClimbTag" key={`tag-${tag.id}`}>
                                        <div className="activityInfo"><b>Tags:</b>{tag?.label}</div>
                                        </div>
                                        )
                                        })
                                    }
                                    </div>
                                </section>
                                <section className="bottomButtons">
                                    <button className="alterButton" id={climb.id} onClick={handleAddClimb}>Add to My Climbs</button>

                                    {/* if the user is staff they will have the option to edit or delete a climb */}

                                    {
                                        (staff === "true")
                                            ?
                                            <>
                                                <button className="alterButton" onClick={() => navigate(`/climbs/${climb.id}/edit`)}>edit</button>
                                                <button className="alterButton" onClick={(evt) => {
                                                    evt.preventDefault()
                                                    deleteClimb(climb.id).then(getCurrentClimbList)
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
