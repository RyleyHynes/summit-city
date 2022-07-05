import { useEffect, useState } from "react"
import { useNavigate } from "react-router"
import { Link } from "react-router-dom"
import "./Hike.css"

export const HikeList = ({ searchTermState }) => {

    const [hikes, setHikes] = useState([])
    //we do not want to modify the array of hikes from the api, but we still want to display a list of hikes. creating another variable of filteredHikes
    const [filteredHikes, setFilteredHikes] = useState([])
    //added the useNavigate hook for the user Added hike button
    const [completedHikes, setCompletedHikes] = useState(false)


    const [bucketListHikes, setBucketListHikes] = useState(false)




    useEffect(
        () => {
            if (completedHikes) {
                const completedHikes = hikes.filter(hike => hike.completed === true)
                setFilteredHikes(completedHikes)
            }
            else {
                setFilteredHikes(hikes)
            }
        },
        [completedHikes]
    )


    useEffect(
        () => {
            if (bucketListHikes) {
                const bucketListHikes = hikes.filter(hike => hike.bucketList === true)
                setFilteredHikes(bucketListHikes)
            }
            else {
                setFilteredHikes(hikes)
            }
        },
        [bucketListHikes]
    )

    const navigate = useNavigate()

    // get summitUser out of local storage
    const localSummitUser = localStorage.getItem("summit_user")
    const summitUserObject = JSON.parse(localSummitUser)


    const getAllHikes = () => {
        fetch(`http://localhost:8088/hikes?_expand=skillLevel&userId=${summitUserObject.id}`)
            .then((response) => response.json())
            .then((hikesArray) => {
                setHikes(hikesArray);
            })
    }

    useEffect(() => {
        getAllHikes()
    },
        [],
    )


    useEffect(() => {
        fetch(`http://localhost:8088/hikes?_expand=skillLevel&userId=${summitUserObject.id}`)
            .then((response) => response.json())
            .then((hikeArray) => {
                setFilteredHikes(hikeArray);
            })
    }, [hikes]);


    useEffect(() => {
        const searchedHikes = hikes.filter((hike) => {
            return (
                hike.name
                    .toLowerCase()
                    .includes(searchTermState.toLowerCase()) ||
                hike.skillLevel?.level
                    .toLowerCase()
                    .startsWith(searchTermState.toLowerCase()) ||
                hike.location
                    .toLowerCase()
                    .includes(searchTermState.toLowerCase()) ||
                hike.description
                    .toLowerCase()
                    .includes(searchTermState.toLowerCase()) ||
                hike.attractions
                    .toLowerCase()
                    .includes(searchTermState.toLowerCase())
            );
        });
        setFilteredHikes(searchedHikes);
    }, [searchTermState]);


    return (
        <>
            <div className="hikeButtons">
                <button className="hikeAlterButton" onClick={() => navigate("/hike/create")}>
                    Add New Hike
                </button>
                <button className="hikeAlterButton" onClick={
                    () => {
                        setBucketListHikes(false)
                        setCompletedHikes(false)
                    }
                }>Show All Hikes</button>
                <button className="hikeAlterButton" onClick={
                    () => {
                        setCompletedHikes(true)
                    }
                }>Completed Hikes</button>
                <button className="hikeAlterButton" onClick={
                    () => {
                        setBucketListHikes(true)
                    }
                }>Bucket List Hikes</button>
            </div>
            <h2 className="hikeForm_title">Hikes in Grand Teton National Park</h2>
            <article className="hikes">
                <ul className="hikeContainer">
                    {filteredHikes.map((hike) => {
                        return (
                            <div className="individualHike" key={`hike-${hike.id}`}>
                                <section
                                    className="hike_list"
                                    key={`hike--${hike.id}`}
                                >
                                    <div className="imageContainer">
                                        <img className="hikePicture" src={hike.url} alt='Hike'></img></div>
                                    <div className="textContainer">
                                        <div className="name">
                                            <b>Hike Name:</b>  {hike.name}</div>

                                        <div className="skillLevel"><b>Skill Level:</b> {hike?.skillLevel?.level}</div>
                                        <div className="distance"><b>Distance:</b>  {hike?.distance?.toFixed(2)}</div>
                                        <div className="location">
                                            <b>Location:</b>  {hike.location}
                                        </div>
                                        <div className="description"><b>Description:</b> {hike.description}</div>
                                        <div className="attractions"><b>Attractions:</b> {hike.attractions}</div>
                                        <div><b>Completed:</b> {hike.completed ? "✅" : "No"}</div>
                                        <div><b>Bucket List:</b> {hike.bucketList ? "✅" : "No"}</div>
                                    </div>
                                </section>
                                <section>
                                    <Link to={`/hikes/${hike.id}/edit`}>
                                        <button className="hikeAlterButton">EDIT Hike</button>
                                    </Link>
                                    <button
                                        className="hikeAlterButton"
                                        onClick={() => {
                                            fetch(`http://localhost:8088/hikes/${hike.id}`, {
                                                method: "DELETE",
                                            }).then(() => {
                                                getAllHikes();
                                            });
                                        }}
                                    >
                                        DELETE
                                    </button>
                                </section>
                            </div>
                        );
                    })}
                </ul>
            </article>
        </>
    );
};