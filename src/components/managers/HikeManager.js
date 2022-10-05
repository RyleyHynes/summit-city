/* Getter Functions for all hikes*/
export const getAllHikes = () => {
    return fetch("http://localhost:8000/hikes", {
        headers: {
            'Authorization': `Token ${localStorage.getItem('summit_token')}`
        }
    })
    .then(res => res.json())
}

/* Getter Functions for single hike*/
export const getSingleHike = (hikeId) => {
    return fetch(`http://localhost:8000/hikes/${hikeId}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("summit_token")}`
        }
    })
        .then(response => response.json())
}

export const getSearchHikes = (search) => {
    return fetch(`http://localhost:8000/hikes?search=${search}`, {
        method: "GET",
        headers: {
            'Authorization': `Token ${localStorage.getItem('summit_token')}`
        }
    })
        .then(res => res.json())
}

/* POST Function for creation of new hike*/
export const createNewHike = (hike) => {
    return fetch("http://localhost:8000/hikes", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Token ${localStorage.getItem('summit_token')}`
        },
        body: JSON.stringify(hike)
    })
        .then(res => res.json())
}

/* PUT Function for updating an existing hike*/
export const updateHike = (hikeId, hike) => {
    return fetch(`http://localhost:8000/hikes/${hikeId}`, {
        method: "PUT",
        headers: {
            "Authorization": `Token ${localStorage.getItem("summit_token")}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(hike)
    })
}

/* DELETE Function for existing hike*/
export const deleteHike = (hikeId) => {
    return fetch(`http://localhost:8000/hikes/${hikeId}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Token ${localStorage.getItem("summit_token")}`
        }
    })
}