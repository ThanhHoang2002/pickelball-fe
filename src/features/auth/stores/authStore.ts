import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { User } from "@/features/auth/types/auth.type";

interface AuthState {
  currentUser?: User;
  setCurrentUser: (user: User) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      currentUser: undefined,
      setCurrentUser: (user: User) => set({ currentUser: user }),
      logout: () => {
        set({ currentUser: undefined })
        localStorage.removeItem("accessToken")
      },
    }),
    {
      name: "auth-store", // key trong localStorage
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export const authStore = {
  getCurrentUser: () => useAuthStore.getState().currentUser,
  setCurrentUser: (user: User) => useAuthStore.getState().setCurrentUser(user),
  logout: () => useAuthStore.getState().logout(),
};

export default useAuthStore;
