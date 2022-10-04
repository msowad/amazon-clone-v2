import { IconType } from "react-icons";

interface Props {
  href: string;
  label: string;
  icon: IconType;
  badge?: string | number;
}

const DrawerLink: React.FC<Props> = ({ href, label, icon: Icon, badge }) => {
  return (
    <li>
      <a
        href={href}
        className="flex items-center rounded-lg p-2 text-base font-normal text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
      >
        <Icon className="h-6 w-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" />
        <span className="ml-3 flex-1 whitespace-nowrap">{label}</span>
        {badge && (
          <span className="ml-3 inline-flex h-3 w-3 items-center justify-center rounded-full bg-blue-200 p-3 text-sm font-medium text-blue-600 dark:bg-blue-900 dark:text-blue-200">
            {badge}
          </span>
        )}
      </a>
    </li>
  );
};

export default DrawerLink;
