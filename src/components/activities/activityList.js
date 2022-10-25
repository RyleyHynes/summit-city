import { useNavigate } from "react-router-dom"

export const Activities = () => {
    const navigate = useNavigate()

    return <>
        <div className="home">

            <h2 className="subTitle">Select Your Activity</h2>

            <>
            <section className="buttonsAndPictures">
                <fieldset>
                    {
                        <div>
                        <button className="hikingButton" onClick={() => navigate("/hikeList")}>Hiking</button>
                        <img onClick={() => navigate("/hikeList")} 
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
                        <button className="climbingButton" onClick={() => navigate("/climbList")}>Rock Climbing</button>
                        <img
                        onClick={() => navigate("/climbList")}
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