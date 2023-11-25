import { Navigate, Outlet, useLocation } from "react-router"
import { useSelector } from "react-redux"
import { selectCurrentToken } from "./../../userSlice"

const RequireAuth = () => {
    const token = useSelector(selectCurrentToken)

    const location = useLocation()

    return(
        token ? <Outlet />
        : <Navigate to="/login" state={{from:location}} replace />
    )
}

export default RequireAuth