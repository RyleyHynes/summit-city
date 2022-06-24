import { Outlet, Route, Routes } from "react-router-dom"
import { ClimbContainer } from "../activities/climbs/ClimbContainer"
import { ClimbEdit } from "../activities/climbs/ClimbEdit"
import { ClimbForm } from "../activities/climbs/ClimbForm"
import { ClimbList } from "../activities/climbs/ClimbList"
import { ClimbSearch } from "../activities/climbs/ClimbSearch"
import { HikeContainer } from "../activities/hikes/HikeContainer"
import { HikeEdit } from "../activities/hikes/HikeEdit"
import { HikeForm } from "../activities/hikes/HikeForm"
import { HikeSearch } from "../activities/hikes/HikeSearch"
import { Home } from "../homeScreen/home"
import { Profile } from "../profile/Profile"
import "./ApplicationViews.css"




export const ApplicationViews = () => {
    return <Routes>
        <Route path="/" element={
            <>
                <h1 className="title--main">Summit City</h1>
                {/* <h2 className="chooseActivity">Choose Your Activity</h2> */}
                <Outlet />
            </>
        }>
            <Route path="home" element={<Home />} />
            <Route path="profile" element={<Profile />} />
            <Route path="hike/create" element={<HikeForm />} />
            <Route path="hikes" element={<HikeContainer />} />
            <Route path="hikes" element={<HikeSearch />} />
            <Route path="hikes/:hikeId/edit" element={<HikeEdit />} />
            <Route path="climb/create" element={<ClimbForm />} />
            <Route path="climbs" element={<ClimbContainer />} />
            <Route path="climbs" element={<ClimbSearch />} />
            <Route path="climbs/:climbId/edit" element={<ClimbEdit />} />
            <Route path="climbs" element={<ClimbList />} />
        </Route>
    </Routes>
}
