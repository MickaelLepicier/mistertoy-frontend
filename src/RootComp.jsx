import { Provider } from 'react-redux'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import { store } from './store/store'
import './assets/style/main.scss'

import { AppHeader } from './cmps/AppHeader'
import { AppFooter } from './cmps/AppFooter'
import { UserMsg } from './cmps/UserMsg'
import { HomePage } from './pages/HomePage'
import { About } from './pages/About'
import { ToyIndex } from './pages/ToyIndex'
import { ToyDetails } from './pages/ToyDetails'
import { ToyEdit } from './cmps/ToyEdit'
import { ToyDashboard } from './pages/ToyDashboard'
import { DynamicModal } from './cmps/DynamicModal'
import { ReviewIndex } from './pages/ReviewIndex'
import { UserDetails } from './pages/UserDetails'

function App() {
  const style = {
    minHeight: '85vh'
  }

  return (
    <Provider store={store}>
      <Router
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true
        }}
      >
        <section className="main-layout app">
          <AppHeader />
          <main style={style}>
            <Routes>
              <Route element={<HomePage />} path="/" />
              <Route element={<About />} path="/about" />
              <Route element={<ToyIndex />} path="/toy" />
              <Route element={<ToyDetails />} path="/toy/:toyId" />
              <Route element={<ToyEdit />} path="/toy/edit/:toyId?" />
              <Route element={<ToyDashboard />} path="/dashboard" />
              <Route element={<ReviewIndex />} path="/review" />
              <Route element={<UserDetails />} path="/user" />
            </Routes>
          </main>
          <DynamicModal />
          <AppFooter />
        </section>
      </Router>
      <UserMsg />
    </Provider>
  )
}

export default App
