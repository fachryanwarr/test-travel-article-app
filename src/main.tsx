import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Toast from "./components/Elements/Toast";
import AuthLayout from "./components/Layout/AuthLayout";
import Layout from "./components/Layout/Layout";
import { AuthProvider } from "./contexts/authProvider";
import ErrorPage from "./pages/404";
import AboutPage from "./pages/About";
import ArticlePage from "./pages/Article";
import ArticleDetailPage from "./pages/ArticleDetail";
import Homepage from "./pages/Home";
import LoginPage from "./pages/Login";
import ProfilePage from "./pages/Profile";
import RegisterPage from "./pages/Register";
import "./styles/index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Homepage />,
      },
      {
        path: "/about",
        element: <AboutPage />,
      },
      {
        path: "/article",
        element: <ArticlePage />,
      },
      {
        path: "/article/:id",
        element: <ArticleDetailPage />,
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        path: "/auth/login",
        element: <LoginPage />,
      },
      {
        path: "/auth/register",
        element: <RegisterPage />,
      },
    ],
  },
  {
    path: "/profile",
    element: <ProfilePage />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <Toast />
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);
