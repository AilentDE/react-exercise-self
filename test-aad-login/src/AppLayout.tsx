import { Outlet } from "react-router";
import { NavigationBar } from "./components/NavigationBar";

export default function AppLayout() {
  return (
    <>
      <NavigationBar />
      <div
        style={{
          padding: "20px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Outlet />
      </div>
    </>
  );
}
