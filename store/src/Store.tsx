import { create } from "zustand";
const useUserState = create((set) => ({
  name: "zhangsan",
  setName: (name: string) => set({ name }),
  isLoggenedIn: true,
  setIsLoggenedIn: (isLoggenedIn: boolean) => set({ isLoggenedIn }),
  Logout: () => set({ isLoggenedIn: false }),
  accessToken: "",
  setAccessToken: (accessToken: string) => set({ accessToken }),
}));
export { useUserState };
