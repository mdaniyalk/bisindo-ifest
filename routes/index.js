import Link from "next/link";
// import Image from "next/image";
import RecognitionIcon from "assets/icon/Recognition.svg";
import TranslateIcon from "assets/icon/Translate.svg";
import DictionaryIcon from "assets/icon/Dictionary.svg";
import GuideIcon from "assets/icon/Guide.svg";

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

export const Navbar = () => {
  return (
    <nav>
      <div className="flex px-5" style={{ justifyContent: "space-between" }}>
        <div className="text-2xl text-blue-200">TUTUR</div>
        <div className="bg-black container flex flex-wrap justify-between items-center mx-auto">
          <button
            data-collapse-toggle="navbar-default"
            type="button"
            className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-default"
            aria-expanded="false"
          />
          <div
            className="hidden bg-black w-full md:block md:w-auto"
            id="navbar-default"
          >
            {routes.map((route) => {
              return (
                <Link href={route.path} key={route.key}>
                  <a className="text-xl">{route.name}</a>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
};
