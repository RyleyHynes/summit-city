import { Outlet, Route, Routes } from "react-router-dom"
import { ActivityList } from "../activities/ActivityList"



export const ApplicationViews = () => {
    return <Routes>
        <Route path="/" element={
            <>
            <h1 className="title--main">Welcome to Summit City</h1>
            <Outlet />
            </>
        }>
            <Route path="activities" element={<ActivityList />} />
        </Route>
    </Routes>
}
