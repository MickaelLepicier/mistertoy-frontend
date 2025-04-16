// toyService

export const SET_TOYS = 'SET_TOYS'
export const REMOVE_TOY = 'REMOVE_TOY'
export const ADD_TOY = 'ADD_TOY'
export const UPDATE_TOY = 'UPDATE_TOY'
export const TOY_UNDO = 'TOY_UNDO'

export const SET_FILTER_BY = 'SET_FILTER_BY'
export const SET_IS_LOADING = 'SET_IS_LOADING'

const initialState = {
  toys: [],
  isLoading: false,
  filterBy: toyService.getDefaultFilter(),
  lastToys: []
}

export function toyReducer(state = initialState, cmd = {}) {
  switch (cmd.type) {
    case SET_TOYS:
      return { ...state, toys: cmd.toys }

    case REMOVE_TOY:
      const lastToys = { ...state.toys }
      return {
        ...state,
        toys: state.toys.filter((toy) => toy._id !== cmd.toyId),
        lastToys
      }

    case ADD_TOY:
      return { ...state, toys: [...state.toys, cmd.toy] }

    case UPDATE_TOY:
      return {
        ...state,
        toys: state.toys.map((toy) => (toy._id === cmd.toy._id ? cmd.toy : toy))
      }

    case TOY_UNDO:
      return { ...state, toys: [...state.lastToys] }

    case SET_FILTER_BY:
      return { ...state, filterBy: { ...state.filterBy, ...cmd.filterBy } }

    case SET_IS_LOADING:
      return { ...state, isLoading: cmd.isLoading }

    default:
      return state
  }
}
