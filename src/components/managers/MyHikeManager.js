/*Getter Function for myHikes*/
export const getMyHikes = () => {
    return fetch(`http://localhost:8000/my_hikes`, {
        headers: {
            'Authorization': `Token ${localStorage.getItem('summit_token')}`
        }
    })
        .then(res => res.json())
}


export const getSearchMyHikes = (search) => {
    return fetch(`http://localhost:8000/my_hikes?user=${localStorage.getItem('summit_user')}&search=${search}`, {
        method: "GET",
        headers: {
            'Authorization': `Token ${localStorage.getItem('summit_token')}`
        }
    })
        .then(res => res.json())
}

/*POST Function for new creation of myHike */
export const createMyHike = (hike) => {
    return fetch("http://localhost:8000/my_hikes", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Token ${localStorage.getItem('summit_token')}`
        },
        body: JSON.stringify(hike)
    })
        .then(res => res.json())
}

/*Delete Function for MyHike */
export const deleteMyHike = (hikeId) => {
    return fetch(`http://localhost:8000/my_hikes/${hikeId}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Token ${localStorage.getItem("summit_token")}`
        }
    })
}