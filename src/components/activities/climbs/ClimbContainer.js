import { useState } from "react"
import { ClimbList } from "./ClimbList"
import { ClimbSearch } from "./ClimbSearch"


/* Parent container that will maintain the state since siblings cannot directly 
communicate with each other */
export const ClimbContainer  = () => {
    const [searchClimbTerms, setSearchClimbTerms] = useState("")
    /*returns two child components. setterFunction => climbSearch.js, searchState => 
    climbList.js*/
    
    return <>
        <div>
            <ClimbSearch setterFunction={setSearchClimbTerms} />
            <ClimbList searchTermState={searchClimbTerms} /> 
        </div>
    </>
}