import { HikeSearch} from "./HikeSearch"
import { useState } from "react"
import { HikeList } from "./HikeList"
/* Parent container that will maintain the state since siblings cannot directly communicate with each other */

export const HikeContainer  = () => {
    const [searchHikeTerms, setSearchHikeTerms] = useState("")
    //returns two child components. setterFunction => HikeSearch.js, searchState => HikeList.js
    
    return <>
        <div>
            <HikeSearch setterFunction={setSearchHikeTerms} />
            <HikeList searchTermState={searchHikeTerms} /> 
        </div>
    </>
}