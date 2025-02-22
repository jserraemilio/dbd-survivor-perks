import { useEffect, useState } from "react";
import perksData from "../Perks/perks.json";
import Perk from "../Perks/Perk";
import { BuildPerk } from "../../types/build";
import { LOCAL_ITEM_KEY } from "../../types/localItem";
import { ClipboardIcon, EditIcon } from "../Icons";
import toast, { Toaster } from "react-hot-toast";
import { Link } from "react-router";
import DeleteBuildBtn from "./DeleteBuildBtn";
import ImportBuildBtn from "./ImportBuildBtn";

export default function Builds() {
  const [query, setQuery] = useState("");
  const [builds, setBuilds] = useState(null);

  const getPerkInfoByName = (name: string) => {
    return perksData[perksData.findIndex((perk) => perk.name === name)];
  };

  const handleOnChange = (event: any) => {
    const value = event.target.value.toLowerCase();
    setQuery(value);

    const localItem = localStorage.getItem(LOCAL_ITEM_KEY);
    if (localItem) {
      setBuilds(
        JSON.parse(localItem).filter(
          (build) =>
            build.name.toLowerCase().includes(value) ||
            build.perks.join("").toLowerCase().includes(value)
        )
      );
    }
  };

  // Crea localItem si no existe, y settea el state de builds
  useEffect(() => {
    const localItem = localStorage.getItem(LOCAL_ITEM_KEY);

    if (localItem) {
      setBuilds(JSON.parse(localItem));
    } else {
      localStorage.setItem(LOCAL_ITEM_KEY, JSON.stringify([]));
      setBuilds([]);
    }
  }, []);

  return (
    <div className="flex flex-col justify-center items-center mt-20">
      <div>
        <Toaster containerClassName="mt-[64px]" />
      </div>
      <h1 className="text-5xl font-bold mb-20">Builds</h1>
      <div className="mb-6 flex gap-4">
        <DeleteBuildBtn
          setBuilds={setBuilds}
          builds={builds}
          build={null}
          deleteVariant="all"
          setBuild={null}
          setBuildName={null}
          setSelectedSlot={null}
        />
        <ImportBuildBtn setBuilds={setBuilds} />
      </div>
      <search className="w-full h-14">
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
            <span className="font-semibold">All builds</span>
          )}
        </h3>
        <div className="flex flex-col gap-16">
          {builds
            ?.slice()
            .reverse()
            .map((build) => {
              return (
                <div key={build.id}>
                  <div className="flex flex-col md:flex-row gap-4 items-center">
                    <strong className="text-2xl">{build.name}</strong>
                    <div className="flex gap-4">
                      <Link
                        to={`/builds/edit/${build.id}`}
                        className="bg-[#1e2734] border border-[#ffffff1f] hover:bg-transparent rounded-lg px-4 py-2 w-fit"
                      >
                        <EditIcon />
                      </Link>
                      <button
                        className="bg-[#1e2734] border border-[#ffffff1f] hover:bg-transparent rounded-lg px-4 py-2 w-fit"
                        onClick={() => {
                          if (!window.isSecureContext) {
                            toast.error(
                              "Clipboard API is not available in insecure contexts"
                            );
                          }
                          const perksNames = build.perks.map((perk) => {
                            return perk;
                          });
                          navigator.clipboard.writeText(
                            `${build.name}###${JSON.stringify(perksNames)}`
                          );
                          toast.success("Build copied to clipboard");
                        }}
                      >
                        <ClipboardIcon />
                      </button>
                      <DeleteBuildBtn
                        setBuilds={setBuilds}
                        build={build}
                        builds={builds}
                        deleteVariant="default"
                        setBuild={null}
                        setBuildName={null}
                        setSelectedSlot={null}
                      />
                    </div>
                  </div>
                  <ul className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
                    {build?.perks?.map((perk: BuildPerk) => {
                      const perkInfo = getPerkInfoByName(perk);
                      return (
                        <Perk key={perkInfo.name} perk={perkInfo} hideName />
                      );
                    })}
                  </ul>
                </div>
              );
            })}
          {!builds || (builds.length === 0 && <p>No builds found</p>)}
        </div>
      </div>
    </div>
  );
}
