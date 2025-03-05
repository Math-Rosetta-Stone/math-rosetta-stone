import { Game, GAMES } from "../constants/constants";
export type SelectGameMethod = () => Game;

export const selectRandomGame: SelectGameMethod = () => {
  const randomIndex = Math.floor(Math.random() * GAMES.length);
  return GAMES[randomIndex];
};
