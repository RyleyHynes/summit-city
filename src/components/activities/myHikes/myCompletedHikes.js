import { useEffect, useState } from "react"
import { deleteMyShow, getMyShows, getSearchMyShows } from "../managers/MyShowManager"
// import "./List.css"

export const MyFridaySchedule = () => {
    //setting initial state of mySaturdayShows 
    const [mySaturdayShows, setMySaturdayShows] = useState([])
    //setting initial state of myFridayShows 
    const [myFridayShows, setMyFridayShows] = useState([])
    //setting the initial day state to false for toggle purposes
    const [day, setDay] = useState(false)
    const [searchTerms, setSearchTerms] = useState("")
    const [filteredFridayShow, setFilteredFridayShow] = useState([])
    const [filteredSaturdayShow, setFilteredSaturdayShow] = useState([])


    //sorts the shows based on their date
    const sortShows = (shows) => {
        const fridayShows = []
        const saturdayShows = []
        let friShows = shows?.shows.map((show) => {
            if (show.get_lineup_day === "2022-10-21") {
                fridayShows.push(show)
            } else {
                saturdayShows.push(show)
            }
        })
        let sortedFridayShows = fridayShows.sort((a, b) => { return a.start_time.localeCompare(b.start_time) })
        let sortedSaturdayShows = saturdayShows.sort((a, b) => { return a.start_time.localeCompare(b.start_time) })
        setMySaturdayShows(sortedSaturdayShows) //setting shows that are on saturday to mySaturdayShows state
        setMyFridayShows(sortedFridayShows) //setting shows that are on friday to myFridayShows state
    }

    //function which gets users shows and sorts them by day
    const getShows = () => {
        getMyShows().then(data => {

            sortShows(data[0])
        })
    }

    //useEffect ot invoke the getShows function
    useEffect(() => {

        getShows()
    }, [])

    useEffect(
        () => {
            if (searchTerms !== "") {
                getSearchMyShows(searchTerms).then(data => setFilteredFridayShow(data[0].shows))
            }
            else {
                setFilteredFridayShow(myFridayShows)
            }
        },
        [searchTerms, myFridayShows]
    )

    useEffect(
        () => {
            if (searchTerms !== "") {
                getSearchMyShows(searchTerms).then(data => setFilteredSaturdayShow(data[0].shows))
            }
            else {
                setFilteredSaturdayShow(mySaturdayShows)
            }
        },
        [searchTerms, mySaturdayShows]
    )

    //HTML for the users Schedule
    return (
        <>
            {
                day ? <><h2 className="showForm_title">Your Saturday Schedule</h2>
                    <article>
                        <div className="topButtons">
                            <button className="dayButtons" onClick={() => setDay(false)}>Friday</button>
                            <button className="dayButtons" onClick={() => setDay(true)}>Saturday</button>
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
                                filteredSaturdayShow?.map((show) => {
                                    return (
                                        <div className="individualShow" key={`saturdayShow-${show.id}`}>
                                            <section className="showList" key={`show-${show.id}`}>
                                                <div className="imageContainer">
                                                    <img className="showPicture" src={show?.artist.artist_image} alt='show'></img>
                                                </div>
                                                <div className="textContainer">
                                                    <div className="showInfo"><b>Artist:</b> {show?.artist.artist_name}</div>
                                                    <div className="showInfo"><b>Genre:</b> {show?.artist?.genre}</div>
                                                    <div className="showInfo"><b>Description:</b> {show?.artist?.artist_description}</div>
                                                    <div className="showInfo"><b>Stage:</b> {show?.stage?.stage_name}</div>
                                                    <div className="showInfo"><b>Show Time:</b> {show.readable_start_time}-{show.readable_end_time}</div>
                                                </div>
                                            </section>
                                            <section className="bottomButtons">
                                                <button className="alterButton" onClick={(evt) => {
                                                    evt.preventDefault()
                                                    deleteMyShow(show.id).then(getShows)
                                                }}>Delete</button>
                                            </section>
                                        </div>
                                    )
                                })}
                        </ul>
                    </article>
                </> :
                    <>
                        <h2 className="showForm_title">Your Friday Schedule</h2>
                        <article>
                            <div className="topButtons">
                                <button className="dayButtons" onClick={() => setDay(false)}>Friday</button>
                                <button className="dayButtons" onClick={() => setDay(true)}>Saturday</button>
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
                                {/* mapping though the users friday shows and listing off each shows image, 
                        artist name, genre, description, stage, and show time */}
                                {
                                    filteredFridayShow?.map((show) => {

                                        return (
                                            <div className="individualShow" key={`fridayShow-${show.id}`}>
                                                <section className="showList" key={`show-${show.id}`}>
                                                    <div className="imageContainer">
                                                        <img className="showPicture" src={show?.artist?.artist_image} alt='show'></img>
                                                    </div>
                                                    <div className="textContainer">
                                                        <div className="showInfo"><b>Artist:</b> {show?.artist?.artist_name}</div>
                                                        <div className="showInfo"><b>Genre:</b> {show?.artist?.genre}</div>
                                                        <div className="showInfo"><b>Description:</b> {show?.artist?.artist_description}</div>
                                                        <div className="showInfo"><b>Stage:</b> {show?.stage?.stage_name}</div>
                                                        <div className="showInfo"><b>Show Time:</b> {show.readable_start_time}-{show.readable_end_time}</div>
                                                    </div>
                                                </section>
                                                <section className="bottomButtons">
                                                    {/* user has the option to delete this show from their lineup */}
                                                    <button className="alterButton" onClick={(evt) => {
                                                        evt.preventDefault()
                                                        deleteMyShow(show.id).then(getShows)
                                                    }}>Delete</button>
                                                </section>

                                            </div>
                                        )
                                    })}
                            </ul>
                        </article>
                    </>}
        </>
    )
}