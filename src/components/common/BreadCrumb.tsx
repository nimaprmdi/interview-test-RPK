import { FC } from "react";
import { FaCommentAlt, FaEllipsisH, FaRegUserCircle } from "react-icons/fa";

export const BreadCrumb: FC = (): JSX.Element => {
  return (
    <section className="w-full flex justify-between">
      <div className="routes flex items-center">
        <span className="me-1">Home / </span>
        <span className="me-1">Home / </span>
        <span className="me-1">Home </span>
      </div>

      <div className="icons flex justify-between gap-5 items-center py-3">
        <FaRegUserCircle />
        <FaCommentAlt />
        <FaEllipsisH />
      </div>
    </section>
  );
};
