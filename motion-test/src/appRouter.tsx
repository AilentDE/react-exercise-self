import { createBrowserRouter } from "react-router-dom";

import RootLayout from "./pages/RootLayout";
import QuaQuaPage from "./pages/QuaQua";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <h1>HomePage</h1>,
      },
      { path: "qua-qua-lu", element: <QuaQuaPage /> },
    ],
  },
]);

export default router;
