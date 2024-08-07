import { FC } from "react";
import Navbar from "../../common/Navbar";
import Outlet from "../../common/Outlet";

const MainLayout: FC = (): JSX.Element => {
  return (
    <main className="w-full flex justify-between items-start">
      <Navbar />
      <Outlet />
    </main>
  );
};

export default MainLayout;
