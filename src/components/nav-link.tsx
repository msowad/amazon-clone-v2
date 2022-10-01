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
            isActive ? "bg-primary-700 md:text-primary-700" : ""
          } block rounded py-2 pr-4 pl-3 text-white dark:text-white md:bg-transparent md:p-0`}
          aria-current="page"
        >
          {label}
        </a>
      </Link>
    </li>
  );
};

export default NavLink;
