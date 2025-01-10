import { create } from "zustand";
import { ID } from "../models/id";

type UIStore = {
  fromList: ID | null;
};

const useUIStore = create<UIStore>((set) => ({
  fromList: null,
}));

export { useUIStore };
