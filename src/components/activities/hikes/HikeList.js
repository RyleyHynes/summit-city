import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { createMyHike } from "../../managers/MyHikeManager"
import { deleteHike, getSearchHikes } from "../../managers/HikeManager"
import { getAllHikes } from "../../managers/HikeManager"


export const HikeList = ({ setStaff }) => {
    //setting up initial state for hikes
    const [hikes, setHikes] = useState([])
    //setting up initial state for addHike and setting it to false
    const [addHike, setAddHike] = useState(false)
    //setting up initial state for staff
    const [staff, setStaffState] = useState()
    const [searchTerms, setSearchTerms] = useState("")
    const [filteredHikes, setFilteredHikes] = useState([])

    /*Invoking useNavigate and assigning it to navigate so that we can navigate our application programmatically*/
    const navigate = useNavigate()

    //function to get the hike list and set it into hikes state
    const getCurrentHikeList = () => {
        getAllHikes().then(data => setHikes(data))
    }

    //observing the user in local storage and the boolean on is_staff 
    useEffect(() => {
        setStaffState(localStorage.getItem("is_staff"))
    }, [setStaff])

    //observing and invoking the getCurrentHikeList
    useEffect(() => {
        getCurrentHikeList()
    }, [])

    useEffect(
        () => {
            if (searchTerms !== "") {
                getSearchHikes(searchTerms).then(data => setFilteredHikes(data))
            }
            else {
                setFilteredHikes(hikes)
            }
        },
        [searchTerms, hikes]
    )
    //function to add hike to users custom completed hikes
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
            <h2 className="activityListTitle">Hike List</h2>
            {/* if the user is staff they will have the option to add a new hike*/}
            <div className="topButtons">
                {
                    (staff === "true")
                        ?
                        <>
                            <button className="staffButton" onClick={() => navigate("/hike/create")}>Add Hike</button>
                            <button className="staffButton" onClick={()=> navigate("/skillLevelList")}>Hike Skill Levels</button>
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
                    {/* mapping through each hike and displaying its information */}
                    {filteredHikes.map((hike) => {
                        return (
                            <div className="individualActivity" key={`hike-${hike.id}`}>
                                <section className="activityList" key={`hike-${hike.id}`}>
                                    <div className="imageContainer">
                                        <img className="activityPicture" src={hike?.hike_image_url} alt='hike'></img>
                                    </div>
                                    <div className="textContainer">
                                        <div className="activityInfo"><b>Name:</b>{hike?.name}</div>
                                        <div className="activityInfo"><b>Distance:</b>{hike?.distance}</div>
                                        <div className="activityInfo"><b>Estimated Length:</b>{hike?.estimated_length}</div>
                                        <div className="activityInfo"><b>Description:</b>{hike?.description}</div>
                                        <div className="activityInfo"><b>Hike Skill Level:</b>{hike?.hike_skill_level?.level}</div>
                                        {hike?.tags?.map((tag)=>{
                                        return(
                                            <div className="individualHikeTag" key={`tag-${tag.id}`}>
                                        <div className="activityInfo"><b>Tags:</b>{tag?.label}</div>
                                        </div>
                                        )
                                        })
                                    }
                                    </div>
                                </section>
                                <section className="bottomButtons">
                                    <button className="alterButton" id={hike.id} onClick={handleAddHike}>Add to My Hikes</button>

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
