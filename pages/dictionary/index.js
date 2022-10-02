import DefaultLayout from "/components/layouts/DefaultLayout";
import { HiSearch } from "react-icons/hi";
import { useMemo, useState } from "react";
import { useRouter } from "next/router";

// const CATEGORIES = [
//   "alphabet",
//   "year",
//   "month",
//   "day",
//   "transportation",
//   "manner",
//   "family",
//   "city",
//   "sport",
//   "job",
//   "place",
// ];

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

  const filteredDictItems = useMemo(() => {
    if (category === "semua") {
      router.replace("/dictionary");
      return;
    }
    const filteredByCategory = dictItems.filter((item) => {
      if (!category || category === CATEGORIES.semua) return true;
      return item.category === category;
    });
    const filteredBySearch = filteredByCategory.filter((item) =>
      item.label.includes(search),
    );
    return filteredBySearch;
  }, [category, dictItems, router, search]);

  return (
    <DefaultLayout title="SIBI Dictionary - Tutur">
      <div className="flex w-full min-h-screen">
        {/* sidebar */}
        <nav className="bg-yellow-100 h-screen shadow-xl rounded-tr-[3em] rounded-br-[3em] p-8 space-y-1">
          {Object.keys(CATEGORIES).map((category, index) => (
            <div
              key={index}
              role="button"
              onClick={() => router.push(`/dictionary?category=${category}`)}
              className="px-6 py-2 bg-grad-orange rounded-full font-medium text-white w-fit"
            >
              <span className="drop-shadow-md capitalize">{category}</span>
            </div>
          ))}
        </nav>

        {/* content */}
        <div className="p-8 w-full">
          {/* search */}
          <div className="flex justify-end">
            <div className="group w-full md:w-[300px] flex items-center rounded-full border border-gray-300 shadow-sm  focus:border-indigo-300 px-4 text-c-05">
              <HiSearch className="w-6 h-6 " />
              <input
                type="text"
                className="block w-full border-0 focus:ring-0"
                placeholder="search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          {/* video boxes */}
          <div className="grid gap-4 grid-cols-2 lg:grid-cols-4 mt-8">
            {filteredDictItems.map((item, index) => (
              <div key={item.label}>
                <video
                  className="shadow-xl rounded-xl aspect-video object-cover object-center"
                  controls
                >
                  <source
                    src={`https://bisindo-surakarta.com/uploads/video/kosakata/video/${item.label}.mp4`}
                  />
                </video>
                <div className="mt-2 font-medium text-center capitalize">
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
}

export default Dictionary;
