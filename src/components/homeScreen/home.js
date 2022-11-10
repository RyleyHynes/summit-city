import { useNavigate } from "react-router-dom"
import "./home.css"
import React from "react"
import { Image } from "react-bootstrap"

export const Home = () => {

return(
    <>
    <h1 className="homePageTitle">Welcome to Summit City</h1>
    <h2 className="summitCityDescription">Summit City is your one stop shop to find hikes 
    and climbs in Grand Teton National Park. Once you have completed an activity you can add it to your list of completed hikes or climbs. Send it!</h2>
    <section>
        <fieldset>
            {
                <div>
                    <Image className="summitCityHomeImage"
                    src="/images/ryleyProfilePicture.jpg"
                    alt="ryleyProfilePicture"
                    />
                </div>
            }
        </fieldset>
    </section>
    </>
)
}
