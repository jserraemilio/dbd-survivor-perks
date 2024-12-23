import { useEffect, useState } from "react";
import perksData from "../Perks/perks.json";
import Perk from "../Perks/Perk";
import { Perk as TypePerk } from "../../types/perk";
import { generateRandomString } from "../../utils/randomStrByBaseStr";
import toast, { Toaster } from "react-hot-toast";

const LOCAL_ITEM_KEY = "dbdsurvivorperksbuilds" as const;

export default function NewBuild() {
  const [query, setQuery] = useState("");
  const [perks, setPerks] = useState(perksData);
  const [selectedSlot, setSelectedSlot] = useState(0);
  const [build, setBuild] = useState([null, null, null, null]);
  const [buildName, setBuildName] = useState("");

  const handleOnChange = (event: any) => {
    const value = event.target.value.toLowerCase();
    setQuery(value);

    const results = perksData.filter(
      (perk) =>
        perk.name.toLowerCase().includes(value) ||
        perk.description.toLowerCase().includes(value) ||
        perk.survivorName.toLowerCase().includes(value)
    );

    setPerks(results);
  };

  // Crea localItem si no existe, y settea el state de builds
  useEffect(() => {
    const localItem = localStorage.getItem(LOCAL_ITEM_KEY);

    if (!localItem) {
      localStorage.setItem(LOCAL_ITEM_KEY, JSON.stringify([]));
    }
  }, []);

  return (
    <div className="flex flex-col justify-center items-center mt-20">
      <div>
        <Toaster />
      </div>
      <h1 className="text-5xl font-bold mb-20">New build</h1>
      <ul className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {build.map((perkName, index) => {
          return (
            <div
              key={index}
              className={selectedSlot === index ? "bg-red-400" : ""}
              onClick={() => {
                // const perk = build[index];
                // if (perk) {
                //   const newBuild = [...build];
                //   newBuild[index] = null;
                //   setBuild(newBuild);
                // }
                setSelectedSlot(index);
              }}
            >
              {perkName ? (
                <Perk
                  perk={perksData.find(
                    (perk) => perk.name.toLowerCase() === perkName.toLowerCase()
                  )}
                  hideName
                />
              ) : (
                <img
                  key={index}
                  src="/public/emptyPerkSlot.png"
                  alt="New build perk slot"
                />
              )}
            </div>
          );
        })}
      </ul>
      <div className="mt-6 flex gap-4">
        <label
          className="bg-[#1e2734] rounded-lg block focus-within:ring-4 focus-within:ring-[#1289f8]"
          htmlFor="perkSearch"
        >
          <div className="flex border border-[#ffffff1f] rounded-lg">
            <input
              className="text-lg w-full p-2 bg-transparent focus:outline-none"
              onChange={(event) => setBuildName(event.target.value)}
              type="search"
              name="buildName"
              placeholder="Build name"
              autoComplete="off"
            />
          </div>
        </label>
        <button
          className="bg-[#1e2734] border border-[#ffffff1f] hover:bg-transparent rounded-lg px-4 py-2"
          onClick={() => {
            if (build.includes(null)) {
              toast.error("Build must have 4 perks");
              return;
            }

            const previousBuilds = JSON.parse(
              localStorage.getItem(LOCAL_ITEM_KEY)
            );

            const newBuildName = buildName ? buildName.trim() : "Unnamed build";

            const newBuild = [
              ...previousBuilds,
              {
                id: generateRandomString(newBuildName, 32),
                name: newBuildName,
                perks: build,
              },
            ];

            localStorage.setItem(LOCAL_ITEM_KEY, JSON.stringify(newBuild));
            toast.success("Build saved successfully");
            setBuild([null, null, null, null]);
            setSelectedSlot(0);
          }}
        >
          Save new build
        </button>
      </div>
      <search className="w-full h-14 mt-12">
        <label
          className="bg-[#1e2734] rounded-lg block focus-within:ring-4 focus-within:ring-[#1289f8]"
          htmlFor="perkSearch"
        >
          <div className="flex border border-[#ffffff1f] rounded-lg">
            <div className="flex items-center pl-4 pr-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-[#707987] icon icon-tabler icons-tabler-outline icon-tabler-search"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
                <path d="M21 21l-6 -6" />
              </svg>
            </div>
            <input
              className="text-lg w-full h-14 p-2 bg-transparent focus:outline-none"
              onChange={handleOnChange}
              value={query}
              type="search"
              id="perkSearch"
              name="q"
              placeholder="Search for Perk name or Survivor name"
              autoComplete="off"
            />
          </div>
        </label>
      </search>
      <div className="w-full mt-12">
        <h3 className="text-xl mb-5">
          {query ? (
            <>
              Results for <span className="font-semibold">{query}</span>
            </>
          ) : (
            <span className="font-semibold">All perks</span>
          )}
        </h3>
        <ul className="grid grid-cols-2 md:grid-cols-5 lg:grid-cols-7 gap-4">
          {perks?.map((perk: TypePerk) => (
            <div
              className={build.includes(perk.name) ? "bg-red-400" : ""}
              key={perk.name}
              onClick={() => {
                const newBuild = [...build];

                // Buscamos si el perk ya está en el build
                const perkIndex = newBuild.findIndex(
                  (perkName) => perkName === perk.name
                );

                // Si la perk ya está en la build, eliminamos la perk y marcamos el slot donde estaba la perk
                if (perkIndex !== -1) {
                  newBuild[perkIndex] = null;
                  setBuild(newBuild);
                  setSelectedSlot(perkIndex);
                  return;
                }

                // Añadimos la perk al slot seleccionado
                if (selectedSlot < newBuild.length) {
                  newBuild[selectedSlot] = perk.name;
                  setBuild(newBuild);
                  setSelectedSlot(
                    selectedSlot !== 3 ? selectedSlot + 1 : selectedSlot
                  );
                }
                // TODO:
                // 1) Solo avanzar el slot si los demás slots están llenos
                // 2) En caso de que algun slot anterior a este este vacio, seleccionar el slot vacio previo, en vez del slot siguiente
                // 3) Limpiar query y listado
                // 4) Evitar salto de imagen cuando se cambia de imagen un slot
              }}
            >
              <Perk perk={perk} />
            </div>
          ))}
        </ul>
        {!perks || (perks.length === 0 && <p>No results found</p>)}
      </div>
    </div>
  );
}
