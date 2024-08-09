import { FC } from "react";

interface InputProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  name: string;
  placeHolder: string;
}

const Input: FC<InputProps> = ({ onChange, value, name, placeHolder }) => {
  return (
    <input
      onChange={(e) => onChange(e)}
      value={value}
      className="w-64 mb-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      placeholder={placeHolder}
      type="text"
      name={name}
      id={name}
    />
  );
};

export default Input;
