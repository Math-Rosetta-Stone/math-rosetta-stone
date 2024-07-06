import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

const selectRandomGame = (router: AppRouterInstance) => {
    const games: readonly string[] = ["hangman", "mcq", "matching", "logo"];
    
    const randomIndex = Math.floor(Math.random() * games.length);
    router.push('/' + games[randomIndex]);
};

export default selectRandomGame;