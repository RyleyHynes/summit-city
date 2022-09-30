/* Getter Functions for all hike skill levels and single hike skill level*/
export const getAllHikeSkillLevels = () => {
    return fetch("http://localhost:8000/hike_skill_levels", {
        headers: {
            'Authorization': `Token ${localStorage.getItem('summit_token')}`
        }
    })
    .then(res => res.json())
}

/* Getter Functions for single hike skill level*/
export const getSingleHikeSkillLevel = (skillLevelId) => {
    return fetch(`http://localhost:8000/hike_skill_levels/${skillLevelId}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("summit_token")}`
        }
    })
        .then(response => response.json())
}

// export const getSearchHikeSkillLevels = (search) => {
//     return fetch(`http://localhost:8000/hike_skill_levels?search=${search}`, {
//         method: "GET",
//         headers: {
//             'Authorization': `Token ${localStorage.getItem('summit_token')}`
//         }
//     })
//         .then(res => res.json())
// }

/* POST Function for creation of new hike skill level*/
export const createNewHikeSkillLevel = (hikeSkillLevel) => {
    return fetch("http://localhost:8000/hike_skill_levels", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Token ${localStorage.getItem('summit_token')}`
        },
        body: JSON.stringify(hikeSkillLevel)
    })
        .then(res => res.json())
}

/* PUT Function for updating an existing hike skill level*/
export const updateHikeSkillLevel = (hikeSkillLevelId, hikeSkillLevel) => {
    return fetch(`http://localhost:8000/hike_skill_levels/${hikeSkillLevelId}`, {
        method: "PUT",
        headers: {
            "Authorization": `Token ${localStorage.getItem("summit_token")}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(hikeSkillLevel)
    })
}

/* DELETE Function for existing hike skill level*/
export const deleteHikeSkillLevel = (hikeSkillLevelId) => {
    return fetch(`http://localhost:8000/hike_skill_levels/${hikeSkillLevelId}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Token ${localStorage.getItem("summit_token")}`
        }
    })
}