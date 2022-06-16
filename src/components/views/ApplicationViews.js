import { Outlet, Route, Routes } from "react-router-dom"
import { ClimbForm } from "../activities/climbs/ClimbForm"
import { ClimbList } from "../activities/climbs/ClimbList"
import { HikeForm } from "../activities/hikes/HikeForm"
import { HikeList } from "../activities/hikes/HikeList"
import { HikeSearch } from "../activities/hikes/HikeSearch"
import { Profile } from "../profile/Profile"




export const ApplicationViews = () => {
    return <Routes>
        <Route path="/" element={
            <>
            <h1 className="title--main">Welcome to Summit City</h1>
            {/* <h2 className="chooseActivity">Choose Your Activity</h2> */}
            <Outlet />
            </>
        }>
            <Route path="climb/create" element={<ClimbForm/>} />
            <Route path= "hike/create" element={<HikeForm />} />
            <Route path="profile" element={<Profile />} />
            <Route path="hikes" element={<HikeList />} />
            <Route path="climbs" element={<ClimbList />} />
            <Route path="hikes" element={<HikeSearch />} />
        </Route>
    </Routes>
}
