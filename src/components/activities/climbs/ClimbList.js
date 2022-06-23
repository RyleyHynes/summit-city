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
                    .startsWith(searchTermState.toLowerCase()) ||
                climb.grade.rating
                    .toLowerCase()
                    .startsWith(searchTermState.toLowerCase()) ||
                climb.description
                    .toLowerCase()
                    .includes(searchTermState.toLowerCase())
            );
        });
        setFilteredClimbs(searchedClimbs);
    }, [searchTermState]);


    return (
        <>
            <button onClick={() => navigate("/climb/create")}>
                Add New Climb
            </button>
            <button onClick={
                () => {
                    setBucketListClimbs(false)
                    setCompletedClimbs(false)
                }
            }>Show All Climbs</button>
            <button onClick={
                () => {
                    setCompletedClimbs(true)
                }
            }>Completed Climbs</button>
            <button onClick={
                () => {
                    setBucketListClimbs(true)
                }
            }>Bucket List Climbs</button>

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
                                    <div className="name">
                                        Climb Name: {climb.name}
                                    </div>
                                    <div className="type">Type: {climb?.type?.name}</div>
                                    <div className="grade">Grade: {climb?.grade?.rating.toFixed(2)}</div>
                                    <div className="location">
                                        Location: {climb.location}
                                    </div>
                                    <div className="description">Description: {climb.description}</div>
                                </section>
                                <footer className="completed">Completed: {climb.completed ? "✅" : "No"}</footer>
                                <footer className="bucketList">Bucket List: {climb.bucketList ? "✅" : "No"}</footer>
                                <footer>
                                    <Link to={`/climbs/${climb.id}/edit`}>
                                        <button className="edit-btn">EDIT Climb</button>
                                    </Link>
                                    <button
                                        className="delete-btn"
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