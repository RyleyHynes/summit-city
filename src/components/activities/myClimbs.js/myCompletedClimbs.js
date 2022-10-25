import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { deleteMyClimb, getMyClimbs, getSearchMyClimbs } from "../../managers/MyClimbManager"

// import "./List.css"

export const MyCompletedClimbs = () => {
    //setting initial state of mySaturdayShows 
    const [myCompletedClimbs, setMyCompletedClimbs] = useState([])
    const [searchTerms, setSearchTerms] = useState("")
    const [filteredClimb, setFilteredClimb] = useState([])

const navigate = useNavigate()
    

//useEffect ot invoke the getShows function
    useEffect(() => {

        getMyClimbs().then(climbData => setMyCompletedClimbs(climbData))
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

    //HTML for the users Schedule
    return (
        <>
            <h2 className="showForm_title">Your Completed Climbs</h2>
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
                <ul className="showContainer">
                    {/* mapping though the users saturday shows and listing off each shows image, 
                        artist name, genre, description, stage, and show time */}
                    {
                        filteredClimb?.map((climb) => {
                            return (
                                <div className="individualShow" key={`saturdayShow-${climb.id}`}>
                                    <section className="showList" key={`show-${climb.id}`}>
                                        <div className="imageContainer">
                                            <img className="showPicture" src={climb?.climb_image_url} alt='show'></img>
                                        </div>
                                        <div className="textContainer">
                                            <div className="showInfo"><b>Name:</b> {climb?.name}</div>
                                            <div className="showInfo"><b>Description:</b> {climb?.description}</div>
                                            <div className="showInfo"><b>Location:</b> {climb?.location}</div>
                                            <div className="showInfo"><b>Climb Type:</b> {climb?.climb_type?.name}</div>
                                            <div className="showInfo"><b>Grade:</b> {climb.grade.rating}</div>
                                            {climb?.tags?.map((tag)=>{
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
                                        <button className="alterButton" onClick={(evt) => {
                                            evt.preventDefault()
                                            deleteMyClimb(climb.id).then(getMyClimbs)
                                        }}>Delete</button>
                                    </section>
                                </div>
                            )
                        })}
                </ul>
            </article>
        </>
    )
}