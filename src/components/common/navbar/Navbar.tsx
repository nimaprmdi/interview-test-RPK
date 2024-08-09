import { FC } from "react";
import NavbarActions from "./NavbarActions";
import NavList from "./NavList";

const Navbar: FC = (): JSX.Element => {
  return (
    <nav className="w-full lg:w-2/12 lg:min-h-screen bg-gray-400 relative">
      <div className="w-full lg:w-2/12 h-full lg:fixed bg-gray-400 px-3 pt-5">
        <NavbarActions />
        <NavList />
      </div>
    </nav>
  );
};

export default Navbar;
