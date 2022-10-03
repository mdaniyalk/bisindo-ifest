import DefaultLayout from "/components/layouts/DefaultLayout";
import { HiSearch } from "react-icons/hi";
import { useMemo, useState } from "react";
import { useRouter } from "next/router";
import clsx from "clsx";
import { Video } from "/components/elements/video";
import { RenderIf } from "/components/elements/RenderIf";
import { BackgroundDecoration } from "/components/elements/decoration/BackgroundDecoration";

const CATEGORIES = {
  semua: "semua",
  angka: "angka",
  bulan: "bulan",
  hari: "hari",
  hewan: "hewan",
  keluarga: "keluarga",
  kerja: "kerja",
  kota: "kota",
  olahraga: "olahraga",
  perkenalan: "perkenalan",
  sifat: "sifat",
};

Object.freeze(CATEGORIES);

const DICT_ITEMS = [
  { label: "1", category: CATEGORIES.angka },
  { label: "2", category: CATEGORIES.angka },
  { label: "3", category: CATEGORIES.angka },
  { label: "4", category: CATEGORIES.angka },
  { label: "5", category: CATEGORIES.angka },
  { label: "6", category: CATEGORIES.angka },
  { label: "7", category: CATEGORIES.angka },
  { label: "8", category: CATEGORIES.angka },
  { label: "9", category: CATEGORIES.angka },
  { label: "10", category: CATEGORIES.angka },
  { label: "angka", category: CATEGORIES.angka },
  { label: "januari", category: CATEGORIES.bulan },
  { label: "februari", category: CATEGORIES.bulan },
  { label: "maret", category: CATEGORIES.bulan },
  { label: "april", category: CATEGORIES.bulan },
  { label: "mei", category: CATEGORIES.bulan },
  { label: "juni", category: CATEGORIES.bulan },
  { label: "juli", category: CATEGORIES.bulan },
  { label: "agustus", category: CATEGORIES.bulan },
  { label: "september", category: CATEGORIES.bulan },
  { label: "oktober", category: CATEGORIES.bulan },
  { label: "november", category: CATEGORIES.bulan },
  { label: "desember", category: CATEGORIES.bulan },
  { label: "senin", category: CATEGORIES.hari },
  { label: "selasa", category: CATEGORIES.hari },
  { label: "rabu", category: CATEGORIES.hari },
  { label: "kamis", category: CATEGORIES.hari },
  { label: "jumat", category: CATEGORIES.hari },
  { label: "sabtu", category: CATEGORIES.hari },
  { label: "minggu", category: CATEGORIES.hari },
];

function Dictionary() {
  const router = useRouter();
  const { category } = router.query;

  const [dictItems, setDictItems] = useState(DICT_ITEMS);
  const [search, setSearch] = useState("");

  const [playedLabel, setPlayedLabel] = useState("desember");

  const filteredDictItems = useMemo(() => {
    const filteredByCategory = dictItems.filter((item) => {
      if (!category) return true;
      return item.category === category;
    });
    const filteredBySearch = filteredByCategory.filter((item) =>
      item.label.includes(search.toLowerCase()),
    );
    return filteredBySearch;
  }, [category, dictItems, search]);

  const activeCategory = useMemo(() => {
    if (!category || category === "") return CATEGORIES.semua;
    return category;
  }, [category]);

  return (
    <DefaultLayout title="Kamus SIBI - Tutur">
      <div className="flex w-full relative">
        {/* sidebar */}
        <div className="py-4 h-[calc(100vh-56px)] sticky top-0 hidden md:block">
          <nav className="bg-white backdrop-blur bg-opacity-10 shadow-2xl rounded-tr-[3em] rounded-br-[3em] p-8 space-y-1">
            {Object.keys(CATEGORIES).map((category) => (
              <div
                key={category}
                role="button"
                onClick={() =>
                  router.push(
                    category === CATEGORIES.semua
                      ? "/dictionary"
                      : `/dictionary?category=${category}`,
                  )
                }
                className={clsx(
                  "px-6 py-2 rounded-full font-medium text-white w-fit hover:-translate-y-[2px] hover:scale-105 duration-200",
                  activeCategory === category
                    ? "bg-grad-green"
                    : "bg-grad-orange",
                )}
              >
                <span className="drop-shadow-md capitalize">{category}</span>
              </div>
            ))}
          </nav>
        </div>

        {/* content */}
        <div className="p-4 md:p-8 md:pt-4 w-full h-[calc(100vh-56px)] flex flex-col">
          <div className="">
            {/* highlight */}
            <div className="md:hidden">
              <Video
                src={`https://bisindo-surakarta.com/uploads/video/kosakata/video/${playedLabel}.mp4`}
                label={playedLabel}
                labelInside
              />
            </div>

            {/* topbar */}
            <div className="flex justify-end items-baseline sticky top-8 z-50 mt-4 md:mt-0 drop-shadow-xl">
              {/* <h1 className="text-2xl font-medium text-c-05">Kamus SIBI</h1> */}
              <div className="group w-full md:w-[300px] flex items-center rounded-full border border-gray-300 shadow-sm  focus:border-indigo-300 px-4 text-c-05 bg-white">
                <HiSearch className="w-6 h-6 " />
                <input
                  type="text"
                  className="block w-full border-0 focus:ring-0"
                  placeholder="cari..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* video boxes */}
          <RenderIf when={filteredDictItems.length === 0}>
            {/* TODO: styling not found */}
            <div className="text-center mt-4">
              Tidak dapat menemukan
              <div>
                <strong>{search}</strong>
              </div>
            </div>
          </RenderIf>
          <div className="grid gap-2 md:gap-4 grid-cols-2 lg:grid-cols-4 mt-4 overflow-auto flex-1">
            {filteredDictItems.map((item, index) => (
              <Video
                key={item.label}
                src={`https://bisindo-surakarta.com/uploads/video/kosakata/video/${item.label}.mp4`}
                label={item.label}
              ></Video>
            ))}
          </div>
        </div>

        {/* decoration */}
        <BackgroundDecoration />
      </div>
    </DefaultLayout>
  );
}

export default Dictionary;
