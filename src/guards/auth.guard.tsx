import { Navigate, Outlet } from "react-router-dom";
import { PrivateRoutes, PublicRoutes } from "../models/routes"; // Importa PrivateRoutes y PublicRoutes
import useUserStore from "../zustand/General";

interface Props {
    privateValidation: boolean;
}

const PrivateValidationFragment = <Outlet />;
const PublicValidationFragment = <Navigate replace to={PrivateRoutes.PRIVATE} />

export const AuthGuard = ({ privateValidation }: Props) => {
    const userState = useUserStore(state => state.user);
    console.log(userState)
    let u = true
    return u ? (
        privateValidation ? (
            PrivateValidationFragment
        ) : (
            PublicValidationFragment
        )
    )   :   (
        <Navigate replace to={PublicRoutes.LOGIN} />
    )
};

export default AuthGuard;
