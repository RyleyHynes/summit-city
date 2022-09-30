/* Getter Functions for all climbs and single climb*/
export const getAllClimbs = () => {
    return fetch("http://localhost:8000/climbs", {
        headers: {
            'Authorization': `Token ${localStorage.getItem('summit_token')}`
        }
    })
    .then(res => res.json())
}

/* Getter Functions for single climb*/
export const getSingleClimb = (climbId) => {
    return fetch(`http://localhost:8000/climbs/${climbId}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("summit_token")}`
        }
    })
        .then(response => response.json())
}

export const getSearchClimbs = (search) => {
    return fetch(`http://localhost:8000/climbs?search=${search}`, {
        method: "GET",
        headers: {
            'Authorization': `Token ${localStorage.getItem('summit_token')}`
        }
    })
        .then(res => res.json())
}

/* POST Function for creation of new climb*/
export const createNewClimb = (climb) => {
    return fetch("http://localhost:8000/climbs", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Token ${localStorage.getItem('summit_token')}`
        },
        body: JSON.stringify(climb)
    })
        .then(res => res.json())
}

/* PUT Function for updating an existing climb*/
export const updateClimb = (climbId, climb) => {
    return fetch(`http://localhost:8000/climbs/${climbId}`, {
        method: "PUT",
        headers: {
            "Authorization": `Token ${localStorage.getItem("summit_token")}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(climb)
    })
}

/* DELETE Function for existing climb*/
export const deleteClimb = (climbId) => {
    return fetch(`http://localhost:8000/climbs/${climbId}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Token ${localStorage.getItem("summit_token")}`
        }
    })
}