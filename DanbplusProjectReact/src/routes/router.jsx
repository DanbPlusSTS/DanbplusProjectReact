import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/home/HomePages";
import Layout from "../layouts/Layout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />, // 전체 레이아웃 적용
    children: [
      {
        index: true, // 기본 경로 (`/`)
        element: <HomePage />,
      },
    ],
  },
]);

export default router;
