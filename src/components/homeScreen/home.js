import { useNavigate } from "react-router-dom"

export const Home = () => {
    
    const navigate = useNavigate()

    return <>
        <h2>Summit</h2>

        
            <>
                {
                    <button onClick={() => navigate("/hikes")}>Hiking</button>
                }
                {
                    <button onClick={() => navigate("/climbs")}>Rock Climbing</button>
                }
            </>
            
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