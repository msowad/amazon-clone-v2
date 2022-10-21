interface Props {
  categories: { name: string }[];
  selectedCategory: string;
  onCategorySelect: (name: string) => void;
}

const ProductsFilter: React.FC<Props> = ({
  categories,
  onCategorySelect,
  selectedCategory,
}) => {
  return (
    <div>
      <h1 className="mb-1 text-lg font-bold">Categories</h1>
      <hr className="mb-2 border-gray-500 dark:border-gray-400" />
      <ul className="text-sm font-medium text-gray-900 dark:text-white">
        {categories.map((c, i) => (
          <li key={i}>
            <button
              onClick={() => onCategorySelect(c.name)}
              className={`block py-1 text-sm font-medium transition-transform hover:translate-x-1 hover:text-primary-500 ${
                selectedCategory === c.name
                  ? "text-primary-500"
                  : "text-gray-500 dark:text-gray-400"
              }`}
            >
              {c.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductsFilter;
