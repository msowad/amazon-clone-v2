import { UseFormRegister } from "react-hook-form";

interface Props {
  label: string;
  name: string;
  type: string;
  placeholder?: string;
  register: UseFormRegister<any>;
  autofocus?: boolean;
  error?: string | null;
}

const Input: React.FC<Props> = ({
  label,
  name,
  type = "text",
  placeholder = "",
  register,
  autofocus,
  error,
}) => {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
      >
        {label}
      </label>
      <input
        autoFocus={autofocus}
        type={type}
        {...register(name)}
        className="block w-full rounded-lg border-2 border-gray-300 bg-gray-50 p-2.5 text-gray-900 transition focus:border-primary-600 focus:outline-none focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-400 sm:text-sm"
        placeholder={placeholder}
      />
      {error && (
        <p className="mt-1 block text-sm font-medium text-red-600 dark:text-red-400">
          {error}
        </p>
      )}
    </div>
  );
};

export default Input;
