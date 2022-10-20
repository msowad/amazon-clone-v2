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
      <label htmlFor={name} className="mb-2 block text-sm font-medium">
        {label}
      </label>
      <input
        autoFocus={autofocus}
        type={type}
        {...register(name)}
        className="input-primary w-full"
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
