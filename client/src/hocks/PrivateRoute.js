import { Navigate } from "react-router-dom";

export const PrivateRoute = ({authed, children }) => {
    return authed ? children : <Navigate to='/login'/>
}