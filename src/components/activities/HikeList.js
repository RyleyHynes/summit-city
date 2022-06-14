import { useEffect, useState } from "react"
import { getHikes } from "../../manager/APIManager"
// import Dropdown from 'react-dropdown';
// import 'react-dropdown/style.css';

import * as React from 'react';

export const HikeList = () => {
    //defining a state variable for hikes
    const [hikes, setHikes] = useState([])
    //defining a state variable for hikes by distance
    const [hikesByDistance, setHikesByDistance] = useState([])




    useEffect(() => {
        getHikes().then(
            //
            (hikesArray) => {
                setHikes(hikesArray)
            }
        )
        console.log(React);
    },
        [])



    const options = [
        'Easy', 'Moderate', 'Hard'
    ];
    const defaultOption = options[0];

    return <>
        <h2>Hikes</h2>
        {/* <Dropdown options={options} onChange={this._onSelect} value={defaultOption} placeholder="Select a Skill Level" />; */}
        {
            hikes.map(
                hike => <section className="hike">
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