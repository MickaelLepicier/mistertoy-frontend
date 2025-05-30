import { toyService } from '../../services/toy'
import { store } from '../store'
import {
  SET_TOYS,
  REMOVE_TOY,
  SET_IS_LOADING,
  TOY_UNDO,
  SET_FILTER_BY,
  SET_SORT_BY,
  UPDATE_TOY,
  ADD_TOY,
  SET_PAGE_IDX
} from './toy.reducer'

export async function loadToys(pageIdx) {
  const { filterBy, sortBy } = store.getState().toyModule
  store.dispatch({ type: SET_IS_LOADING, isLoading: true })

  try {
    const toys = await toyService.query(filterBy, sortBy, pageIdx)
    store.dispatch({ type: SET_TOYS, toys })
  } catch (err) {
    console.log('toy action -> Cannot load toys')
    throw err
  } finally {
    setTimeout(() => {
      store.dispatch({ type: SET_IS_LOADING, isLoading: false })
    }, 350)
  }
}

export async function removeToy(toyId) {
  try {
    await toyService.remove(toyId)
    store.dispatch({ type: REMOVE_TOY, toyId })
  } catch (err) {
    console.log('toy action -> Cannot remove toy ', err)
    throw err
  }
}

export async function removeToyOptimistic(toyId) {
  store.dispatch({ type: REMOVE_TOY, toyId })

  try {
    await toyService.remove(toyId)
  } catch (err) {
    store.dispatch({ type: TOY_UNDO })
    console.log('toy action -> Cannot remove toy ', err)
    throw err
  }
}

export async function saveToy(toy) {
  console.log('toy: ',toy)
  // add || update
  const type = toy._id ? UPDATE_TOY : ADD_TOY

  try {
    const toyToSave = await toyService.save(toy)
    store.dispatch({ type, toy: toyToSave })
    return toyToSave
  } catch (err) {
    console.log('toy action -> Cannot save toy ', err)
    throw err
  }
}

export function setFilter(filterBy = toyService.getDefaultFilter()) {
  store.dispatch({ type: SET_FILTER_BY, filterBy })
}

export function setSort(sortBy = toyService.getDefaultSort()) {
  store.dispatch({ type: SET_SORT_BY, sortBy })
}

export function setPageIdx(pageIdx = 0) {
  if (pageIdx >= 3) pageIdx = 0
  store.dispatch({ type: SET_PAGE_IDX, pageIdx })
}
