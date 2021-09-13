import Login from "../components/auth/Login";
import Signup from "../components/auth/Signup";

const authRoutes = [
    {
        path: '/auth/login',
        component: Login,
        key: 'login',
    },
    {
        path: '/auth/signup',
        component: Signup,
        key: 'signup',
    },
    {
        redirect: true,
        path: '/auth',
        to: '/auth/login',
        key: 'redirect',
    },
]
export default authRoutes;