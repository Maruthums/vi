import { RouterProvider, createBrowserRouter } from "react-router-dom";
import React, { lazy } from "react";
import { ToastContainer } from "react-toastify";
import AdminLayout from "./module/components/layout/adminLayout";
import Loader from "./module/components/loader";
const DashboardUserChart = lazy(() => import("./module/screens/dashboard/Dashboard"));
const HomeScreen = lazy(() => import("./module/screens/home/HomeScreen"));
const UserView = lazy(
  () => import("./module/screens/home/UserView")
);

const router = createBrowserRouter(
  [
    {
      element: <AdminLayout />,
      children: [
        { path: "/", element: <DashboardUserChart /> },
        { path: "/users", element: <HomeScreen /> },
        { path: "/user-view/:id", element: <UserView /> },
      ],
    },
  ],
);

function App() {
  return (
    <>
      <React.Suspense fallback={<Loader />}>
        <RouterProvider router={router} />
      </React.Suspense>
      <ToastContainer autoClose={2000} position="bottom-right" />
    </>
  );
}

export default App;
