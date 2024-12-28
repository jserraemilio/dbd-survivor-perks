import { useEffect, useState } from "react";
import perksData from "../Perks/perks.json";
import Perk from "../Perks/Perk";
import { Perk as TypePerk } from "../../types/perk";
import { generateRandomString } from "../../utils/randomStrByBaseStr";
import toast, { Toaster } from "react-hot-toast";
import { ClipboardIcon, SearchIcon, TrashIcon } from "../Icons";
import { LOCAL_ITEM_KEY } from "../../types/localItem";
import { useNavigate, useParams } from "react-router";
import ImportBuildBtn from "./ImportBuildBtn";
import DeleteBuildBtn from "./DeleteBuildBtn";

export default function NewBuild({
  isEditMode = false,
}: {
  isEditMode?: boolean;
}) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [perks, setPerks] = useState(perksData);
  const [selectedSlot, setSelectedSlot] = useState(0);
  const [build, setBuild] = useState<(string | null)[]>([
    null,
    null,
    null,
    null,
  ]);
  const [buildName, setBuildName] = useState("");

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setQuery(value);
  };

  useEffect(() => {
    const results = perksData.filter(
      (perk) =>
        perk.name.toLowerCase().includes(query.toLowerCase()) ||
        perk.description.toLowerCase().includes(query.toLowerCase()) ||
        perk.survivorName.toLowerCase().includes(query.toLowerCase())
    );

    setPerks(results);
  }, [query]);

  // Crea localItem si no existe, y settea el state de builds
  useEffect(() => {
    const localItem = localStorage.getItem(LOCAL_ITEM_KEY);

    if (!localItem) {
      localStorage.setItem(LOCAL_ITEM_KEY, JSON.stringify([]));
    }

    const localBuilds = JSON.parse(localStorage.getItem(LOCAL_ITEM_KEY));

    if (isEditMode) {
      const buildToEdit = localBuilds.find((build: any) => build.id === id);
      if (!buildToEdit) {
        navigate("/builds");
        toast.error("Build not found");
        return;
      }

      setBuildName(buildToEdit.name);
      setBuild(buildToEdit.perks);
    }
  }, []);

  return (
    <div className={`flex flex-col justify-center items-center mt-20`}>
      <div>
        <Toaster containerClassName="mt-[64px]" />
      </div>
      <h1 className="text-5xl font-bold mb-20">
        {isEditMode ? "Edit" : "New"} build
      </h1>
      <ul className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full md:h-[256px]">
        {build.map((perkName, index) => {
          return (
            <div
              key={index}
              className={`${
                selectedSlot === index
                  ? "bg-[#ffffff1f] rounded-lg shadow-2xl"
                  : ""
              } w-fit`}
              onClick={() => {
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
                  draggable="false"
                  width={256}
                  height={256}
                  key={index}
                  src="/emptyPerkSlot.png"
                  alt="New build perk slot"
                />
              )}
            </div>
          );
        })}
      </ul>
      <div className="mt-6 flex flex-col md:flex-row gap-4 md:gap-16">
        <div className="flex gap-4">
          <label
            className="bg-[#1e2734] rounded-lg block focus-within:ring-4 focus-within:ring-[#1289f8]"
            htmlFor="perkSearch"
          >
            <div className="flex border border-[#ffffff1f] rounded-lg">
              <input
                className="text-lg md:w-[250px] p-2 bg-transparent focus:outline-none"
                value={buildName}
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

              const localItem = localStorage.getItem(LOCAL_ITEM_KEY);
              const previousBuilds = localItem ? JSON.parse(localItem) : [];

              const newBuildName = buildName
                ? buildName.trim()
                : "Unnamed build";

              let newBuild = [];
              if (isEditMode) {
                newBuild = previousBuilds.map((prevBuild: any) => {
                  if (prevBuild.id === id) {
                    return {
                      id: id,
                      name: newBuildName,
                      perks: build,
                    };
                  }
                  return prevBuild;
                });
              } else {
                newBuild = [
                  ...previousBuilds,
                  {
                    id: generateRandomString(newBuildName, 32),
                    name: newBuildName,
                    perks: build,
                  },
                ];
              }

              localStorage.setItem(LOCAL_ITEM_KEY, JSON.stringify(newBuild));
              toast.success("Build saved successfully!");
              if (isEditMode) {
                navigate("/builds");
                return;
              }
              setBuild([null, null, null, null]);
              setSelectedSlot(0);
              setQuery("");
              setBuildName("");
            }}
          >
            Save
          </button>
        </div>
        <div className="flex gap-4">
          <ImportBuildBtn />
          <button
            className="bg-[#1e2734] border border-[#ffffff1f] hover:bg-transparent rounded-lg px-4 py-2 w-fit"
            onClick={() => {
              if (!window.isSecureContext) {
                toast.error(
                  "Clipboard API is not available in insecure contexts"
                );
              }

              if (build.includes(null)) {
                toast.error("Build must have 4 perks to copy to clipboard");
                return;
              }

              navigator.clipboard.writeText(
                `${
                  buildName && buildName.length > 0
                    ? buildName
                    : "Unnamed build"
                }###${JSON.stringify(build)}`
              );
              toast.success("Build copied to clipboard");
            }}
          >
            <ClipboardIcon />
          </button>
          <DeleteBuildBtn
            deleteVariant={isEditMode ? "edit" : "new"}
            setBuild={setBuild}
            setBuildName={setBuildName}
            build={build}
            builds={null}
            setBuilds={null}
            setSelectedSlot={setSelectedSlot}
          />
        </div>
      </div>
      <search className="w-full h-14 mt-12">
        <label
          className="bg-[#1e2734] rounded-lg block focus-within:ring-4 focus-within:ring-[#1289f8]"
          htmlFor="perkSearch"
        >
          <div className="flex border border-[#ffffff1f] rounded-lg">
            <div className="flex items-center pl-4 pr-4">
              <SearchIcon />
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
              className={
                build.includes(perk.name)
                  ? "bg-[#ffffff1f] rounded-lg shadow-2xl"
                  : ""
              }
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
                }

                const firstEmptyPreviousSlot = newBuild
                  .slice(0, selectedSlot)
                  .findIndex((perkName) => perkName === null);

                // Si hay un slot vacio previo, seleccionamos ese slot
                if (firstEmptyPreviousSlot !== -1) {
                  setSelectedSlot(firstEmptyPreviousSlot);
                } else {
                  const firstEmptyNextSlot = newBuild
                    .slice(selectedSlot + 1)
                    .findIndex((perkName) => perkName === null);

                  // Si hay un slot vacio siguiente, seleccionamos ese slot
                  if (firstEmptyNextSlot !== -1) {
                    setSelectedSlot(selectedSlot + 1 + firstEmptyNextSlot);
                  }
                }
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
