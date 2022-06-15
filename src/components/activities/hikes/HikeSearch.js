// in the {} is the name of the key, now the ticketSearch component has access to the set function, via the property of setterFunction.
// react takes all of the props and makes them into a single object, they object has keys and values


export const HikeSearch = ({setterFunction}) => {
    return (
        <div>
            <input 
                onChange={
                    (changeEvent) => {
                        setterFunction(changeEvent.target.value)
                    }
                }
            type="text" placeholder="Enter search terms" />
        </div>
    )
}