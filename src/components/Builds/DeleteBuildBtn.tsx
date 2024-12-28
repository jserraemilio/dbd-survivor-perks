import { useState } from "react";
import { deleteBuildById } from "../../utils/deleteBuildById";
import { LOCAL_ITEM_KEY } from "../../types/localItem";
import { CloseIcon, TrashIcon } from "../Icons";
import { Build } from "../../types/build";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router";

export default function DeleteBuildBtn({
  setBuilds,
  builds,
  build,
  setBuild,
  setBuildName,
  setSelectedSlot,
  deleteVariant,
}: {
  setBuilds: any;
  builds: any;
  build: any;
  setBuild: any;
  setBuildName: any;
  setSelectedSlot: any;
  deleteVariant?: string;
}) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showConfirmDeleteModal, setShowConfirmDeleteModal] = useState(false);

  return (
    <>
      {showConfirmDeleteModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-10"
          onClick={() => {
            setShowConfirmDeleteModal(false);
          }}
        >
          <dialog
            className="bg-[#121b28] rounded-lg p-6 w-[400px] h-[250px] relative flex justify-center items-center"
            open={showConfirmDeleteModal}
            onClick={(event) => {
              event.stopPropagation();
            }}
          >
            <button
              className="absolute top-2 right-2"
              onClick={() => {
                setShowConfirmDeleteModal(false);
              }}
            >
              <CloseIcon />
            </button>
            <div className="flex flex-col items-center gap-4">
              <p>
                Do you really want to delete{" "}
                <strong className="text-red-500">
                  {deleteVariant === "all" ? "ALL builds" : "this build"}
                </strong>{" "}
                ?
              </p>
              <button
                className="bg-[#1e2734] border border-[#ffffff1f] hover:bg-transparent rounded-lg px-4 py-2 w-fit flex items-center gap-2"
                onClick={() => {
                  if (deleteVariant === "all") {
                    localStorage.setItem(LOCAL_ITEM_KEY, JSON.stringify([]));
                    setBuilds([]);
                    toast.success("All builds deleted successfully!");
                    setShowConfirmDeleteModal(false);
                    return;
                  }

                  if (deleteVariant === "edit") {
                    const localBuilds = JSON.parse(
                      localStorage.getItem(LOCAL_ITEM_KEY)
                    );
                    const buildToEdit = localBuilds.findIndex(
                      (build: any) => build.id === id
                    );
                    localBuilds.splice(buildToEdit, 1);
                    localStorage.setItem(
                      LOCAL_ITEM_KEY,
                      JSON.stringify(localBuilds)
                    );
                    toast.success("Build deleted successfully!");
                    navigate("/builds");
                    return;
                  }

                  const res = deleteBuildById(build.id);
                  if (res) {
                    setBuilds(builds.filter((b: Build) => b.id !== build.id));
                  }
                  setShowConfirmDeleteModal(false);
                  toast.success("Build deleted successfully!");
                }}
              >
                <TrashIcon />
                Delete build
              </button>
            </div>
          </dialog>
        </div>
      )}
      <button
        className="bg-[#1e2734] border border-[#ffffff1f] hover:bg-transparent rounded-lg px-4 py-2 w-fit flex gap-2"
        onClick={() => {
          if (deleteVariant !== "new") {
            setShowConfirmDeleteModal(true);
            return;
          }
          setBuildName("");
          setBuild([null, null, null, null]);
          setSelectedSlot(0);
        }}
      >
        <TrashIcon />
        {deleteVariant === "all" ? "Delete all builds" : ""}
      </button>
    </>
  );
}
