import clsx from "clsx";
import { useRouter } from "next/router";
import { BubbleButton } from "/components/elements/button";

export function MobileCategories({
  categories,
  activeCategory,
  isOpened,
  setIsOpened,
}) {
  const router = useRouter();
  return (
    <div className="">
      <nav
        onClick={() => {
          setIsOpened(false);
        }}
        className={clsx(
          "h-[calc(100vh-56px)] fixed top-[56px] flex flex-col md:hidden z-[60] w-full bg-white backdrop-blur-lg bg-opacity-60 shadow-2xl py-16 px-4 space-y-2 items-center transition-all duration-200",
          isOpened ? "left-0" : "left-[-100%]",
        )}
      >
        {Object.keys(categories).map((category) => (
          <BubbleButton
            key={category}
            text={category}
            className="w-[80%] text-center hover:scale-[102%] drop-shadow"
            onClick={() =>
              router.push(
                category === categories.semua
                  ? "/dictionary"
                  : `/dictionary?category=${category}`,
              )
            }
            bgGreen={category === activeCategory}
          />
        ))}
      </nav>
    </div>
  );
}
