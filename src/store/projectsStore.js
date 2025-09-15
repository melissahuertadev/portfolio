// src/store/projectsStore.js
import { create } from "zustand";

export const useProjectsStore = create((set) => ({
  selectedTab: "Web",
  setSelectedTab: (tab) => set({ selectedTab: tab }),
}));
