import { IoAlertCircle } from "react-icons/io5";

interface Props {
  error?: string;
  className?: string;
}

const FormError: React.FC<Props> = ({ error, className = "" }) => {
  return (
    <>
      {error && (
        <p
          className={`flex items-center rounded-md bg-red-600 px-3 py-2 text-sm font-medium text-white dark:bg-red-400 dark:text-black ${className}`}
        >
          <IoAlertCircle width={30} className="mr-2" />
          {error}
        </p>
      )}
    </>
  );
};

export default FormError;
