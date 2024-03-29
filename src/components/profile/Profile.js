import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getProfileHikes,getProfileClimbs, getSingleProfile } from "../managers/ProfileManager"
import { FaUserCircle } from 'react-icons/fa';
import Image from 'react-bootstrap/Image'
import "./Profile.css"


export const ProfileDetails = (userId) => {
    /*Invoking useNavigate and assigning it to navigate so that we can navigate our application programmatically*/
    const navigate = useNavigate()
    const [profile, setProfile] = useState([])
    const [hikes, setHikes] = useState([])
    const [climbs, setClimbs] = useState([])


    /*invoking useParams and assigning its return value to profileId. This hook returns an object of 
    key/value pairs of the dynamic params from the current URL that were matched by the <Route path>*/
    const { profileId } = useParams()

    /*Get current user from local storage*/
    const currentUserId = parseInt(localStorage.getItem('user_id'))

    //function to get a single profile and that profiles hikes and set them both into respective states
    const getProfileWithHikes = () => {
        getSingleProfile(profileId).then(data => setProfile(data))
        getProfileHikes(profileId).then(setHikes)
    }

    //function to get a single profile and that profiles climbs and set them both into respective states
    const getProfileWithClimbs = () => {
        getSingleProfile(profileId).then(data => setProfile(data))
        getProfileClimbs(profileId).then(setClimbs)
    }

    
    //use effect to invoke the getProfileWithHikes and getProfileWithClimbs while watching the profileId and re-rendering when it changes
    useEffect(() => {
        getProfileWithHikes()
        getProfileWithClimbs()
    }, [profileId])



    //HTML to display the current users profile
    return (
        <article className="profiles">
            <section key={`profile--${profile.id}`} className="profile">
                <div>
                    <header>
                        {
                            profile.profile_image === ""
                                ? <figure>
                                    <span>
                                        <FaUserCircle size={'3rem'} />
                                    </span>
                                </figure>
                                : <Image className="image" roundedCircle src={`http://localhost:8000${profile.profile_image}`} alt="usersProfileImage" />
                        }
                    </header>
                    <div className="profile__info">
                        <div className="profile__info"><b>Name</b>: {profile.user?.first_name} {profile.user?.last_name}</div>
                        <div className="profile__info"><b>UserName</b>: {profile.user?.username}</div>
                        <div className="profile__info"><b>Email</b>: {profile.user?.email}</div>
                        {/* displays the number of hikes and climbs they have added to their custom activity list */}
                        {/* {currentUserId === profile.user?.id
                            ? <div><b>Hike Count</b>: {shows[0]?.shows?.length}</div>
                            : <></>
                        } */}

                        <footer>
                            {/* displays type of user */}
                            {
                                profile.user?.is_staff === true
                                    ? <div className="profile__usertype"><b>Staff</b></div>
                                    : <div className="profile__usertype"><b>Author</b></div>
                            }
                        </footer>
                    
                    {/* button to navigate to the edit profile form */}
                    <button className="button is-warning" onClick={() => navigate(`/profiles/${profile.user?.id}/edit`)}>Edit Info</button>
                    </div>
                </div>
            </section>
        </article>
    )
}