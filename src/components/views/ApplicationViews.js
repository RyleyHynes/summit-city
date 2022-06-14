import { Outlet, Route, Routes } from "react-router-dom"
import { ClimbList } from "../activities/ClimbList"
import { HikeList } from "../activities/HikeList"
import { Profile } from "../profile/Profile"




export const ApplicationViews = () => {
    return <Routes>
        <Route path="/" element={
            <>
            <h1 className="title--main">Welcome to Summit City</h1>
            <h2 className="chooseActivity">Choose Your Activity</h2>
            <Outlet />
            </>
        }>
            <Route path="profile" element={<Profile />} />
            <Route path="hikes" element={<HikeList />} />
            <Route path="climbs" element={<ClimbList />} />
        </Route>
    </Routes>
}
