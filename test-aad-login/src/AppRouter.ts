import { createBrowserRouter } from "react-router";
import AppLayout from "./AppLayout";
import { Home } from "./pages/Home";
import { Profile } from "./pages/Profile";

const router = createBrowserRouter([
  {
    path: "/",
    Component: AppLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "profile",
        Component: Profile,
      },
    ],
  },
]);

export default router;
