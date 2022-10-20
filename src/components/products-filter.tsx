const ProductsFilter: React.FC = ({}) => {
  return (
    <div>
      <h1 className="mb-1 text-lg font-bold">Categories</h1>
      <hr className="mb-2 border-black dark:border-white" />
      <ul className="text-sm font-medium text-gray-900 dark:text-white">
        <li>
          <div className="flex items-center pl-3">
            <input
              id="vue-checkbox"
              type="checkbox"
              value=""
              className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-primary-600 accent-primary-600 focus:ring-2 focus:ring-primary-500 dark:border-gray-500 dark:bg-gray-600 dark:ring-offset-gray-700 dark:focus:ring-primary-600"
            />
            <label
              htmlFor="vue-checkbox"
              className="ml-2 w-full py-1 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Vue JS
            </label>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default ProductsFilter;
