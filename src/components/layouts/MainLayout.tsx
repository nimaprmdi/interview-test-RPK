import { FC } from "react";
import Navbar from "../common/navbar/Navbar";
import Outlet from "../common/Outlet";

const MainLayout: FC = (): JSX.Element => {
  return (
    <main className="w-full flex flex-wrap justify-between items-start">
      <Navbar />
      <Outlet />
    </main>
  );
};

export default MainLayout;
