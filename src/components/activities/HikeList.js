import { useEffect, useState } from "react"
import { getHikes } from "../../manager/APIManager"

export const HikeList = () => {
    const [hikes, setHikes] = useState([])

    useEffect(() => {
        getHikes().then(
            (hikesArray) => {
                setHikes(hikesArray)
            }
        )
    },
    [])
    return <>
    <h2>Hikes</h2>
    {
        hikes.map(
            hike => <section className="hike">
                <div className="hike__name">{hike.name}</div>
                <div className="hike__skillLevel">{hike.skillLevel}</div>
                <div className="hike__distance">{hike.distance}</div>
                <div className="hike__location">{hike.location}</div>
                <div className="hike__estLength">{hike.estLength}</div>
                <div className="hike__description">{hike.description}</div>
                <div className="hike__attractions">{hike.attractions}</div>
            </section>
        )
    }
    </>
}