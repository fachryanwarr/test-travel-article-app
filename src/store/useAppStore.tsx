import { createSelectorHooks } from "auto-zustand-selectors-hook";
import { produce } from "immer";
import { create } from "zustand";

type AppStoreType = {
  isLoading: boolean;
  setLoading: (status: boolean) => void;
};

const useAppStoreBase = create<AppStoreType>((set) => ({
  isLoading: false,
  setLoading: (status: boolean) => {
    set(
      produce<AppStoreType>((state) => {
        state.isLoading = status;
      })
    );
  },
}));

const useAppStore = createSelectorHooks(useAppStoreBase);

export default useAppStore;
