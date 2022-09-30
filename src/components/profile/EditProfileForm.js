import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router"
import { getSingleProfile, updateProfile } from "../managers/ProfileManager"



export const EditProfile = () => {
    //assigning the profile state to an object of key value pairs that are all set to empty strings
    const [profile, setEditProfile] = useState({
        first_name: "",
        last_name: "",
        email: "",
        username: "",
        profile_image: ""
    })

    /*invoking useParams and assigning its return value to profileId. This hook returns an object of 
    key/value pairs of the dynamic params from the current URL that were matched by the <Route path>*/
    const { profileId } = useParams()
    /*Invoking useNavigate and assigning it to navigate so that we can navigate our application programmatically*/
    const navigate = useNavigate()

    //use effect to getSingle profile data and set that data in the profile state 
    useEffect(() => {
        getSingleProfile(profileId).then(data => {
            data.first_name=data.user.first_name
            data.last_name=data.user.last_name
            data.email=data.user.email
            data.username=data.user.username
            data.profile_image=data.user.profile_image

            setEditProfile(data)})
    }, [])

    //function that invokes the PUT method updateProfile and navigates back to the users profile
    const handleSubmit = (evt) => {
        evt.preventDefault() //preventing browser reload/refresh
        updateProfile(profile, profileId).then((data) => {
            navigate(`/profiles/${profile.id}`)
        })
    }

    //function to change copy of the initial profile state and set the new profile value to the state
    const changeProfileState = (event) => {
        const profileCopy = { ...profile } //creating a copy of the profile state
        profileCopy[event.target.name] = event.target.value
        setEditProfile(profileCopy)
    }

        //function to turn picture into a sting and then set it into the profile state
        const createImageString = (event) => {
            getBase64(event.target.files[0], (base64ImageString) => {
                const copy = { ...profile } //creating a copy of the profile state
                copy.profile_image = base64ImageString
                setEditProfile(copy)
            })
        }
        //function to upload a picture from computer
        const getBase64 = (file, callback) => {
            const reader = new FileReader();
            reader.addEventListener('load', () => callback(reader.result));
            reader.readAsDataURL(file);
        }

        //HTML for the edit profile form 
        return <>
            <form className="showForm">
                <section className="editProfileSection">
                <h2 className="showForm_title"><b>Edit Profile</b></h2>
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="first_name" className="profile_edit"><b>First Name: </b></label>
                        <div className="control">
                            <input className="input" required autoFocus
                                type="text"
                                value={profile.first_name}
                                name="first_name"
                                //When the value changes the changeProfileState function is triggered
                                onChange={changeProfileState} />
                        </div>
                    </div>
                </fieldset>

                <fieldset>
                    <div className="form-group">
                        <label htmlFor="last_name" className="profile_edit"><b>Last Name: </b></label>
                        <div className="control">
                            <input className="input" required autoFocus
                                type="text"
                                value={profile.last_name}
                                name="last_name"
                                onChange={changeProfileState} />
                        </div>
                    </div>
                </fieldset>

                <fieldset>
                    <div className="form-group">
                        <label htmlFor="email" className="profile_edit"><b>Email: </b></label>
                        <div className="control">
                            <input className="input" required autoFocus
                                type="text"
                                value={profile.email}
                                name="email"
                                onChange={changeProfileState} />
                        </div>
                    </div>
                </fieldset>

                <fieldset>
                    <div className="form-group">
                        <label htmlFor="username" className="profile_edit"><b>UserName: </b></label>
                        <div className="control">
                            <input className="input" required autoFocus
                                type="text"
                                value={profile.username}
                                name="username"
                                onChange={changeProfileState} />
                        </div>
                    </div>
                </fieldset>

                <fieldset>
                <h3 className="profile_edit">Choose Profile Image:</h3>
                <input type="file" id="data" name="action_pic" onChange={createImageString} />
                <input type="hidden" name="data" value={profile.profile_image} /> 
                </fieldset>

                
                <button type="submit"
                    onClick={handleSubmit} //when save is clicked the handleSubmit function is triggered
                    className="button is-success">
                    Save
                </button>

                {/* when cancel is clicked it navigates the user back to the users profile */}
                <button onClick={() => navigate(`/profiles/${profile.id}`)}>Cancel</button>
                </section>
            </form>
        </>
}