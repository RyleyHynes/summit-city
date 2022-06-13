import { useEffect, useState } from "react"
import { getClimbs } from "../../manager/APIManager"


export const ClimbList = () => {
    const [climbs, setClimbs] = useState([])

    useEffect(() => {
        getClimbs().then(
            (climbsArray) => {
                setClimbs(climbsArray)
            }
        )
    },
    [])
    return <>
    <h2>Climbs</h2>

    {
        climbs.map(
            climb => <section className="climb">
                <div className="climb__name">{climb.name}</div>
                <div className="climb__skillLevel">{climb.skillLevel}</div>
                <div className="climb__distance">{climb.distance}</div>
                <div className="climb__location">{climb.location}</div>
                <div className="climb__estLength">{climb.estLength}</div>
                <div className="climb__description">{climb.description}</div>
                <div className="climb__attractions">{climb.attractions}</div>
            </section>
        )
    }
    </>
}