import Link from "next/link";
import { useRouter } from "next/router";

interface Props {
  label: string;
  href: string;
}

const NavLink: React.FC<Props> = ({ label, href }) => {
  const router = useRouter();
  const isActive = href === router.pathname;

  return (
    <li>
      <Link passHref href={href}>
        <a
          className={`${
            isActive
              ? "bg-primary-700 text-white hover:bg-primary-800 lg:text-primary-700 lg:hover:bg-transparent"
              : "hover:bg-gray-200 dark:hover:bg-gray-700 lg:text-gray-700 lg:hover:bg-transparent lg:hover:text-primary-700 dark:lg:text-gray-300"
          } block rounded py-2 pr-4 pl-3 dark:text-white lg:bg-transparent lg:p-0`}
          aria-current="page"
        >
          {label}
        </a>
      </Link>
    </li>
  );
};

export default NavLink;
