import { create } from "zustand";
import { TurnAction } from "../models/turn-action";

type UIStore = {
  action: TurnAction;
};

const useUIStore = create<UIStore>((set) => ({
  action: new TurnAction(null, null),
}));

export { useUIStore };
