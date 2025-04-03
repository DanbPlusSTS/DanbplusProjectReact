import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/home/HomePages";
import Login from "../pages/login/LoginForm";
import Layout from "../layouts/Layout";
import Admin from "../pages/admin/AdminForm";

const router = createBrowserRouter([
  {
    path: "/loginForm", // 로그인 페이지는 레이아웃 없이 단독 표시
    element: <Login />,
  },
  {
    path: "/",
    element: <Layout />, // 전체 레이아웃 적용
    children: [
      {
        index: true, // 기본 경로 (`/`)
        element: <HomePage />,
      },
      {
        path: "/admin",
        element: <Admin />
      }
    ],
  },
]);

export default router;
