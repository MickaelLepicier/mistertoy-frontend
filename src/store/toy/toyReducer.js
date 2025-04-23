import { toyService } from "../../services/toy.service"

// Toys
export const SET_TOYS = 'SET_TOYS'
export const REMOVE_TOY = 'REMOVE_TOY'
export const ADD_TOY = 'ADD_TOY'
export const UPDATE_TOY = 'UPDATE_TOY'
export const TOY_UNDO = 'TOY_UNDO'

// Filter
export const SET_FILTER_BY = 'SET_FILTER_BY'
export const SET_SORT_BY = 'SET_SORT_BY'

// isLoading
export const SET_IS_LOADING = 'SET_IS_LOADING'

const initialState = {
  toys: [],
  filterBy: toyService.getDefaultFilter(),
  sortBy: toyService.getDefaultSort(),
  lastToys: [],

  isLoading: false
}

export function toyReducer(state = initialState, cmd) {
  let toys
  switch (cmd.type) {
    // Toys
    case SET_TOYS:
      return { ...state, toys: cmd.toys, lastToys: state.toys }

    case REMOVE_TOY:
      toys = state.toys.filter((toy) => toy._id !== cmd.toyId)
      return {
        ...state,
        toys,
        lastToys: state.toys
      }

    case ADD_TOY:
      toys = [cmd.toy, ...state.toys]
      return { ...state, toys, lastToys: state.toys }

    case UPDATE_TOY:
      toys = state.toys.map((toy) => (toy._id === cmd.toy._id ? cmd.toy : toy))
      return {
        ...state,
        toys,
        lastToys: state.toys
      }

      case TOY_UNDO:
        return { ...state, toys: [...state.lastToys] }

    // Filter
    case SET_FILTER_BY:
      return { ...state, filterBy: { ...state.filterBy, ...cmd.filterBy } }

    case SET_SORT_BY:
      return { ...state, sortBy: {...cmd.sortBy } }


    // isLoading
    case SET_IS_LOADING:
      return { ...state, isLoading: cmd.isLoading }

    default:
      return state
  }
}
