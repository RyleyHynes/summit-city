import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { deleteHikeSkillLevel, getAllHikeSkillLevels, getSearchHikeSkillLevels } from "../managers/SkillLevelManager"
// import "./List.css"

//function to list off the skillLevels that has a prop of seStaff
export const SkillLevelList = ({ searchTermState }) => {
    //setting initial state of skillLevel to an empty array
    const [skillLevels, setSkillLevels] = useState([])
    //setting initial state of staff
    const [staff, setStaffState] = useState()
    const [searchTerms, setSearchTerms] = useState("")
    const [filteredSkillLevels, setFilteredSkillLevels] = useState([])
    /*Invoking useNavigate and assigning it to navigate so that we can navigate our application programmatically*/
    const navigate = useNavigate()

    //getting the is_staff property out of local storage for the current user and setting it to the staff state
    useEffect(() => {
        setStaffState(localStorage.getItem("is_staff"))
    }, [])

    //getting the skillLevels from the SkillLevelsManager.js file and setting that data into the skillLevels state
    useEffect(() => {
        getAllHikeSkillLevels().then(data => setSkillLevels(data))
    }, [])

    useEffect(
        () => {
            if (searchTerms !== "") {
                getSearchHikeSkillLevels(searchTerms).then(data => setFilteredSkillLevels(data))
            }
            else {
                setFilteredSkillLevels(skillLevels)
            }
        },
        [searchTerms, skillLevels]
    )

    //Displaying the HTML for the skillLevels that will be listed out
    return (
        <>
            <h2 className="activityForm_title">SkillLevels</h2>
            {/* if the user is staff they will be able to see a button that will bring them to the add skillLevel form */}
            <div className="topButtons">
                {
                    (staff === "true")
                        ?
                        <>
                            <button className="dayButtons" onClick={() => navigate("/skillLevel/create")}>Add Skill Level</button>
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
                    {/* mapping through each skillLevel to get their image, name, genre, and description */}
                    {filteredSkillLevels.map((skillLevel) => {
                        return (
                            <div className="individualActivity" key={`skillLevel-${skillLevel.id}`}>
                                <section className="activityList" key={`skillLevel-${skillLevel.id}`}>
                                    <div className="textContainer">
                                        <div className="activityInfo"><b>Level: </b>{skillLevel.level}</div>
                                    </div>
                                </section>
                                <section className="bottomButtons">
                                    {/* if the user is staff they will have the option to edit or delete each skillLevel */}
                                    {
                                        (staff === "true")
                                            ?
                                            <>
                                                <button className="alterButton" onClick={() => navigate(`/skillLevel/${skillLevel.id}/edit`)}>edit</button>
                                                <button className="alterButton" onClick={() => {
                                                    deleteHikeSkillLevel(skillLevel.id).then(() => { getAllHikeSkillLevels().then(setSkillLevels) })
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