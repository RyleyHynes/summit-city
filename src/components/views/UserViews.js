import { Outlet, Route, Routes } from "react-router-dom"
import { EmployeeDetails } from "../../employees/EmployeeDetails"
import { EmployeeList } from "../../employees/EmployeeList"
import { CustomerDetails } from "../customers/CustomerDetails"
import { CustomerList } from "../customers/CustomerList"
import { Profile } from "../profile/Profile"
import { TicketContainer } from "../tickets/TicketContainer"




export const EmployeeViews = () => {
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