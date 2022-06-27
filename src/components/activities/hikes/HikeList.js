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
                hike.skillLevel.level
                    .toLowerCase()
                    .startsWith(searchTermState.toLowerCase()) ||
                hike.location
                    .toLowerCase()
                    .includes(searchTermState.toLowerCase()) ||
                hike.description
                    .toLowerCase()
                    .includes(searchTermState.toLowerCase())
            );
        });
        setFilteredHikes(searchedHikes);
    }, [searchTermState]);


    return (
        <>
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

            <h2 className="hikeForm_title">Hikes in Grand Teton National Park</h2>
            <article className="hikes">
                <ul>
                    {filteredHikes.map((hike) => {
                        return (
                            <div key={`hike-${hike.id}`}>
                                <section
                                    className="hike_list"
                                    key={`hike--${hike.id}`}
                                >
                                    <img className="picture" src={hike.url} alt='Hike'></img>
                                    <div className="name">
                                        <div className="category">Hike Name:{hike.name}</div>
                                    </div>
                                    <div className="skillLevel"><div className="category">Skill Level:</div> {hike?.skillLevel?.level}</div>
                                    <div className="distance">Distance: {hike?.distance?.toFixed(2)}</div>
                                    <div className="location">
                                        Location: {hike.location}
                                    </div>
                                    <div className="description">Description: {hike.description}</div>
                                </section>
                                <footer className="Completed">Completed: {hike.completed ? "✅" : "No"}</footer>
                                <footer className="bucketList">Bucket List: {hike.bucketList ? "✅" : "No"}</footer>
                                <footer>
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
                                </footer>
                            </div>
                        );
                    })}
                </ul>
            </article>
        </>
    );
};