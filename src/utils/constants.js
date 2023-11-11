const SERVER_IP = "localhost:3977"

export const ENV = {
    BASE_PATH: `http://${SERVER_IP}`,
    BASE_API: `http://${SERVER_IP}/api/v1/`,
    API_ROUTES: {
        REGISTER: "auth/register",
        LOGIN: "auth/login",
        USER_ME: "user/me",
        REFRESH_ACCESS_TOKEN: "auth/refresh_access_token",
        USER: "user",
        USERS: "users",
        MENU: 'menu',
        COURSES: 'courses',
        COURSE: 'course',
        NEWSLETTERS: 'newsletters',
        NEWSLETTER: 'newsletter',
        POST: 'post',
        POSTS: 'posts'
    },
    JWT: {
        ACCESS: "access",
        REFRESH: "refresh"
    }
}