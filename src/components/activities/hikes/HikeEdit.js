import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router"

export const HikeEdit = () => {
    const [hike, editHike] = useState({
        name: "",
        location: "",
        skillLevelId: "",
        distance: "",
        description: "",
        attractions: ""
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
                    <label htmlFor="name">Name:</label>
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
                <div className="form-group" key={hike.id}>
                    <label htmlFor="location">Location:</label>
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
                <div className="form-group">
                    <label htmlFor="skillLevel">Skill Level:</label>
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
                    <label htmlFor="distance">Distance:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Hike Distance"
                        value={hike.distance}
                        onChange={
                            (event) => {
                                const copy = { ...hike }
                                copy.distance = event.target.value
                                editHike(copy)
                            }}
                    />
                </div>
            </fieldset>

            <fieldset>
                <div>
                    <label htmlFor="description">Description:</label>
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
                    <label htmlFor="attractions">Attractions:</label>
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
            <button
                onClick={(clickEvent) => editButtonClick(clickEvent)}
                className="edit-btn">
                Save
            </button>

            <button onClick={() => navigate("/hikes")}>Cancel</button>
        </form>
    </>

}
