import { useRouter } from "next/router";
import { useMemo } from "react";
import { BubbleButton } from "/components/elements/button";

export function DesktopCategory({ categories }) {
  const router = useRouter();

  const { category } = router.query;

  const activeCategory = useMemo(() => {
    if (!category || category === "") return categories.semua;
    return category;
  }, [categories.semua, category]);

  return (
    <div className="py-4 h-[calc(100vh-56px)] sticky top-0 hidden md:block">
      <nav className="bg-white backdrop-blur bg-opacity-10 shadow-2xl rounded-tr-[3em] rounded-br-[3em] p-8 space-y-1">
        {Object.keys(categories).map((category) => (
          <BubbleButton
            key={category}
            text={category}
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
