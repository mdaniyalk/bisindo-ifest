import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";

const routes = [
  {
    path: "/",
    name: "Recognition",
    key: "recognition",
  },
  {
    path: "/dictionary",
    name: "Dictionary",
    key: "dictionary",
  },
  {
    path: "/translate",
    name: "Translate",
    key: "translate",
  },
  {
    path: "/guide",
    name: "Guide",
    key: "guide",
  },
];

export const Navbar = ({ setIsGuideOpen }) => {
  const router = useRouter();
  return (
    <nav className="bg-white px-2 sm:px-4 rounded border-b-4 py-4 border-c-05">
      <div className="container flex flex-wrap justify-between items-center mx-auto">
        <Link href="/" className="flex items-center">
          <a>
            {/* <Image
              src={"/icon/Dictionary.svg"}
              alt="dictionary"
              width={20}
              height={20}
            /> */}
            <span className="self-center whitespace-nowrap text-2xl text-c-05 font-bold">
              Tutur
            </span>
          </a>
        </Link>
        <button
          data-collapse-toggle="navbar-default"
          type="button"
          className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 "
          aria-controls="navbar-default"
          aria-expanded="false"
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-6 h-6"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              clipRule="evenodd"
            ></path>
          </svg>
        </button>
        <div
          className="hidden w-full md:w-auto md:flex flex-row"
          id="navbar-default"
        >
          {routes.map((route) => {
            return (
              // <Link href={route.path} key={route.key}>
              <div
                className="mx-5 flex"
                key={route.key}
                role="button"
                onClick={() => {
                  if (route.key === "guide") {
                    setIsGuideOpen((g) => !g);
                  } else {
                    router.push(route.path);
                  }
                }}
              >
                <div className="flex justify-items-center place-items-center content-center mr-1">
                  <Image
                    src={`/icon/${route.name}.svg`}
                    height={20}
                    width={20}
                    alt={route.name}
                  />
                </div>
                <span className="self-center font-poppins whitespace-nowrap text-lg text-c-05 font-semibold">
                  {route.name}
                </span>
              </div>
              // </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
};
