export type SelectGameMethod = () => "hangman" | "mcq" | "matching" | "logo"

export const selectRandomGame: SelectGameMethod = () => {
    const games: readonly ("hangman" | "mcq" | "matching" | "logo")[] = ["hangman", "mcq", "matching", "logo"];
    
    const randomIndex = Math.floor(Math.random() * games.length);
    return games[randomIndex];
};
