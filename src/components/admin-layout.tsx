import { DrawerLink } from "components";
import { FaUser, FaUserCircle } from "react-icons/fa";
import { MdClose, MdDashboard, MdInbox, MdShoppingBag } from "react-icons/md";

interface Props {
  children?: React.ReactNode;
}

const AdminLayout: React.FC<Props> = ({ children }) => {
  return (
    <main>
      <div
        className="z-40 h-screen w-80 overflow-y-auto bg-white p-4 dark:bg-gray-800"
        tabIndex={-1}
        aria-labelledby="drawer-navigation-label"
      >
        <h5 className="text-base font-semibold uppercase text-gray-500 dark:text-gray-400">
          Menu
        </h5>
        <button
          type="button"
          data-drawer-dismiss="drawer-navigation"
          aria-controls="drawer-navigation"
          className="absolute top-2.5 right-2.5 inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
        >
          <MdClose className="text-2xl font-bold" />
          <span className="sr-only">Close menu</span>
        </button>
        <div className="overflow-y-auto py-4">
          <ul className="space-y-2">
            <DrawerLink href="/admin" label="Dashboard" icon={MdDashboard} />
            <DrawerLink href="/admin" label="Inbox" badge={3} icon={MdInbox} />
            <DrawerLink href="/admin" label="Users" icon={FaUserCircle} />
            <DrawerLink href="/admin" label="Products" icon={MdShoppingBag} />
          </ul>
        </div>
      </div>
      {children}
    </main>
  );
};

export default AdminLayout;

// <Transition
//   show={isShowing}
//   enter="transition-transform duration-75"
//   enterFrom="-translate-x-10"
//   enterTo="translate-x-0"
//   leave="transition-transform duration-150"
//   leaveFrom="translate-x-0"
//   leaveTo="-translate-x-10"
// ></Transition>