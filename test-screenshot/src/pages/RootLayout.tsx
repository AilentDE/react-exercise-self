import { Outlet } from "react-router";
import Header from "../components/Header";

const RootLayout = () => {
  return (
    <div className="min-h-screen w-full font-serif">
      <Header />
      <main className="flex p-2 justify-center">
        <Outlet />
      </main>
    </div>
  );
};

export default RootLayout;
