import { useEffect, useState } from "react"
import { useNavigate } from "react-router"
import { Link } from "react-router-dom"
import { getAllEmployees } from "../../../manager/APIManager";
import "./Hike.css"


/* added prop of searchTermState, the key is searchTermState and the value is the actual state*/
export const HikeList = ({ searchTermState }) => {
    /* */
    /*creating a state variable for hikes and setting it equal to an empty array*/
    const [hikes, setHikes] = useState([])
    /*creating a state variable for filteredHikes and setting it equal to an 
    empty array*/
    const [filteredHikes, setFilteredHikes] = useState([])
    /*creating a state variable fo completedHikes and setting it equal to false 
    because initially we want to see all hikes and then when we click the button 
    we change that state to true to see the completedHikes*/
    const [completedHikes, setCompletedHikes] = useState(false)
    /*creating a state variable fo bucketListHikes and setting it equal to false 
    because initially we want to see all hikes and then when we click the button 
    we change that state to true to see the bucketListHikes*/
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

    /*Invoking useNavigate and assigning its return value to navigate*/
    const navigate = useNavigate()

    /*get summit_User out of local storage and assign its return value to 
    summitUserObject*/
    const localSummitUser = localStorage.getItem("summit_user")
    /*converting summit_user from a string to an object*/
    const summitUserObject = JSON.parse(localSummitUser)


    /*Declaring a function to fetch hikes by skillLevel and userId. We can now
    invoke this function whenever we want. We have to pass the function tp the props*/
    const getAllHikes = () => {
        fetch(`http://localhost:8088/hikes?_expand=skillLevel`)
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
        fetch(`http://localhost:8088/hikes?_expand=skillLevel`)
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
                                        <div className="category">
                                            <b>Hike Name:</b>  {hike.name}</div>

                                        <div className="category"><b>Skill Level:</b> {hike?.skillLevel?.level}</div>
                                        <div className="category"><b>Distance:</b>  {hike?.distance?.toFixed(2)}</div>
                                        <div className="category">
                                            <b>Location:</b>  {hike.location}
                                        </div>
                                        <div className="category"><b>Description:</b> {hike.description}</div>
                                    <div className="category"><b>Completed:</b> {hike.completed ? "✅" : "No"}</div>
                                    <div className="category"><b>Bucket List:</b> {hike.bucketList ? "✅" : "No"}</div>
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