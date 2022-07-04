import { useEffect, useState } from "react"
import { useNavigate } from "react-router"
import { Link } from "react-router-dom"
import { getAllUserClimbs } from "../../../manager/APIManager";
import "./Climb.css"

/*creating an exportable function which will list off climbs*/
export const ClimbList = ({ searchTermState }) => {

    /*Creating an intial state of climbs which is equal to an empty array. setClimbs 
    is the function which will alter the state*/
    const [climbs, setClimbs] = useState([])
    /*creating state for userClimbs which is equal to an empty array. setUserClimbs 
    is the function which will alter the state*/
    const [userClimbs, setUserClimbs] = useState([])

    /*creating a new state of filtered climbs and setting it equal to an empty array.
    setFiltered climbs is the function which will alter the state*/
    const [filteredClimbs, setFilteredClimbs] = useState([])

    /*completed climbs button is a user interaction which will change the state of the component so we are going to track weather or not completed should be listed*/
    const [completedClimbs, setCompletedClimbs] = useState([false])
    /*Bucket List Climbs button is a user interaction which will change the state of the component so we are going to track weather or not bucketList should be listed*/
    const [bucketListClimbs, setBucketListClimbs] = useState([false])


    /* get the string of "summit_user" out of local storage and assigning 
    its return value to localSummitUser*/
    const localSummitUser = localStorage.getItem("summit_user")
    /*converting the string into an object and assigning its 
    return value to summitUserObject*/
    const summitUserObject = JSON.parse(localSummitUser)

    /*useEffect to fetch all of the climbs*/
    useEffect(
        () => {
            fetch(`http://localhost:8088/climbs`)
                .then(response => response.json())
                /*storing the climbs data in the climb array*/
                .then((climbsArray) => {
                    /*invoking the setClimbs function with the climbsArray to change
                    the state of climbs*/
                    setClimbs(climbsArray)
                })
        },
        []
    )


    useEffect(
        () => {
            fetch(`http://localhost:8088/userClimbs`)
                .then(response => response.json())
                /*storing the climbs data in the climb array*/
                .then((userClimbsArray) => {
                    /*invoking the setClimbs function with the climbsArray to change
                    the state of climbs*/
                    setClimbs(userClimbsArray)
                })
        },
        []
    )

    /*useEffect to determine weather the the site should show all tickets for the staff or some tickets
    for the current non staff user.*/
    // useEffect(
    //     () => {
    //         if (summitUserObject.staff) {
    //             /*For Employees*/
    //             setFilteredClimbs(climbs)
    //         }
    //         else {
    //             /*For Customers*/
    //             const myClimbs = climbs.filter(climb => climb.userId === summitUserObject.id)
    //             setFilteredClimbs(myClimbs)
    //         }
    //     },
    //     [climbs]
    // )
     



    useEffect(
        () => {
            if (completedClimbs) {
                const completedClimbs = userClimbs.filter(userClimb => userClimb.completed === true && userClimb.userId === summitUserObject.id)
                setUserClimbs(completedClimbs)
            }
            else {
                setFilteredClimbs(userClimbs)
            }
        },
        [completedClimbs]
    )

    useEffect(
        () => {
            if (bucketListClimbs) {
                const bucketListClimbs = userClimbs.filter(userClimb => userClimb.bucketList === true && userClimb.userId === summitUserObject.id)
                setFilteredClimbs(bucketListClimbs)
            }
            else {
                setFilteredClimbs(userClimbs)
            }
        },
        [bucketListClimbs]
    )

    /*added the useNavigate hook for the user Added climb button*/
    const navigate = useNavigate()


/*function that fetches all the climbs with grade, type and userId*/
    const getAllClimbs = () => {
        fetch(`http://localhost:8088/climbs?_expand=grade&_expand=type&userId=${summitUserObject.id}`)
            .then((response) => response.json())
            .then((climbsArray) => {
                setClimbs(climbsArray);
            })
    }
/*useEffect which invokes the getAllClimbs function and observes the initial state*/
    useEffect(() => {
        getAllClimbs()
    },
        [],
    )


    /**/
    useEffect(() => {
        fetch(`http://localhost:8088/climbs?_expand=grade&_expand=type&userId=${summitUserObject.id}`)
            .then((response) => response.json())
            .then((climbArray) => {
                setFilteredClimbs(climbArray);
            })
    }, [climbs]);


    /**/
    useEffect(() => {
        fetch(`http://localhost:8088/types`)
            .then((response) => response.json())
            .then((typeArray) => {
                setFilteredClimbs(typeArray);
            })
    }, []);

    /**/
    useEffect(() => {
        fetch(`http://localhost:8088/grades`)
            .then((response) => response.json())
            .then((gradeArray) => {
                setFilteredClimbs(gradeArray);
            })
    }, []);

    /**/
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
                            <div className="individualClimb" key={`climb-${climb.id}`}>
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
                                        <div ><b>Completed:</b> {climb.completed ? "✅" : "No"}</div>
                                        <div ><b>Bucket List:</b> {climb.bucketList ? "✅" : "No"}</div>
                                    </div>
                                </section>
                                <section>
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
                                </section>
                            </div>
                        );
                    })}
                </ul>
            </article>
        </>
    );
};