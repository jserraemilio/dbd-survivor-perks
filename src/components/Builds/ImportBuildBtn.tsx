import toast from "react-hot-toast";
import { LOCAL_ITEM_KEY } from "../../types/localItem";
import { generateRandomString } from "../../utils/randomStrByBaseStr";
import { CloseIcon, ImportIcon } from "../Icons";
import { useEffect, useState } from "react";
import perksData from "../Perks/perks.json";

export default function ImportBuildBtn({ setBuilds }: { setBuilds?: any }) {
  const [showImportBuildModal, setShowImportBuildModal] = useState(false);

  useEffect(() => {
    if (showImportBuildModal) {
      document.querySelector("body")?.classList.add("overflow-hidden");
    } else {
      document.querySelector("body")?.classList.remove("overflow-hidden");
    }
  }, [showImportBuildModal]);
  return (
    <>
      {showImportBuildModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-10"
          onClick={() => {
            setShowImportBuildModal(false);
          }}
        >
          <dialog
            className="bg-[#121b28] rounded-lg p-6 w-[400px] h-[250px] relative flex justify-center items-center"
            open={showImportBuildModal}
            onClick={(event) => {
              event.stopPropagation();
            }}
          >
            <button
              className="absolute top-2 right-2"
              onClick={() => {
                setShowImportBuildModal(false);
              }}
            >
              <CloseIcon />
            </button>
            <div>
              <form
                className="flex flex-col gap-8 items-center"
                onSubmit={(event) => {
                  event.preventDefault();
                  const inputVal = event.target[0].value;
                  const splitInput = inputVal.split("###");
                  if (splitInput.length < 2) {
                    toast.error("Invalid build code");
                    return;
                  }
                  const buildName = splitInput[0];
                  const buildData = JSON.parse(splitInput[1]);

                  if (
                    !buildName ||
                    !Array.isArray(buildData) ||
                    buildData.some(
                      (perk) => !perksData.find((p) => p.name === perk)
                    )
                  ) {
                    toast.error("Invalid build code");
                    return;
                  }

                  toast.success("Build imported successfully!");
                  const localItem = localStorage.getItem(LOCAL_ITEM_KEY);
                  const previousBuilds = localItem ? JSON.parse(localItem) : [];
                  const newBuild = [
                    ...previousBuilds,
                    {
                      id: generateRandomString(buildName, 32),
                      name: buildName,
                      perks: buildData,
                    },
                  ];
                  localStorage.setItem(
                    LOCAL_ITEM_KEY,
                    JSON.stringify(newBuild)
                  );
                  if (setBuilds) {
                    setBuilds(newBuild);
                  }
                  setShowImportBuildModal(false);
                }}
              >
                <label
                  className="bg-[#1e2734] rounded-lg block focus-within:ring-4 focus-within:ring-[#1289f8]"
                  htmlFor="perkSearch"
                >
                  <div className="flex border border-[#ffffff1f] rounded-lg">
                    <input
                      className="text-lg w-[300px] p-2 bg-transparent focus:outline-none"
                      // onChange={handleOnChange}
                      // value={query}
                      id="importBuild"
                      placeholder="Paste build code here"
                      autoComplete="off"
                    />
                  </div>
                </label>
                <button className="bg-[#1e2734] border border-[#ffffff1f] hover:bg-transparent rounded-lg px-4 py-2 w-fit flex items-center gap-2">
                  <ImportIcon />
                  Import build
                </button>
              </form>
            </div>
          </dialog>
        </div>
      )}
      <button
        className="bg-[#1e2734] border border-[#ffffff1f] hover:bg-transparent rounded-lg px-4 py-2 w-fit flex gap-2"
        onClick={() => {
          setShowImportBuildModal(true);
        }}
      >
        <ImportIcon />
        {setBuilds ? "Import build" : ""}
      </button>
    </>
  );
}
