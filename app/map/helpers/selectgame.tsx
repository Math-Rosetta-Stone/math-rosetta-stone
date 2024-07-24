import { GAMES } from "../constants"
export type SelectGameMethod = () => "hangman" | "mcq" | "matching" | "logo"

export const selectRandomGame: SelectGameMethod = () => {

    const randomIndex = Math.floor(Math.random() * GAMES.length);
    return GAMES[randomIndex];
};
