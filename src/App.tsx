import { RouterProvider, createBrowserRouter } from "react-router-dom";
import React, { lazy } from "react";
import { ToastContainer } from "react-toastify";
import AdminLayout from "./module/components/layout/adminLayout";
import Loader from "./module/components/loader";
const DashboardBaseScreen = lazy(
  () => import("./module/screens/dashboard/baseScreen")
);
const router = createBrowserRouter(
  [
    {
      element: <AdminLayout />,
      children: [
        { path: "/", element: <DashboardBaseScreen /> },
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
