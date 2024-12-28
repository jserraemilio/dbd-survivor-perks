import toast from "react-hot-toast";
import { Build } from "../types/build";
import { LOCAL_ITEM_KEY } from "../types/localItem";

export function deleteBuildById(id: string) {
  const localItem = localStorage.getItem(LOCAL_ITEM_KEY);

  if (!localItem) {
    toast.error("An error occurred while deleting the build.");
    return false
  }

  const parsedLocalItem = JSON.parse(localItem);
    const updatedLocalItem = parsedLocalItem.filter(
      (build: Build) => build.id !== id
    );

    localStorage.setItem(LOCAL_ITEM_KEY, JSON.stringify(updatedLocalItem));
    return true
}