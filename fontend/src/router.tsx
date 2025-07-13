import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";

const LoginPage = lazy(() => import("./pages/Login"));
const RegisterPage = lazy(() => import("./pages/Register"));
const HomePage = lazy(() => import("./pages/Home"));
const BookDetailPage = lazy(() => import("./pages/BookDetail"));
const BookPage = lazy(() => import("./pages/Books"));

const LayoutPage = lazy(() => import("./components/DefaultLayout"));

const router = createBrowserRouter([
  { path: "/login", Component: LoginPage },
  { path: "/register", Component: RegisterPage },
  {
    path: "/",
    Component: LayoutPage,
    children: [
      { index: true, Component: HomePage },
      { path: "books", Component: BookPage },
      {
        path: "book/:id",
        Component: BookDetailPage,
      },
    ],
  },
]);

export default router;
