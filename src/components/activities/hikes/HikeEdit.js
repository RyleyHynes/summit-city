import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router"

export const HikeEdit = () => {
    const [hike, editHike] = useState({
        name: "",
        location: "",
        skillLevelId: "",
        distance: "",
        description: "",
        attractions: "",
        completed: false,
        bucketList: false
    })

    const { hikeId } = useParams()
    const navigate = useNavigate()

    const [skillLevels, setSkillLevels] = useState([])

    useEffect(() => {
        fetch(`http://localhost:8088/hikes/${hikeId}`)
            .then(response => response.json())
            .then((data) => {
                editHike(data)
            })
    },
        [hikeId]
    )

    useEffect(() => {
        fetch(`http://localhost:8088/skillLevels`)
            .then((response) => response.json())
            .then((skillLevelArray) => {
                setSkillLevels(skillLevelArray)
            })
    },
        []
    )

    const editButtonClick = (event) => {
        event.preventDefault()

        return fetch(`http://localhost:8088/hikes/${hikeId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(hike)
        })
            .then(response => response.json())
            .then(() => {
                navigate("/hikes")
            })

    }

    return <>
        <form className="hikeForm">
            <h2 className="hikeForm__title">Update Hike</h2>
            <fieldset>
                <div className="form_group" key={hike.id}>
                    <label htmlFor="name"><b>Name:</b></label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Hike Name"
                        value={hike.name}
                        onChange={
                            (event) => {
                                const copy = { ...hike }
                                copy.name = event.target.value
                                editHike(copy)
                            }}
                    />
                </div>
            </fieldset>

            <fieldset>
                <div className="form_group" key={hike.id}>
                    <label htmlFor="location"><b>Location:</b></label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Hike Location"
                        value={hike.location}
                        onChange={
                            (event) => {
                                const copy = { ...hike }
                                copy.location = event.target.value
                                editHike(copy)
                            }}
                    />
                </div>
            </fieldset>

            <fieldset>
                <div className="form_group" key={hike.id}>
                    <label htmlFor="skillLevel"><b>Skill Level:</b></label>
                    <select
                        value={hike.skillLevelId}
                        onChange={(evt) => {
                            const copy = { ...hike }; //created a copy of existing state
                            copy.skillLevelId = parseInt(evt.target.value) //to modify
                            editHike(copy)
                        }}
                    >
                        <option value="0">Select Skill Level</option>
                        {
                            skillLevels.map((skillLevel) => {
                                return <option key={skillLevel.id} value={skillLevel.id}>{skillLevel.level}</option>
                            })}
                    </select>
                </div>
            </fieldset>

            <fieldset>
                <div className="form_group" key={hike.id}>
                    <label htmlFor="distance"><b>Distance:</b></label>
                    <input
                        required autoFocus
                        type="number"
                        className="form-control"
                        placeholder="Hike Distance"
                        value={hike.distance}
                        onChange={
                            (event) => {
                                const copy = { ...hike }
                                copy.distance = parseFloat(event.target.value,2)
                                editHike(copy)
                            }}
                    />
                </div>
            </fieldset>

            <fieldset>
                <div className="form_group" key={hike.id}>
                    <label htmlFor="description"><b>Description:</b></label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Hike Description"
                        value={hike.description}
                        onChange={
                            (event) => {
                                const copy = { ...hike }
                                copy.description = event.target.value
                                editHike(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form_group" key={hike.id}>
                    <label htmlFor="attractions"><b>Attractions:</b></label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Hike Attractions"
                        value={hike.attractions}
                        onChange={
                            (event) => {
                                const copy = { ...hike }
                                copy.attractions = event.target.value
                                editHike(copy)
                            }}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="radio" key={hike.id}>
                    <span><b>Completed:</b></span>
                    <input  type="radio" className="radio"
                        name="completed" value={true}
                        onChange={
                            (event) => {
                                const copy = { ...hike }
                                copy.completed = true
                                editHike(copy)
                            }} />
                    <label htmlFor="yes">True</label>
                    <input  type="radio" className="radio"
                        name="completed" value={false}  onChange={
                            (event) => {
                                const copy = { ...hike }
                                copy.completed = false
                                editHike(copy)
                            }} />
                    <label htmlFor="false">False</label>
                </div>
            </fieldset>
            <fieldset>
                <div className="radio" key={hike.id}>
                    <span><b>Bucket List:</b></span>
                    <input  type="radio" className="radio"
                        name="bucketList" value={true}
                        onChange={
                            (event) => {
                                const copy = { ...hike }
                                copy.bucketList = true
                                editHike(copy)
                            }} />
                    <label htmlFor="true">True</label>
                    <input  type="radio" className="radio"
                        name="bucketList" value={false}  onChange={
                            (event) => {
                                const copy = { ...hike }
                                copy.bucketList = false
                                editHike(copy)
                            }} />
                    <label htmlFor="false">False</label>
                </div>
            </fieldset>

            <button
                onClick={(clickEvent) => editButtonClick(clickEvent)}
                className="hikeAlterButton">
                Save
            </button>

            <button className="hikeAlterButton" onClick={() => navigate("/hikes")}>Cancel</button>
        </form>
    </>

}
