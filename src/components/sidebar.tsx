import { Transition } from "@headlessui/react";
import { DrawerLink } from "components";
import { Fragment } from "react";
import { FaUserCircle } from "react-icons/fa";
import { MdClose, MdDashboard, MdInbox, MdShoppingBag } from "react-icons/md";

interface Props {
  handleToggle: () => void;
  isShowing: boolean;
}

const Sidebar: React.FC<Props> = ({ handleToggle, isShowing }) => {
  return (
    <>
      <div className="lg:hidden">
        <Transition
          show={isShowing}
          as={Fragment}
          enter="ease-out transition-opacity duration-75"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in transition-opacity duration-75"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div
            onClick={handleToggle}
            className="fixed inset-0 z-30 bg-gray-700 bg-opacity-70"
          ></div>
        </Transition>
        <Transition
          show={isShowing}
          as={Fragment}
          enter="ease-out transition-transform duration-75"
          enterFrom="-translate-x-10"
          enterTo="translate-x-0"
          leave="ease-in transition-transform duration-75"
          leaveFrom="translate-x-0"
          leaveTo="-translate-x-10"
        >
          <div
            className="fixed z-40 h-screen w-80 overflow-y-auto bg-white p-4 dark:bg-gray-800"
            tabIndex={-1}
            aria-labelledby="drawer-navigation-label"
          >
            <h5 className="text-base font-semibold uppercase text-gray-500 dark:text-gray-400">
              Menu
            </h5>
            <button
              type="button"
              onClick={handleToggle}
              data-drawer-dismiss="drawer-navigation"
              aria-controls="drawer-navigation"
              className="absolute top-2.5 right-2.5 inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              <MdClose className="text-2xl font-bold" />
              <span className="sr-only">Close menu</span>
            </button>
            <SidebarLinks />
          </div>
        </Transition>
      </div>
      <div
        className="fixed z-40 hidden h-screen w-60 overflow-y-auto bg-white p-4 dark:bg-gray-800 lg:block"
        tabIndex={-1}
        aria-labelledby="drawer-navigation-label"
      >
        <h5 className="text-base font-semibold uppercase text-gray-500 dark:text-gray-400">
          Menu
        </h5>
        <SidebarLinks />
      </div>
    </>
  );
};

const SidebarLinks = () => (
  <div className="overflow-y-auto py-4">
    <ul className="space-y-2">
      <DrawerLink href="/admin" label="Dashboard" icon={MdDashboard} />
      <DrawerLink href="/admin" label="Inbox" badge={3} icon={MdInbox} />
      <DrawerLink href="/admin" label="Users" icon={FaUserCircle} />
      <DrawerLink href="/admin" label="Products" icon={MdShoppingBag} />
    </ul>
  </div>
);

export default Sidebar;
