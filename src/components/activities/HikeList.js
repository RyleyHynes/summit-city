import { useEffect, useState } from "react"
import { getHikes} from "../../manager/APIManager"
// import Dropdown from 'react-dropdown';
// import 'react-dropdown/style.css';

import * as React from 'react';
import { useNavigate } from "react-router-dom";



export const HikeList = () => {
    //defining a state variable for hikes
    const [hikes, setHikes] = useState([])


    const navigate = useNavigate()

    useEffect(() => {
        getHikes().then(
            //
            (hikesArray) => {
                setHikes(hikesArray)
            }
        )
    },
    [])






    return <>
        {
            <button onClick={() => navigate("/hike/create")}>Add Hike</button>
        }
        <h2>Hikes</h2>
        <div>
        {/* <input onClick={(clickEvent) => {const copy={...userChoice} copy.skillLevel =parseInt(clickEvent.target.value) */}
        {/* <input type="radio" value="Easy" name="skillLevel" /> Easy
        <input type="radio" value="Moderate" name="skillLevel" /> Moderate
        <input type="radio" value="Hard" name="skillLevel" /> Hard */}

    </div>
        {
            hikes.map(
                hike => <section className="hike" key={hike.id}>
                    <div className="hike__name">Name: {hike.name}</div>
                    <div className="hike__skillLevel">Skill Level: {hike.skillLevel}</div>
                    <div className="hike__distance">Distance: {hike.distance}</div>
                    <div className="hike__location">Location:{hike.location}</div>
                    <div className="hike__estLength">Estimated Length of Hike: {hike.estLength}</div>
                    <div className="hike__description">Description: {hike.description}</div>
                    <div className="hike__attractions">Attractions: {hike.attractions}</div>
                </section>
            )
        }
    </>
}