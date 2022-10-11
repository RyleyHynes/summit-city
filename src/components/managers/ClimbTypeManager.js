/* Getter Functions for all climb types*/
export const getAllClimbTypes = () => {
    return fetch("http://localhost:8000/climb_types", {
        headers: {
            'Authorization': `Token ${localStorage.getItem('summit_token')}`
        }
    })
    .then(res => res.json())
}

/* Getter Functions for single climb type*/
export const getSingleClimbType = (climbTypeId) => {
    return fetch(`http://localhost:8000/climb_types/${climbTypeId}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("summit_token")}`
        }
    })
        .then(response => response.json())
}

export const getSearchClimbTypes = (search) => {
    return fetch(`http://localhost:8000/climb_types?search=${search}`, {
        method: "GET",
        headers: {
            'Authorization': `Token ${localStorage.getItem('summit_token')}`
        }
    })
        .then(res => res.json())
}

/* POST Function for creation of new climb type*/
export const createNewClimbType = (climbType) => {
    return fetch("http://localhost:8000/climb_types", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Token ${localStorage.getItem('summit_token')}`
        },
        body: JSON.stringify(climbType)
    })
        .then(res => res.json())
}

/* PUT Function for updating an existing climb type*/
export const updateClimbType = (climbTypeId, climbType) => {
    return fetch(`http://localhost:8000/climb_types/${climbTypeId}`, {
        method: "PUT",
        headers: {
            "Authorization": `Token ${localStorage.getItem("summit_token")}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(climbType)
    })
}

/* DELETE Function for existing climb*/
export const deleteClimbType = (climbTypeId) => {
    return fetch(`http://localhost:8000/climb_types/${climbTypeId}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Token ${localStorage.getItem("summit_token")}`
        }
    })
}