/*Getter Function for myClimbs*/
export const getMyClimbs = () => {
    return fetch(`http://localhost:8000/my_climbs`, {
        headers: {
            'Authorization': `Token ${localStorage.getItem('summit_token')}`
        }
    })
        .then(res => res.json())
}


export const getSearchMyClimbs = (search) => {
    return fetch(`http://localhost:8000/my_climbs?user=${localStorage.getItem('summit_user')}&search=${search}`, {
        method: "GET",
        headers: {
            'Authorization': `Token ${localStorage.getItem('summit_token')}`
        }
    })
        .then(res => res.json())
}

/*POST Function for new creation of myClimb */
export const createMyClimb = (climb) => {
    return fetch("http://localhost:8000/my_climbs", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Token ${localStorage.getItem('summit_token')}`
        },
        body: JSON.stringify(climb)
    })
        .then(res => res.json())
}

/*Delete Function for MyClimb */
export const deleteMyClimb = (id) => {
    return fetch(`http://localhost:8000/my_climbs/${id}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Token ${localStorage.getItem("summit_token")}`
        }
    })
}