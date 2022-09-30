import Image from "next/image";
import Link from "next/link";

interface Props {
  children: React.ReactNode;
  title: string;
  register?: boolean;
}

const FormLayout: React.FC<Props> = ({ children, title, register }) => {
  return (
    <section>
      <div className="mx-auto flex flex-col items-center justify-center py-14 px-6 md:h-screen lg:py-0">
        <Link href="/" passHref>
          <a
            className={`mb-6 flex items-center ${
              register ? "pt-20" : ""
            } text-2xl font-semibold text-gray-900 dark:text-white`}
          >
            <Image
              className="mr-2 h-8 w-8"
              src="/logo.svg"
              alt="logo"
              width={200}
              height={50}
            />
          </a>
        </Link>
        <div className="w-full rounded-lg bg-white shadow dark:border dark:border-gray-700 dark:bg-gray-800 sm:max-w-md md:mt-0 xl:p-0">
          <div className="space-y-4 p-6 sm:p-8 md:space-y-6">
            <h1 className="text-center text-xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white md:text-2xl">
              {title}
            </h1>
            {children}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FormLayout;
