/* Getter Functions for all tags and single tag*/
export const getAllTags = () => {
    return fetch("http://localhost:8000/tags", {
        headers: {
            'Authorization': `Token ${localStorage.getItem('summit_token')}`
        }
    })
    .then(res => res.json())
}

/* Getter Functions for single tag*/
export const getSingleTag = (tagId) => {
    return fetch(`http://localhost:8000/tags/${tagId}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("summit_token")}`
        }
    })
        .then(response => response.json())
}

// export const getSearchTags = (search) => {
//     return fetch(`http://localhost:8000/tags?search=${search}`, {
//         method: "GET",
//         headers: {
//             'Authorization': `Token ${localStorage.getItem('summit_token')}`
//         }
//     })
//         .then(res => res.json())
// }

/* POST Function for creation of new tag*/
export const createNewTag = (tag) => {
    return fetch("http://localhost:8000/tags", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Token ${localStorage.getItem('summit_token')}`
        },
        body: JSON.stringify(tag)
    })
        .then(res => res.json())
}

/* PUT Function for updating an existing tag*/
export const updateTag = (tagId, tag) => {
    return fetch(`http://localhost:8000/tags/${tagId}`, {
        method: "PUT",
        headers: {
            "Authorization": `Token ${localStorage.getItem("summit_token")}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(tag)
    })
}

/* DELETE Function for existing tag*/
export const deleteTag = (tagId) => {
    return fetch(`http://localhost:8000/tags/${tagId}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Token ${localStorage.getItem("summit_token")}`
        }
    })
}