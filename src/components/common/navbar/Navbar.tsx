import { FC } from "react";
import NavbarActions from "./NavbarActions";
import NavList from "./NavList";

const Navbar: FC = (): JSX.Element => {
  return (
    <nav className="w-full h-16 lg:w-2/12 lg:h-screen px-3 pt-5">
      <NavbarActions />
      <NavList />
    </nav>
  );
};

export default Navbar;
