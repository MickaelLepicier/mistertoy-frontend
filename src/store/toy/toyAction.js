import { showSuccessMsg } from "../../services/event-bus.service.js";
// import { toyService } from "../../services/toy.service.js";
import { toyService } from "../../services/toy.service.local.js";
import { store } from "../store.js";
import { ADD_TOY, REMOVE_TOY, SET_FILTER_BY, SET_IS_LOADING, SET_TOYS, TOY_UNDO, UPDATE_TOY } from "./toyReducer";


export function loadToys(){

const filterBy = store.getState().toyModule.filterBy
store.dispatch({type: SET_IS_LOADING, isLoading: true})

return toyService.query(filterBy).then(toys => {
    store.dispatch({type: SET_TOYS, toys})
}).catch(err =>{
    console.log('toy action -> Cannot load toys: ',err)
    throw err
}).finally(()=>{
    store.dispatch({type: SET_IS_LOADING, isLoading:false})
})

}

export function removeToy(toyId){
    return toyService.remove(toyId).then(()=>{
        store.dispatch({type:REMOVE_TOY, toyId})
    }).catch(err=>{
        console.log('toy action -> Cannot remove toy: ',err)
        throw err
    })
}

export function removeToyOptimistic(toyId){
    store.dispatch({type: REMOVE_TOY, toyId})

    return toyService.remove(toyId).then(()=>{
        showSuccessMsg('Removed Toy!')
    }).catch(err=>{
        store.dispatch({type: TOY_UNDO})
        console.log('toy action -> Cannot remove toy: ',err)
        throw err
    })
}


export function saveToy(toy){
    const type = toy._id ? UPDATE_TOY : ADD_TOY

    return toyService.save(toy).then(savedToy=>{
        store.dispatch({type, toy:savedToy})
        return savedToy
    }).catch(err =>{
        console.log('toy action -> Cannot save toy: ',err)
        throw err
    })
}

export function setFilterBy(filterBy){
    store.dispatch({type: SET_FILTER_BY, filterBy})
}

