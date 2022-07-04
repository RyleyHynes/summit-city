/*Get Requests*/
export const getUsers = () => {
    return fetch(`http://localhost:8088/users`)
    .then(response => response.json())
}

export const getAllEmployees = () => {
    return fetch(`http://localhost:8088/users?isStaff=true`)
        .then(res => res.json())
}

export const getAllClimbs = () => {
    return fetch(`http://localhost:8088/climbs`)
        .then(res => res.json())
}
export const getAllUserClimbs = () => {
    return fetch(`http://localhost:8088/userClimbs`)
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
    return fetch(`http://localhost:8088/userHikes`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(hikeToSendToAPI)
    })
        .then(response => response.json())
}


export const saveClimb = (climbToSendToAPI) => {
    return fetch(`http://localhost:8088/userClimbs`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(climbToSendToAPI)
    })
        .then(response => response.json())
}
