import { UserForm } from "./UserForm";

export const Profile = () => {
    const localSummitUser = localStorage.getItem("summit_user")
    const summitUserObject = JSON.parse(localSummitUser)

        return <UserForm />
}