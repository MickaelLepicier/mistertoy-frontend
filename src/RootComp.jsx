import { Provider } from "react-redux"
import { Route, BrowserRouter as Router, Routes } from "react-router-dom"


// imports:
// store
// AppHeader
// AppFooter
// UserMsg
// HomePage

 function App(){


    return(
        <Provider store={store}>
            <Router>

            <section>
                <AppHeader/>
                <main>
                    <Routes>
                        <Route path='/' element={<HomePage/>}/>
                    </Routes>
                </main>
                <AppFooter/>
            </section>

            </Router>
            <UserMsg/>
        </Provider>
    )

}

export default App
