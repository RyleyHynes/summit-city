import { Outlet, Route, Routes } from "react-router-dom"


export const UserViews = () => {
    return (
        <Routes>
            <Route path="/" element={
                <>
                    <h1>Summit City</h1>
                    <div>Send It!</div>
                    <Outlet />
                </>
            }>
            </Route>
        </Routes>
    )
}