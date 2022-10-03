import { LoadingIcon } from "components";
import { MouseEventHandler } from "react";

interface Props {
  type?: "button" | "submit" | "reset";
  label: string;
  isLoading?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

const LoadingButton: React.FC<Props> = ({
  type = "button",
  label,
  isLoading,
  onClick,
}) => {
  return (
    <button
      disabled={isLoading}
      type={type}
      onClick={onClick}
      className="w-full rounded-lg bg-primary-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
    >
      {isLoading && <LoadingIcon className="h-4 w-4" />}
      {!isLoading && <span>{label}</span>}
    </button>
  );
};

export default LoadingButton;
