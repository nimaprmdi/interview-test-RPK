import { FC, MouseEventHandler } from "react";

// @todo make generic
interface ButtonProps {
  onClick: MouseEventHandler<HTMLButtonElement>;
  children: string | JSX.Element;
  id?: string;
}

const Button: FC<ButtonProps> = ({ id, onClick: handler, children }): JSX.Element => {
  return (
    <button
      id={id || String(Math.floor(Math.random() * 500000))}
      onClick={handler}
      className="bg-blue-500 my-3 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    >
      {children}
    </button>
  );
};

export default Button;
