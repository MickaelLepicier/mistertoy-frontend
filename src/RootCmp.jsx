

// TODO - create < AppHeader /> and add all the code here

import { Provider } from "react-redux"
import { store } from "./store/store"
import { Router } from "react-router-dom"



export function App(){
    const obj = {
        className: "main-layout app"
    }

    return (
        <Provider store={store} >
            <Router future={{
                 v7_startTransition: true,
                 v7_relativeSplatPath: true
            }} >
                <section {...obj}>
                <AppHeader /> 

                </section>

            </Router>
        </Provider>
    )
}