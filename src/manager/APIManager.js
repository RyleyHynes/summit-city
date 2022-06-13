export const getClimbs = () => {
    return fetch(`http://localhost:8088/climbs`)
    .then(response => response.json())
    
}

export const getHikes = () => {
    return fetch(`http://localhost:8088/hikes`)
    .then(response => response.json())
}