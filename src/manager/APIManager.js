/*Get Requests*/
export const getUsers = () => {
    return fetch(`http://localhost:8088/users`)
    .then(response => response.json())
}

export const getAllEmployees = () => {
    return fetch(`http://localhost:8088/users?isStaff=true`)
        .then(res => res.json())
}

//Put Requests
export const saveUsersEdit = (profile) => {
    return fetch(`http://localhost:8088/users/${profile.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(profile)
    })
        .then(response => response.json())
}


//Post Requests
export const saveHike = (hikeToSendToAPI) => {
    return fetch(`http://localhost:8088/hikes`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(hikeToSendToAPI)
    })
        .then(response => response.json())
}


export const saveClimb = (climbToSendToAPI) => {
    return fetch(`http://localhost:8088/climbs`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(climbToSendToAPI)
    })
        .then(response => response.json())
}
