import { useEffect, useState } from "react"
import { getClimbs } from "../../manager/APIManager"


export const ClimbList = () => {
    const [climbs, setClimbs] = useState([])

    useEffect(() => {
        getClimbs().then(setClimbs)
    }, [])

    return <>
    <h2>Climbs</h2>
    
    {
        climbs.map(
            climb => <section className="climb" key={climb.id}>
                <div className="climb__name">Name: {climb.name}</div>
                <div className="climb__type">Type: {climb.type}</div>
                <div className="climb__grade">Grade: {climb.grade}</div>
                <div className="climb__location">Location: {climb.location}</div>
                <div className="climb__description">Description: {climb.description}</div>
            </section>
        )
    }
    </>
}

//for date 
{/* <div className="journal__date">{new Date(journal.datePurchased).toLocaleDateString()}</div> */}