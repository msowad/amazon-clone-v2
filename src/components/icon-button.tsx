interface Props {
  children: React.ReactNode;
  description?: string;
  title?: string;
}

const IconButton: React.FC<Props> = ({ title, children, description }) => {
  return (
    <button
      type="button"
      className="mr-2 inline-flex items-center rounded-lg bg-primary-700 p-2.5 text-center text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
      title={title}
    >
      {children}
      <span className="sr-only">{description}</span>
    </button>
  );
};

export default IconButton;
