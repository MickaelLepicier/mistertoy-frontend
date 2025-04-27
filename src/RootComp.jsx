import { Provider } from 'react-redux'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import { store } from './store/store'
import './assets/style/main.css'

import { AppHeader } from './cmps/AppHeader'
import { AppFooter } from './cmps/AppFooter'
import { UserMsg } from './cmps/UserMsg'
import { HomePage } from './pages/HomePage'
import { AboutUs } from './pages/AboutUs'
import { ToyIndex } from './pages/ToyIndex'


//TODOS - Add CSS

// imports:

// ToyIndex (Filter, ToyList, ToyPreview)
// ToyDetails
//

// TODO keep going ;)

function App() {
  const style = {
    minHeight: 'calc(100vh - 250px)'
  }

  return (
    <Provider store={store}>
      <Router>
        <section >
          <AppHeader />
          <main style={style}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutUs />} />
              <Route path="/toy" element={<ToyIndex />} />
            
            </Routes>
          </main>
          <AppFooter />
        </section>
      </Router>
      <UserMsg />
    </Provider>
  )
}

export default App
