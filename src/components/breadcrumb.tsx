import Link from "next/link";
import { FaHome } from "react-icons/fa";
import { MdArrowForwardIos } from "react-icons/md";

interface Props {
  data: { label: string; href?: string }[];
}

const Breadcrumb: React.FC<Props> = ({ data }) => {
  return (
    <nav className="container flex py-10" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-3">
        {data.map((item, i) => (
          <li key={i} className="inline-flex items-center">
            {i !== 0 && (
              <MdArrowForwardIos className="mr-1 font-black text-gray-400" />
            )}
            {item.href ? (
              <Link href={item.href} passHref>
                <a className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                  {item.label === "Home" && <FaHome className="mr-2" />}
                  {item.label}
                </a>
              </Link>
            ) : (
              <span className="text-sm font-medium text-gray-500 dark:text-gray-400 md:ml-2">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
