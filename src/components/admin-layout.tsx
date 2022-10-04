import { LoadingIcon, ProfileMenu, Sidebar } from "components";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { MdMenu, MdSearch } from "react-icons/md";

interface Props {
  children?: React.ReactNode;
}

const AdminLayout: React.FC<Props> = ({ children }) => {
  const { data: session, status } = useSession();

  const [isShowing, setIsShowing] = useState(false);

  const handleToggle = () => {
    setIsShowing(!isShowing);
  };

  return (
    <main className="flex">
      <Sidebar handleToggle={handleToggle} isShowing={isShowing} />
      <div className="w-full lg:ml-60">
        <header className="fixed right-0 left-0 top-0 flex items-center justify-between bg-white px-10 py-3 dark:bg-gray-800 lg:ml-60">
          <div className="flex items-center">
            <button
              type="button"
              onClick={handleToggle}
              data-drawer-dismiss="drawer-navigation"
              aria-controls="drawer-navigation"
              className="mr-3 inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white lg:hidden"
            >
              <MdMenu className="text-2xl font-bold" />
              <span className="sr-only">Close menu</span>
            </button>
            <form className="flex items-center">
              <label htmlFor="search" className="sr-only">
                Search
              </label>
              <div className="relative w-full">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <MdSearch size={25} />
                </div>
                <input
                  type="text"
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 pl-10 text-sm text-gray-900 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500  dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                  placeholder="Search"
                />
              </div>
            </form>
          </div>
          {status === "loading" && <LoadingIcon className="h-5 w-5" />}
          {status === "authenticated" && <ProfileMenu session={session} />}
        </header>
        <div className="container overflow-auto pt-24 pb-10 lg:px-10">
          {children}
        </div>
      </div>
    </main>
  );
};

export default AdminLayout;
