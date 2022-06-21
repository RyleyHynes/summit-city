import { useEffect, useState } from "react"
import { useNavigate } from "react-router"
import { Link } from "react-router-dom"
import "./Climb.css"

export const ClimbList = ({ searchTermState }) => {

    const [climbs, setClimbs] = useState([])
    //we do not want to modify the array of climbs from the api, but we still want to display a list of climbs. creating another variable of filteredClimbs
    const [filteredClimbs, setFilteredClimbs] = useState([])
    //added the useNavigate hook for the user Added climb button 
    const navigate = useNavigate()

    // get summitUser out of local storage
    const localSummitUser = localStorage.getItem("summit_user")
    const summitUserObject = JSON.parse(localSummitUser)


    const getAllClimbs = () => {
        fetch(`http://localhost:8088/climbs?_expand=userId=${summitUserObject.id}`)
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
        fetch(`http://localhost:8088/climbs?_expand=userId=${summitUserObject.id}`)
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
                                    <div className="grade">Grade: {climb?.grade?.rating}</div>
                                    <div className="location">
                                        Location: {climb.location}
                                    </div>
                                    <div className="description">Description: {climb.description}</div>
                                </section>
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