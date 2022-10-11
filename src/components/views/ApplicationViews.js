import { Route, Routes } from "react-router-dom"
// import { ClimbEdit } from "../activities/climbs/ClimbEdit"
// import { ClimbForm } from "../activities/climbs/ClimbForm"
// import { ClimbList } from "../activities/climbs/ClimbList"
// import { HikeEdit } from "../activities/hikes/HikeEdit"
// import { HikeForm } from "../activities/hikes/HikeForm"
import { HikeList } from "../activities/hikes/HikeList"
import { Login } from "../auth/Login"
import { Register } from "../auth/Register"
import { ClimbingGradeForm } from "../climbingGrades/ClimbingGradeForm"
import { ClimbingGradeList } from "../climbingGrades/ClimbingGradeList"
import { EditClimbingGrade } from "../climbingGrades/EditClimbingGrade"
import { Links } from "../helpfulLinks/Links"
import { Home } from "../homeScreen/home"
import { EditProfile } from "../profile/EditProfileForm"
import { ProfileDetails } from "../profile/Profile"
import { ProfileList } from "../profile/ProfileList"
import { EditSkillLevel } from "../skillLevels/skillLevelEdit"
import { SkillLevelForm } from "../skillLevels/skillLevelForm"
import { SkillLevelList } from "../skillLevels/skillLevelList"
import "./ApplicationViews.css"
import { Authorized } from "./Authorized"





export const ApplicationViews = ({ token, setToken, setUserId, userId }) => {
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

                {/* <Route path="hikeList" element={<HikeList />} />
                <Route path="hike/create" element={<HikeForm />} />
                <Route path="hikes/:hikeId/edit" element={<HikeEdit />} />

                <Route path="climbs" element={<ClimbList />} />
                <Route path="climb/create" element={<ClimbForm />} />
                <Route path="climbs/:climbId/edit" element={<ClimbEdit />} /> */}

                <Route path="skillLevelList" element={<SkillLevelList />} />
                <Route path="skillLevel/create" element={<SkillLevelForm />} />
                <Route path="skillLevel/:skillLevelId/edit" element={<EditSkillLevel />} />

                <Route path="climbingGradeList" element={<ClimbingGradeList />} />
                <Route path="climbingGrade/create" element={<ClimbingGradeForm />} />
                <Route path="climbingGrade/:climbingGradeId/edit" element={<EditClimbingGrade />} />
                </Route>
        </Routes>
    </>
}
