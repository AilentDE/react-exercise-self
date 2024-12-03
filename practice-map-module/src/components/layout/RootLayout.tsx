import { Outlet } from "react-router-dom";
import Header from "./Header";

import classes from "./RootLayout.module.css";

const RootLayout = () => {
  return (
    <>
      <div className="h-full w-full font-serif">
        <Header />
        <main className={`flex p-2 justify-center ${classes.fullScreenHeight}`}>
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default RootLayout;
