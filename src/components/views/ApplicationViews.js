import { Route, Routes, useNavigate } from "react-router-dom"
import { ClimbContainer } from "../activities/climbs/ClimbContainer"
import { ClimbEdit } from "../activities/climbs/ClimbEdit"
import { ClimbForm } from "../activities/climbs/ClimbForm"
import { ClimbList } from "../activities/climbs/ClimbList"
import { ClimbSearch } from "../activities/climbs/ClimbSearch"
import { HikeContainer } from "../activities/hikes/HikeContainer"
import { HikeEdit } from "../activities/hikes/HikeEdit"
import { HikeForm } from "../activities/hikes/HikeForm"
import { HikeSearch } from "../activities/hikes/HikeSearch"
import { Links } from "../helpfulLinks/Links"
import { Home } from "../homeScreen/home"
import { Profile } from "../profile/Profile"
import "./ApplicationViews.css"
import { Authorized } from "./Authorized"





export const ApplicationViews = ({token, setToken, setUserId, userId}) => {
    const navigate = useNavigate()
    return <>
    <Routes>
        <Route path="/login" element={<Login setToken={setToken} setUserId={setUserId} />} />
			<Route path="/register" element={<Register setToken={setToken} setUserId={setUserId} />} />
			<Route element={<Authorized token={token} />}>
				
			<Route path="/home" element={<Home />} />

            <Route path="links" element={<Links />} />
            <Route path="/profiles" element={<ProfileList />} />
			<Route path="/profiles/:profileId" element={<ProfileDetails />} />
			<Route path="/profiles/:profileId/edit" element={<EditProfile />} />

            <Route path="hike/create" element={<HikeForm />} />
            <Route path="hikes" element={<HikeContainer />} />
            <Route path="hikes" element={<HikeSearch />} />
            <Route path="hikes/:hikeId/edit" element={<HikeEdit />} />

            <Route path="climb/create" element={<ClimbForm />} />
            <Route path="climbs" element={<ClimbContainer />} />
            <Route path="climbs" element={<ClimbSearch />} />
            <Route path="climbs/:climbId/edit" element={<ClimbEdit />} />
            <Route path="climbs" element={<ClimbList />} />
    </Routes>
    </>
}
