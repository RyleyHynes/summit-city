import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { deleteMyHike, getMyHikes, getSearchMyHikes } from "../../managers/MyHikeManager"

// import "./List.css"

export const MyCompletedHikes = () => {
    //setting initial state of myCompletedHikes 
    const [myCompletedHikes, setMyCompletedHikes] = useState([])
    const [searchTerms, setSearchTerms] = useState("")
    const [filteredHikes, setFilteredHikes] = useState([])

    const navigate = useNavigate()

    const getUserHikes = () => {
        getMyHikes().then(hikeData => {
            setMyCompletedHikes(hikeData[0])
        })
    }


    //useEffect ot invoke the getUserHikes function
    useEffect(() => {

        getUserHikes()
    }, [])


    useEffect(
        () => {
            if (searchTerms !== "") {
                getSearchMyHikes(searchTerms).then(data => setFilteredHikes(data))
            }
            else {
                setFilteredHikes(myCompletedHikes)
            }
        },
        [searchTerms, myCompletedHikes]
    )

    //HTML for the users completed hikes
    return (
        <>
            <h2 className="activityListTitle">Your Completed Hikes</h2>
            <article>
                <div className="topButtons">
                    <button className="dayButtons" onClick={() => navigate("/hikeList")}>Back to Hikes</button>
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
                    {/* mapping though the users filtered hikes and listing off each hikes image, 
                        name, distance, estimated length, description, skil level, and tags */}
                    {
                        [filteredHikes]?.map((hike) => {
                            return (
                                <div className="individualActivity" key={`hike-${hike.id}`}>
                                    <section className="activity" key={`hike-${hike.id}`}>
                                        {hike?.hikes?.map((singleHike) => {
                                            return (
                                                <>
                                                    <div className="individualActivity" key={`singleHike-${singleHike.id}`}>
                                                        <section className="activity" key={`singleHike-${singleHike.id}`}>
                                                            <div className="imageContainer">
                                                                <img className="activityPicture" src={singleHike?.hike_image_url} alt='hike'></img>
                                                            </div>
                                                            <div className="textContainer">
                                                                <div className="activityInfo"><b>Name:</b> {singleHike?.name}</div>
                                                                <div className="activityInfo"><b>Distance:</b> {singleHike?.distance}</div>
                                                                <div className="activityInfo"><b>Estimated Length:</b> {singleHike?.estimated_length}</div>
                                                                <div className="activityInfo"><b>Description:</b> {singleHike?.description}</div>
                                                                <div className="activityInfo"><b>Hike Skill Level:</b> {singleHike?.hike_skill_level?.level}</div>
                                                                {singleHike?.tags?.map((tag) => {
                                                                    return (
                                                                        <div className="individualHikeTag" key={`tag-${tag.id}`}>
                                                                            <div className="activityInfo"><b>Tags:</b>{tag?.label}</div>
                                                                        </div>
                                                                    )
                                                                })
                                                                }
                                                            </div>
                                                            <section className="bottomButtons">
                                                                <button className="alterButton" onClick={(evt) => {
                                                                    evt.preventDefault()
                                                                    deleteMyHike(singleHike.id).then(getUserHikes)
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
                        })
                    }
                </ul>
            </article>
        </>
    )
}