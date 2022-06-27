import { useEffect, useState } from "react"
import { useNavigate } from "react-router"
import { Link } from "react-router-dom"
import "./Climb.css"

export const ClimbList = ({ searchTermState }) => {

    const [climbs, setClimbs] = useState([])
    //we do not want to modify the array of climbs from the api, but we still want to display a list of climbs. creating another variable of filteredClimbs
    const [filteredClimbs, setFilteredClimbs] = useState([])

    //completed button is a user interaction which will change the state of the component so we are going to track weather or not completed should be listed so that is why we have another state variable.
    const [completedClimbs, setCompletedClimbs] = useState([false])

    const [bucketListClimbs, setBucketListClimbs] = useState([false])

    useEffect(
        () => {
            if (completedClimbs) {
                const completedClimbs = climbs.filter(climb => climb.completed === true)
                setFilteredClimbs(completedClimbs)
            }
            else {
                setFilteredClimbs(climbs)
            }
        },
        [completedClimbs]
    )

    useEffect(
        () => {
            if (bucketListClimbs) {
                const bucketListClimbs = climbs.filter(climb => climb.bucketList === true)
                setFilteredClimbs(bucketListClimbs)
            }
            else {
                setFilteredClimbs(climbs)
            }
        },
        [bucketListClimbs]
    )

    //added the useNavigate hook for the user Added climb button 
    const navigate = useNavigate()



    // get summitUser out of local storage
    const localSummitUser = localStorage.getItem("summit_user")
    const summitUserObject = JSON.parse(localSummitUser)


    const getAllClimbs = () => {
        fetch(`http://localhost:8088/climbs?_expand=grade&_expand=type&userId=${summitUserObject.id}`)
            .then((response) => response.json())
            .then((climbsArray) => {
                setClimbs(climbsArray);
            })
    }

    useEffect(() => {
        getAllClimbs()
    },
        [],
    )


    useEffect(() => {
        fetch(`http://localhost:8088/climbs?_expand=grade&_expand=type&userId=${summitUserObject.id}`)
            .then((response) => response.json())
            .then((climbArray) => {
                setFilteredClimbs(climbArray);
            })
    }, [climbs]);

    useEffect(() => {
        fetch(`http://localhost:8088/types`)
            .then((response) => response.json())
            .then((typeArray) => {
                setFilteredClimbs(typeArray);
            })
    }, []);
    useEffect(() => {
        fetch(`http://localhost:8088/grades`)
            .then((response) => response.json())
            .then((gradeArray) => {
                setFilteredClimbs(gradeArray);
            })
    }, []);

    useEffect(() => {
        const searchedClimbs = climbs.filter((climb) => {
            return (
                climb.name
                    .toLowerCase()
                    .includes(searchTermState.toLowerCase()) ||
                climb.location
                    .toLowerCase()
                    .includes(searchTermState.toLowerCase()) ||
                climb.type.name
                    .toLowerCase()
                    .includes(searchTermState.toLowerCase()) ||
                climb.description
                    .toLowerCase()
                    .includes(searchTermState.toLowerCase())
            );
        });
        setFilteredClimbs(searchedClimbs);
    }, [searchTermState]);


    return (
        <>
        <div className="climbButtons">
            <button className="climbAlterButton" onClick={() => navigate("/climb/create")}>
                Add New Climb
            </button>
            <button className="climbAlterButton" onClick={
                () => {
                    setBucketListClimbs(false)
                    setCompletedClimbs(false)
                }
            }>Show All Climbs</button>
            <button className="climbAlterButton" onClick={
                () => {
                    setCompletedClimbs(true)
                }
            }>Completed Climbs</button>
            <button className="climbAlterButton" onClick={
                () => {
                    setBucketListClimbs(true)
                }
            }>Bucket List Climbs</button>
            </div>

            <h2 className="climbForm_title">Climbs in Grand Teton National Park</h2>
            <article className="climbs">
                <ul>
                    {filteredClimbs.map((climb) => {
                        return (
                            <div key={`climb-${climb.id}`}>
                                <section
                                    className="climb_list"
                                    key={`climb--${climb.id}`}
                                >

                                    <div className="imageContainer">
                                        <img className="climbPicture" src={climb.url} alt='climb'></img></div>
                                    <div className="textContainer">
                                    <div className="name">
                                        <b>Climb Name:</b> {climb.name}
                                    </div>
                                    <div className="type"><b>Type:</b> {climb?.type?.name}</div>
                                    <div className="grade"><b>Grade:</b> {climb?.grade?.rating.toFixed(2)}</div>
                                    <div className="location">
                                        <b>Location:</b> {climb.location}
                                    </div>
                                    <div className="description"><b>Description:</b> {climb.description}</div>
                                    </div>
                                </section>
                                <footer className="completed"><b>Completed:</b> {climb.completed ? "✅" : "No"}</footer>
                                <footer className="bucketList"><b>Bucket List:</b> {climb.bucketList ? "✅" : "No"}</footer>
                                <footer>
                                    <Link to={`/climbs/${climb.id}/edit`}>
                                        <button className="climbAlterButton">EDIT Climb</button>
                                    </Link>
                                    <button
                                        className="climbAlterButton"
                                        onClick={() => {
                                            fetch(`http://localhost:8088/climbs/${climb.id}`, {
                                                method: "DELETE",
                                            }).then(() => {
                                                getAllClimbs();
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