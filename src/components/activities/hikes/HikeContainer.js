import { HikeSearch, hikeSearch } from "./hikeSearch"
import { useState } from "react"
import { hikeList } from "./SessionList"
import { HikeList } from "./HikeList"
/* Parent container that will maintain the state since siblings cannot directly communicate with each other */

export const SessionContainer  = () => {
    const [searchHikeTerms, setSearchHikeTerms] = useState("")
    //returns two child components. setterFunction => SessionSearch.js, searchState => SessionList.js
    return <>
        <div>
            <HikeSearch setterFunction={setSearchHikeTerms} />
            <HikeList searchTermState={searchHikeTerms} /> 
        </div>
    </>
}