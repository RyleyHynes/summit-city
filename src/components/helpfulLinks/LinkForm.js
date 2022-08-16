import React from "react"
import { ReactDOM } from "react"
import "./Links.css"

export const LinkForm = () => {

    return (
        <>
            <div className="helpfulLinksContainer">
                <div className="card">
                    <div className="content">
                        <div className="front">
                            <h2 className="flipCardTitle">Gear</h2>
                            <img
                                className="flipCardPicture"
                                src="https://i0.wp.com/engearment.com/wp-content/uploads/2019/10/gear-layout-climbing.jpg"
                                alt="gear"
                            />
                        </div>
                        <div className="back">
                            <h2>Gear</h2>
                            <ul>
                                <li><a className="link" href="https://www.rei.com/" target="_blank" rel="noopener noreferrer"> REI</a></li>
                                <li><a href="https://www.backcountry.com/" target="_blank" rel="noopener noreferrer"> Back Country</a></li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="card">
                    <div className="content">
                        <div className="front">
                        <h2 className="flipCardTitle">Contact Information</h2>
                            <img
                                className="flipCardPicture"
                                src="https://www.techthirsty.com/wp-content/uploads/2022/05/best-satellite-phone-for-hiking.jpg"
                                alt="contactInformation"
                            />
                        </div>
                        <div className="back">
                            <h2> Contact Information</h2>
                            <ul>
                                <li>Emergency Calls: (307)-739-3301</li>
                                <li>911 works for texting locally</li>
                                <li>Visitor Info: (307)-739-3399</li>
                                <li>Email: gtre_info@nps.gov</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="card">
                    <div className="content">
                        <div className="front">
                        <h2 className="flipCardTitle">Ranger Help</h2>
                            <img
                                className="flipCardPicture"
                                src="https://assets.thesca.org/styles/840x480/s3/s3fs-public/ranger-jiminez.jpg?itok=PUKFTeEo"
                                alt="rangerHelp"
                            />
                        </div>
                        <div className="back">
                            <h2>Ranger Help</h2>
                            <ul>
                                <li><a href="https://www.nps.gov/grte/planyourvisit/jlrangerstation.htm" target="_blank" rel="noopener noreferrer"> Jenny Lake Ranger Station</a></li>
                                <li><a href="https://www.google.com/maps/place/Jenny+Lake+Ranger+Station/@43.7507141,-110.7261729,1048m/data=!3m1!1e3!4m5!3m4!1s0x0:0xa17f567dfd8ab327!8m2!3d43.7522206!4d-110.7222604?shorturl=1" target="_blank" rel="noopener noreferrer"> Jenny Lake Ranger Station Map</a></li>
                                <li><a href="https://tetonclimbingaccidents.blogspot.com/" target="_blank" rel="noopener noreferrer"> Emergency Procedures</a></li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="card">
                    <div className="content">
                        <div className="front">
                        <h2 className="flipCardTitle">Camping</h2>
                            <img
                                className="flipCardPicture"
                                src="https://live.staticflickr.com/7010/6803427133_8b05e31bee_b.jpg"
                                alt="camping"
                            />
                        </div>
                        <div className="back">
                            <h2>Camping</h2>
                            <ul>
                                <li><a href="https://www.nps.gov/grte/planyourvisit/back.htm" target="_blank" rel="noopener noreferrer"> Backcountry Camping Permits</a></li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="card">
                    <div className="content">
                        <div className="front">
                        <h2 className="flipCardTitle">Climbing</h2>
                            <img
                                className="flipCardPicture"
                                src="https://extremenomads.life/wp-content/uploads/2019/04/climbing-grand-teton.jpg"
                                alt="climbing"
                            />
                        </div>
                        <div className="back">
                            <h2>Climbing</h2>
                            <ul>
                                <p><a href="https://www.nps.gov/grte/planyourvisit/climb.htm" target="_blank" rel="noopener noreferrer"> GTNP Climbing Information</a></p>
                                <p><a href="http://tetonclimbing.blogspot.com/" target="_blank" rel="noopener noreferrer"> Climbing and Backcountry Blog</a></p>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="card">
                    <div className="content">
                        <div className="front">
                        <h2 className="flipCardTitle">Weather</h2>
                            <img
                                className="flipCardPicture"
                                src="https://www.clairethomasphotography.com/wp-content/uploads/2020/06/CT.Wyoming2016.3893-2.jpg"
                                alt="weather"
                            />
                        </div>
                        <div className="back">
                            <h2>Weather</h2>
                            <ul>
                                <li><a href="https://forecast.weather.gov/MapClick.php?lat=43.83150500000005&lon=-110.72762499999996#.YqKalpPMLPY" target="_blank" rel="noopener noreferrer">NWS Forecast(GTNP)</a></li>
                                <li><a href="https://forecast.weather.gov/MapClick.php?lat=43.4776&lon=-110.7625#.YqKasZPMLPY" target="_blank" rel="noopener noreferrer">NWS Forecast(JXN)</a></li>
                                <li><a href="https://forecast.weather.gov/MapClick.php?lat=43.739&lon=-110.8018&lg=english&&FcstType=text#.YqKbTpPMLPY" target="_blank" rel="noopener noreferrer">NWS Extended Forecast 11,600'</a></li>
                                <li><a href="https://forecast.weather.gov/MapClick.php?lat=43.739&lon=-110.8018&unit=0&lg=english&FcstType=graphical" target="_blank" rel="noopener noreferrer">NWS Hourly Forecast 11,600'</a></li>
                                <li><a href="https://forecast.weather.gov/product.php?site=RIW&issuedby=RIW&product=AFD&format=CI&version=1&glossary=1" target="_blank" rel="noopener noreferrer">NWS Forecast Discussion</a></li>
                                <li><a href="https://wyomingwhiskey.blogspot.com/p/forecasts-observations-nwss.html" target="_blank" rel="noopener noreferrer">Wyoming Whiskey Weather</a></li>
                                <li><a href="https://www.timeanddate.com/astronomy/usa/jackson-wy" target="_blank" rel="noopener noreferrer">Sun, Moon, Planet Times in JXN</a></li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="card">
                    <div className="content">
                        <div className="front">
                        <h2 className="flipCardTitle">Social Media</h2>
                            <img
                                className="flipCardPicture"
                                src="https://media.smallbiztrends.com/2022/01/social-audio.png"
                                alt="socialMedia"
                            />
                        </div>
                        <div className="back">
                            <h2>Social Media</h2>
                            <ul>
                                <li><a href="https://twitter.com/GrandTetonNPS" target="_blank" rel="noopener noreferrer"> GTNP Twitter</a></li>
                                <li><a href="https://www.instagram.com/grandtetonnps/?hl=en" target="_blank" rel="noopener noreferrer">GTNP Instagram</a></li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="card">
                    <div className="content">
                        <div className="front">
                        <h2 className="flipCardTitle">Photography</h2>
                            <img
                                className="flipCardPicture"
                                src="http://jacksonhole-traveler-production.s3.amazonaws.com/wp-content/uploads/2015/04/photography-grand-teton-national-park-1280x853.jpg"
                                alt="photography"
                            />
                        </div>
                        <div className="back">
                            <h2>Photography</h2>
                            <ul>
                                <li><a href="https://www.bestofthetetons.com/" target="_blank" rel="noopener noreferrer">Best of the Tetons</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}