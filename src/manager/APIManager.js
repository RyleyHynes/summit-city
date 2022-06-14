
//GET requests
export const getClimbs = () => {
    return fetch(`http://localhost:8088/climbs`)
    .then(response => response.json())
    
}

export const getHikes = () => {
    return fetch(`http://localhost:8088/hikes`)
    .then(response => response.json())
}

export const getUsers = () => {
    return fetch(`http://localhost:8088/users`)
    .then(response => response.json())
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
