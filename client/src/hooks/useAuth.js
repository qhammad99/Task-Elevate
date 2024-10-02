import { useSelector } from 'react-redux';
import { selectCurrentToken } from "../features/auth/authSlice";
import { jwtDecode } from "jwt-decode";

const useAuth = () => {
    const token = useSelector(selectCurrentToken);
    let isManager = false;
    let isAdmin = false;
    let status = "Employee";
    let username = '';
    let roles = [];

    if (token) {
        try {
            const decoded = jwtDecode(token);
            // console.log("decoded: ", decoded);
            ({ username, roles } = decoded.UserInfo || {});

            isManager = roles.includes('Manager');
            isAdmin = roles.includes('Admin');

            if (isManager) status = "Manager";
            if (isAdmin) status = "Admin";
        } catch (error) {
            console.error("Failed to decode token:", error);
            // Optionally reset values if decoding fails
            username = '';
            roles = [];
        }
    }

    return { username, roles, status, isManager, isAdmin };
};

export default useAuth;