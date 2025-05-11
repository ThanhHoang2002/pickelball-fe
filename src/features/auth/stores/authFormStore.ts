import { create } from "zustand";

type AuthFormState = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

export const useAuthFormStore = create<AuthFormState>((set) => ({
  isOpen: false,
  setIsOpen: (isOpen) => set({ isOpen }),
}));

export const authFormStore = {
  setIsOpen: (val: boolean) => {
    useAuthFormStore.getState().setIsOpen(val);
  },
};


