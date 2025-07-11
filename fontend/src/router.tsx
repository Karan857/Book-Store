import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";

const LoginPage = lazy(() => import('./pages/Login'))
const RegisterPage = lazy(() => import('./pages/Register'))
const HomePage = lazy(() => import('./pages/Home'))
const DetailBookPage = lazy(() => import('./pages/DetailBook'))

const LayoutPage = lazy(() => import('./components/DefaultLayout'))

const router = createBrowserRouter([
    { path: "/", Component: LoginPage },
    { path: "/register", Component: RegisterPage },
    {
        path: "/home", Component: LayoutPage, children: [
            { index: true, Component: HomePage },
            {
                path: "book/:id", Component: DetailBookPage
            }
        ]
    },
]);

export default router;