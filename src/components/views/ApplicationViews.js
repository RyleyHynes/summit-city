import { Outlet, Route, Routes } from "react-router-dom"
import { ClimbList } from "../activities/ClimbList"
import { HikeList } from "../activities/HikeList"




export const ApplicationViews = () => {
    return <Routes>
        <Route path="/" element={
            <>
            <h1 className="title--main">Welcome to Summit City</h1>
            <Outlet />
            </>
        }>
            <Route path="hikes" element={<HikeList />} />
            <Route path="climbs" element={<ClimbList />} />
        </Route>
    </Routes>
}
