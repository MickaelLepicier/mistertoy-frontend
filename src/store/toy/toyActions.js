import { toyService } from '../../services/toy.service'
import { store } from '../store'
import { SET_TOYS, REMOVE_TOY, SET_IS_LOADING, TOY_UNDO, SET_FILTER_BY, SET_SORT_BY } from './toyReducer'


export function loadToys() {
  const { filterBy, sortBy } = store.getState().toyModule
  store.dispatch({ SET_IS_LOADING, isLoading: true })

  return toyService
    .query(filterBy, sortBy)
    .then((toys) => {
      store.dispatch({ type: SET_TOYS, toys })
    })
    .catch((err) => {
      console.log('toy action -> Cannot load toys')
      throw err
    })
    .finally(() => {
      setTimeout(() => {
        store.dispatch({ type: SET_IS_LOADING, isLoading: false })
      }, 350)
    })
}

export function removeToy(toyId) {
  return toyService
    .remove(toyId)
    .then(() => {
      store.dispatch({ type: REMOVE_TOY, toyId })
    })
    .catch((err) => {
      console.log('toy action -> Cannot remove toy ', err)
      throw err
    })
}

export function removeToyOptimistic(toyId){
    store.dispatch({type: REMOVE_TOY, toyId})

    return toyService.remove(toyId).catch(err=>{
        store.dispatch({type: TOY_UNDO})
        console.log('toy action -> Cannot remove toy ', err)
        throw err
    })

}

export function saveToy(toy) {
  // add || update
  const type = toy._id ? UPDATE_TOY : ADD_TOY

  return toyService
    .save(toy)
    .then((toyToSave) => {
      state.dispatch({ type, toy: toyToSave })
      return toyToSave
    })
    .catch((err) => {
      console.log('toy action -> Cannot save toy ', err)
      throw err
    })
}


export function setFilter(filterBy = toyService.getDefaultFilter()){
    store.dispatch({type: SET_FILTER_BY, filterBy})
}

export function setSort(sortBy = toyService.getDefaultSort()){
    store.dispatch({type:SET_SORT_BY, sortBy})
}
