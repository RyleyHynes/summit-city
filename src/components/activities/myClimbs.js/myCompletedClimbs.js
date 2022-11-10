import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { deleteMyClimb, getMyClimbs, getSearchMyClimbs } from "../../managers/MyClimbManager"

// import "./List.css"

export const MyCompletedClimbs = () => {
    //setting initial state of myCompletedClimbs 
    const [myCompletedClimbs, setMyCompletedClimbs] = useState([])
    const [searchTerms, setSearchTerms] = useState("")
    const [filteredClimb, setFilteredClimb] = useState([])

    const navigate = useNavigate()



    const getUserClimbs = () => {
        getMyClimbs().then(climbData => {
            setMyCompletedClimbs(climbData[0])
        })
    }
    //useEffect ot invoke the getUserClimbs function
    useEffect(() => {

        getUserClimbs()
    }, [])

    useEffect(
        () => {
            if (searchTerms !== "") {
                getSearchMyClimbs(searchTerms).then(data => setFilteredClimb(data[0].climbs))
            }
            else {
                setFilteredClimb(myCompletedClimbs)
            }
        },
        [searchTerms, myCompletedClimbs]
    )

    //HTML for the users completed climbs
    return (
        <>
            <h2 className="activityForm_title">Your Completed Climbs</h2>
            <article>
                <div className="topButtons">
                    <button className="dayButtons" onClick={() => navigate("/climbList")}>Back to Climbs</button>
                </div>
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
                <ul className="activityContainer">
                    {/* mapping though the users filtered climbs and listing off each climbs image, 
                        name, description, location, type of climb, grade and tags */}
                    {
                        [filteredClimb]?.map((climb) => {
                            return (
                                <div className="individualActivity" key={`climb-${climb.id}`}>
                                    <section className="activity" key={`climb-${climb.id}`}>
                                        {climb?.climbs?.map((singleClimb) => {
                                            return (
                                                <>
                                                <div className="individualActivity" key={`singleClimb-${singleClimb.id}`}>
                                                    <section className="activity" key={`singleClimb-${singleClimb.id}`}>
                                                        <div className="imageContainer">
                                                            <img className="activityPicture" src={singleClimb?.climb_image_url} alt='climb'></img>
                                                        </div>
                                                        <div className="textContainer">
                                                            <div className="activityInfo"><b>Name:</b> {singleClimb?.name}</div>
                                                            <div className="activityInfo"><b>Description:</b> {singleClimb?.description}</div>
                                                            <div className="activityInfo"><b>Location:</b> {singleClimb?.location}</div>
                                                            <div className="activityInfo"><b>Type of Climb:</b> {singleClimb?.climb_type?.name}</div>
                                                            <div className="activityInfo"><b>Grade:</b> {singleClimb?.grade?.rating}</div>
                                                            {singleClimb?.tags?.map((tag) => {
                                                                return (
                                                                    <div className="individualClimbTag" key={`tag-${tag.id}`}>
                                                                        <div className="activityInfo"><b>Tags:</b>{tag?.label}</div>
                                                                    </div>
                                                                )
                                                            })
                                                            }
                                                        </div>
                                                            <section className="bottomButtons">
                                                                <button className="alterButton" onClick={(evt) => {
                                                                    evt.preventDefault()
                                                                    deleteMyClimb(singleClimb.id).then(getUserClimbs)
                                                                }}>Delete</button>
                                                            </section>
                                                    </section>
                                                </div>
                                                </>
                                    )
                                        })}
                                </section>
                                </div>
                            )
                        })}
                </ul>
            </article>
        </>
    )
}