// toyService
// showSuccessMsg


import { toyService } from "../../services/toy.service";
import { store } from "../store";
import { SET_IS_LOADING } from "./toyReducer";

// TODO keep building this
export function loadToys(){

const filterBy = store.getState().toyModule.filterBy
store.dispatch({type: SET_IS_LOADING, isLoading: true})

return toyService.query(filterBy).then(toys=>{
    //
})


}


