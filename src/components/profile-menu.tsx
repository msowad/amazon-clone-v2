import { Menu, Transition } from "@headlessui/react";
import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";
import { FaUserCircle } from "react-icons/fa";
import {
  MdArrowForwardIos,
  MdDashboard,
  MdLocalShipping,
  MdLogout,
} from "react-icons/md";

interface Props {
  session: Session;
}

const ProfileMenu: React.FC<Props> = ({ session }) => {
  return (
    <div>
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button
            className="flex items-center rounded-full text-sm font-medium text-gray-900 hover:text-primary-600 focus:ring-4 focus:ring-gray-100 dark:text-white dark:hover:text-primary-500 dark:focus:ring-gray-700 md:mr-0"
            type="button"
          >
            <span className="sr-only">Open user menu</span>
            <Image
              src="/assets/user-avatar.jfif"
              alt="user photo"
              width={32}
              height={32}
              className="mr-3 rounded-full"
            />
            <div className="ml-2 hidden max-w-[6rem] items-center sm:flex">
              <h6 className="truncate">Bonnie Green lorem ipsum lorem ipsum</h6>
              <MdArrowForwardIos className="ml-1 rotate-90" size={40} />
            </div>
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 z-20 mt-2 w-56 max-w-xs origin-top-right rounded-md bg-gray-300 shadow-lg focus:outline-none dark:bg-gray-700">
            <div className="truncate p-3">
              <h1 className="text-sm font-semibold">{session.user?.name}</h1>
              <h1 className="text-lg font-bold">{session.user?.email}</h1>
            </div>
            <hr className="border-gray-500" />
            <div className="py-2">
              <Menu.Item as={Link} href="/" passHref>
                <a
                  className={`flex w-full items-center px-3 py-2 hover:bg-gray-200 dark:hover:bg-gray-600`}
                >
                  <FaUserCircle className="mr-2" />
                  Profile
                </a>
              </Menu.Item>
              <Menu.Item as={Link} href="/" passHref>
                <a
                  className={`flex w-full items-center px-3 py-2 hover:bg-gray-200 dark:hover:bg-gray-600`}
                >
                  <MdDashboard className="mr-2" />
                  Dashboard
                </a>
              </Menu.Item>
              <Menu.Item as={Link} href="/" passHref>
                <a
                  className={`flex w-full items-center px-3 py-2 hover:bg-gray-200 dark:hover:bg-gray-600`}
                >
                  <MdLocalShipping className="mr-2" />
                  My Order
                </a>
              </Menu.Item>
              <Menu.Item>
                <button
                  onClick={() => signOut()}
                  className={`flex w-full items-center px-3 py-2 hover:bg-gray-200 dark:hover:bg-gray-600`}
                >
                  <MdLogout className="mr-2" />
                  Logout
                </button>
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};

export default ProfileMenu;
