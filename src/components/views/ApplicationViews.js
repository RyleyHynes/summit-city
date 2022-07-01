import { Outlet, Route, Routes, useNavigate } from "react-router-dom"
import { ClimbContainer } from "../activities/climbs/ClimbContainer"
import { ClimbEdit } from "../activities/climbs/ClimbEdit"
import { ClimbForm } from "../activities/climbs/ClimbForm"
import { HikeContainer } from "../activities/hikes/HikeContainer"
import { HikeEdit } from "../activities/hikes/HikeEdit"
import { HikeForm } from "../activities/hikes/HikeForm"
import { Links } from "../helpfulLinks/Links"
import { Home } from "../homeScreen/home"
import { Profile } from "../profile/Profile"
import "./ApplicationViews.css"





export const ApplicationViews = () => {
    const navigate = useNavigate()
    return <Routes>
        <Route path="/" element={
            <>
                <h1 className="title--main" onClick={() => navigate("/home")}>Summit City</h1>
    
                <Outlet />
            </>
        }>
            <Route path="home" element={<Home />} />
            <Route path="Links" element={<Links />} />
            <Route path="profile" element={<Profile />} />
            <Route path="hikes" element={<HikeContainer />} />
            <Route path="hike/create" element={<HikeForm />} />
            <Route path="hikes/:hikeId/edit" element={<HikeEdit />} />
            <Route path="climbs" element={<ClimbContainer />} />
            <Route path="climb/create" element={<ClimbForm />} />
            <Route path="climbs/:climbId/edit" element={<ClimbEdit />} />
        </Route>
    </Routes>
}
