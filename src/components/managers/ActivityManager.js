/* Getter Functions for all activities*/
export const getAllActivities = () => {
    return fetch("http://localhost:8000/activities", {
        headers: {
            'Authorization': `Token ${localStorage.getItem('summit_token')}`
        }
    })
    .then(res => res.json())
}

/* Getter Functions for single activity*/
export const getSingleActivity = (activityId) => {
    return fetch(`http://localhost:8000/activities/${activityId}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("summit_token")}`
        }
    })
        .then(response => response.json())
}

// export const getSearchActivities = (search) => {
//     return fetch(`http://localhost:8000/activities?search=${search}`, {
//         method: "GET",
//         headers: {
//             'Authorization': `Token ${localStorage.getItem('summit_token')}`
//         }
//     })
//         .then(res => res.json())
// }

/* POST Function for creation of new activity*/
export const createNewActivity = (activity) => {
    return fetch("http://localhost:8000/activities", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Token ${localStorage.getItem('summit_token')}`
        },
        body: JSON.stringify(activity)
    })
        .then(res => res.json())
}

/* PUT Function for updating an existing activity*/
export const updateActivity = (activityId, activity) => {
    return fetch(`http://localhost:8000/activities/${activityId}`, {
        method: "PUT",
        headers: {
            "Authorization": `Token ${localStorage.getItem("summit_token")}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(activity)
    })
}

/* DELETE Function for existing activity*/
export const deleteActivity = (activityId) => {
    return fetch(`http://localhost:8000/activities/${activityId}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Token ${localStorage.getItem("summit_token")}`
        }
    })
}