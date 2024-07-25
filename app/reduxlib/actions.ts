// actions.ts
import { Game } from "../map/constants"

export const SET_SELECTED_GAMES = "SET_SELECTED_GAMES"

export const setSelectedGames = (games: Game[]) => ({
  type: SET_SELECTED_GAMES,
  payload: games,
})
