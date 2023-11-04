import React from 'react'
import { useEffect, useState, createContext } from "react"

import { Auth, User } from '../api';
import { hasExpiredToken } from '../utils';

const userController = new User();
const authController = new Auth()

export const AuthContext = createContext();

export function AuthProvider(props) {
    const { children } = props;
    const [user, setUser] = useState();
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            const accessToken = authController.getAccessToken();
            const refreshToken = authController.getRefreshToken();

            if (!accessToken || !refreshToken) {
                logout();
                setLoading(false);
                return
            }

            if (hasExpiredToken(accessToken)) {
                if (hasExpiredToken(refreshToken)) {
                    logout()
                } else {
                    await reLogin(refreshToken)
                }
            } else {
                await login(accessToken);
            }

            setLoading(false);
        })();
    }, [])

    const login = async (accessToken) => {

        try {
            const response = await userController.getMe(accessToken);
            delete response.password;
            setToken(accessToken);
            setUser(response);
        } catch (error) {
            console.log(error);
        }

    };

    const reLogin = async (refreshToken) => {
        try {
            const { accessToken } = await authController.refreshAccesToken(refreshToken);
            authController.setAccessToken(accessToken);
            await login(accessToken)
        } catch (error) {
            throw error;
        }
    }

    const logout = () => {
        setUser(null)
        setToken(null)
        authController.removeTokens()
    }

    const data = {
        accessToken: token,
        user,
        login,
        logout
    }

    if (loading) return null

    return (
        <AuthContext.Provider value={data}>
            {children}
        </AuthContext.Provider>
    )
}
