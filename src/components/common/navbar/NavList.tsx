import { FC } from "react";
import { FaInbox, FaSearch } from "react-icons/fa";

const NavList: FC = (): JSX.Element => {
  return (
    <ul className="w-full mt-8">
      <li className="flex items-center gap-2 mb-2">
        <FaSearch />
        Search
      </li>

      <li className="flex items-center gap-2 mb-2">
        <FaInbox />
        Inbox
      </li>
    </ul>
  );
};

export default NavList;
