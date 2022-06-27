import { useNavigate } from "react-router-dom"
import "./home.css"
import React from "react"

export const Home = () => {

    const navigate = useNavigate()

    return <>
        <div className="home">

            <h2 className="subTitle">Select Your Activity</h2>

            <>
            <section className="buttonsAndPictures">
                <fieldset>
                    {
                        <div>
                        <button className="hikingButton" onClick={() => navigate("/hikes")}>Hiking</button>
                        <img onClick={() => navigate("/hikes")} 
                        className="meadows"
                        src="/images/hike.jpg"
                        alt="meadows"
                    />
                    </div>
                    }                    
                </fieldset>
                <fieldset>
                    {
                        <div>
                        <button className="climbingButton" onClick={() => navigate("/climbs")}>Rock Climbing</button>
                        <img
                        onClick={() => navigate("/climbs")}
                        className="bellyRoll"
                        src="/images/climb.jpg"
                        alt="bellyRoll" 
                    />
                    </div>
                    }                  
                </fieldset>
                </section>
            </>
        </div>


    </>


}
