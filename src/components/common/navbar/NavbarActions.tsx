import { FC } from "react";
import { FaBell, FaListAlt } from "react-icons/fa";

const NavbarActions: FC = (): JSX.Element => {
  return (
    <div className="w-full flex justify-between">
      <div className="flex justify-between gap-2">
        <span className="w-4 h-4 bg-red-500 rounded-full"></span>
        <span className="w-4 h-4 bg-yellow-500 rounded-full"></span>
        <span className="w-4 h-4 bg-green-500 rounded-full"></span>
      </div>

      <div className="flex justify-between gap-2">
        <FaBell />
        <FaListAlt />
      </div>
    </div>
  );
};

export default NavbarActions;
