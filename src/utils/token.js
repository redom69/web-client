import { jwtDecode } from "jwt-decode";

export const hasExpiredToken = (token) => {
    const { exp } = jwtDecode(token);
    const currentData = new Date().getDate();

    if (exp <= currentData) {
        return true
    }
    return false
}