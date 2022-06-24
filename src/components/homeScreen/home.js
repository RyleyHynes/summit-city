import { useNavigate } from "react-router-dom"
import "./home.css"

export const Home = () => {

    const navigate = useNavigate()

    return <>
        <div className="home">
            <h2 className="subTitle">Select Your Activity</h2>


            <>
                {
                    <button className="alterButton" onClick={() => navigate("/hikes")}>Hiking</button>
                }
                {
                    <button className="alterButton" onClick={() => navigate("/climbs")}>Rock Climbing</button>
                }
            </>
        </div>


    </>


}



  // return <ul className="navbar">
    //     <li className="home__item active">
    //         <Link className="home__link" to="/hikes">Hikes</Link>
    //     </li>
    //     <li className="home__item active">
    //         <Link className="home__link" to="/climbs">Climbs</Link>
    //     </li>
    // </ul >