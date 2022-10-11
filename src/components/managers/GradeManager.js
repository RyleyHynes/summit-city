/* Getter Functions for all grades*/
export const getAllGrades = () => {
    return fetch("http://localhost:8000/grades", {
        headers: {
            'Authorization': `Token ${localStorage.getItem('summit_token')}`
        }
    })
    .then(res => res.json())
}

/* Getter Functions for single grade*/
export const getSingleGrade = (gradeId) => {
    return fetch(`http://localhost:8000/grades/${gradeId}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("summit_token")}`
        }
    })
        .then(response => response.json())
}

export const getSearchGrades = (search) => {
    return fetch(`http://localhost:8000/grades?search=${search}`, {
        method: "GET",
        headers: {
            'Authorization': `Token ${localStorage.getItem('summit_token')}`
        }
    })
        .then(res => res.json())
}

/* POST Function for creation of new grade*/
export const createNewGrade = (grade) => {
    return fetch("http://localhost:8000/grades", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Token ${localStorage.getItem('summit_token')}`
        },
        body: JSON.stringify(grade)
    })
        .then(res => res.json())
}

/* PUT Function for updating an existing grade*/
export const updateGrade = (gradeId, grade) => {
    return fetch(`http://localhost:8000/grades/${gradeId}`, {
        method: "PUT",
        headers: {
            "Authorization": `Token ${localStorage.getItem("summit_token")}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(grade)
    })
}

/* DELETE Function for existing grade*/
export const deleteGrade = (gradeId) => {
    return fetch(`http://localhost:8000/grades/${gradeId}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Token ${localStorage.getItem("summit_token")}`
        }
    })
}