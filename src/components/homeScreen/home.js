import { useNavigate } from "react-router-dom"
import "./home.css"
import React from "react"
import { Image } from "react-bootstrap"

export const Home = () => {

return(
    <>
    <h1 className="homePageTitle">Welcome to Summit City</h1>
    <h2 className="summitCityDescription">Summit City is your one stop shop to find hiking 
    and climbing activities in Grand Teton National Park. Please go to our activities page and select hikes and climbs that
    you would like to add to your profile. You can either mark them as completed or bucket list for activities that you would 
    like to try in the future.</h2>
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
