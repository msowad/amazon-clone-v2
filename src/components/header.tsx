import { LoadingIcon, NavLink, ProfileMenu } from "components";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { BiMenu } from "react-icons/bi";

const Header: React.FC = ({}) => {
  const { data: session, status } = useSession();
  const [isShowingMobile, setIsShowingMobile] = useState(false);

  return (
    <header>
      <nav className="border-gray-200 bg-white px-4 py-2.5 dark:bg-gray-800 lg:px-6">
        <div className="mx-auto grid max-w-screen-xl grid-cols-2 items-center justify-between lg:grid-cols-3">
          <Link href="/" passHref>
            <a className="flex items-center">
              <Image
                src="/logo.svg"
                className="mr-3"
                width={150}
                height={40}
                alt="Logo"
              />
            </a>
          </Link>
          <div className="flex items-center justify-end lg:order-2">
            {status === "loading" && <LoadingIcon className="h-5 w-5" />}
            {status === "unauthenticated" && (
              <Link href="/login" passHref>
                <a className="text-md mr-2 rounded-lg bg-primary-700 px-4 py-2 font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 lg:px-5 lg:py-2.5">
                  Login
                </a>
              </Link>
            )}
            {status === "authenticated" && <ProfileMenu session={session} />}
            <button
              onClick={() => setIsShowingMobile((old) => !old)}
              data-collapse-toggle="mobile-menu-2"
              type="button"
              className="ml-1 inline-flex items-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 lg:hidden"
              aria-controls="mobile-menu-2"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <BiMenu size={27} />
            </button>
          </div>
          <div
            className={`${
              isShowingMobile ? "lg:block" : "hidden"
            } col-span-2 w-full items-center justify-center lg:order-1 lg:col-span-1 lg:flex lg:w-auto`}
            id="mobile-menu-2"
          >
            <ul className="mt-4 flex flex-col font-medium lg:mt-0 lg:flex-row lg:space-x-6">
              <NavLink label="Home" href="/" />
              <NavLink label="Products" href="/products" />
              <NavLink label="Contact" href="/contact" />
              <NavLink label="About us" href="/about" />
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
