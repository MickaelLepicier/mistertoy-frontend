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
import { ToyDetails } from './pages/ToyDetails'
import { ToyEdit } from './cmps/ToyEdit'


//TODOS - Add CSS

// imports:

// ToyDetails
// ToyEdit

// TODO keep going ;)

function App() {
  const style = {
    minHeight: 'calc(100vh - 228px)'
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
              <Route path="/toy/:toyId" element={<ToyDetails />} />
              <Route path="/toy/edit/:toyId?" element={<ToyEdit />} />
              {/* <Route element={<ToyDashboard />} path="/dashboard" /> */}
              
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
