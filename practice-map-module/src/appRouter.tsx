import { createBrowserRouter } from "react-router-dom";

import RootLayout from "./components/layout/RootLayout";
import Error from "./components/Error";

import Home from "./pages/Home";
import Google from "./pages/Google";
import Leaflet from "./pages/Leaflet";
import Map8 from "./pages/Map8";
import Azure from "./pages/Azure";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "google",
        element: <Google />,
      },
      {
        path: "leaflet",
        element: <Leaflet />,
      },
      {
        path: "map8",
        element: <Map8 />,
      },
      {
        path: "azure",
        element: <Azure />,
      },
    ],
  },
]);

export default router;
