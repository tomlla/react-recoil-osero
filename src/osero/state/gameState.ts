import { atom } from "recoil";
import { Game } from "../core/game";

export const defaultGameState = atom<Game>({
  key: "defaultGame",
  default: Game.new(),
});
