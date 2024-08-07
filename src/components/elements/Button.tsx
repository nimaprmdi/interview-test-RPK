import { FC, MouseEventHandler } from "react";

// @todo make generic
interface ButtonProps {
  handler: MouseEventHandler<HTMLButtonElement>;
  children: string | JSX.Element;
}

const Button: FC<ButtonProps> = ({ handler, children }): JSX.Element => {
  return (
    <button onClick={handler} className="bg-blue-500 my-3 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
      {children}
    </button>
  );
};

export default Button;
