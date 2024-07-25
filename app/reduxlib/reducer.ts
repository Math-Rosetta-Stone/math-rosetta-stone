// reducer.ts
import { SET_SELECTED_GAMES } from "./actions"
import { Game } from "../map/constants"

interface State {
  selectedGames: Game[]
}

const initialState: State = {
  selectedGames: [],
}

const reducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_SELECTED_GAMES:
      return {
        ...state,
        selectedGames: action.payload,
      }
    default:
      return state
  }
}

export default reducer
