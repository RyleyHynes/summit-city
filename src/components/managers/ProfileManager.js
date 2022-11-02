/*Getter function for all profiles*/
export const getAllProfiles = () => {
    return fetch("http://localhost:8000/profiles", {
        headers: {
            "Authorization": `Token ${localStorage.getItem("summit_token")}`
        }
    })
        .then(response => response.json())
}

/*Getter function for profile with current users shows*/
export const getProfileHikes = (profileId) => {
    return fetch(`http://localhost:8000/my_hikes?user=${profileId}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("summit_token")}`
        }
    })
        .then(response => response.json())
}

/*Getter function for profile with current users shows*/
export const getProfileClimbs = (profileId) => {
    return fetch(`http://localhost:8000/my_hikes?user=${profileId}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("summit_token")}`
        }
    })
        .then(response => response.json())
}

/*Getter function for a single profile*/
export const getSingleProfile = (profileId) => {
    return fetch(`http://localhost:8000/profiles/${profileId}`, {
        headers: {
            'Authorization': `Token ${localStorage.getItem('summit_token')}`
        }
    })
        .then(res => res.json())
}

/*PUT function to update the profile*/
export const updateProfile = (profile, profileId) => {
    return fetch(`http://localhost:8000/profiles/${profileId}`, {
        method: "PUT",
        headers: {
            "Authorization": `Token ${localStorage.getItem("summit_token")}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(profile)
    })
}

/*PUT function to edit if the user is active*/
export const editUserActive = (user) => {
    return fetch(`http://localhost:8000/profiles/${user.id}/user_active`, {
        method: "PUT",
        headers: {
            "Authorization": `Token ${localStorage.getItem("summit_token")}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })
}

/*PUT function to edit if the user staff status*/
export const editUserStatus = (user, status) => {
    return fetch(`http://localhost:8000/profiles/${user.id}/user_status`, {
        method: "PUT",
        headers: {
            "Authorization": `Token ${localStorage.getItem("summit_token")}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ is_staff: status })
    })
}

/*PUT function to update demotion status*/
export const checkDemoted = (user) => {
    return fetch(`http://localhost:8000/demotes?demotedUser=${user.id}`, {
        headers: {
            'Authorization': `Token ${localStorage.getItem('summit_token')}`
        }
    }).then(res => res.json())
}


/*POST function to demote a staff member*/
export const createDemotion = (demote) => {
    return fetch('http://localhost:8000/demotes', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${localStorage.getItem('summit_token')}`
        },
        body: JSON.stringify(demote)
    }).then(res => res.json())
}

/*PUT function to update a demotion*/
export const updateDemotion = (demote) => {
    return fetch(`http://localhost:8000/demotes/${demote.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${localStorage.getItem('summit_token')}`
        },
        body: JSON.stringify(demote)
    })
}

/*GET Function to fetch the deactivated users*/
export const checkDeactive = (user) => {
    return fetch(`http://localhost:8000/deactives?deactivatedUser=${user.id}`, {
        headers: {
            'Authorization': `Token ${localStorage.getItem('summit_token')}`
        }
    })
        .then(res => res.json())
}

/*POST function to deactivate a user*/
export const createDeactive = (deactive) => {
    return fetch('http://localhost:8000/deactives', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${localStorage.getItem('summit_token')}`
        },
        body: JSON.stringify(deactive)
    }).then(res => res.json())
}

/*PUT function to edit user deactivation*/
export const updateDeactive = (deactive) => {
    return fetch(`http://localhost:8000/deactives/${deactive.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${localStorage.getItem('summit_token')}`
        },
        body: JSON.stringify(deactive)
    })
}