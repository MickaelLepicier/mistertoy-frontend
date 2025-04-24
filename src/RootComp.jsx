import { Provider } from 'react-redux'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import { store } from './store/store'
import './assets/style/main.css'

import { AppHeader } from './cmps/AppHeader'
import { AppFooter } from './cmps/AppFooter'
import { UserMsg } from './cmps/UserMsg'
import { HomePage } from './pages/HomePage'


//TODOS - Add CSS

// imports:
// HomePage

// ToyIndex (Filter, ToyList, ToyPreview)
// ToyDetails
//

// TODO keep going ;)

function App() {
  const style = {
    display: 'flex',
    flexDirection: 'column',
  }

  return (
    <Provider store={store}>
      <Router>
        <section >
          <AppHeader />
          {/* <main style={{ flex: 1 }}> */}
          <main style={style}>
            <Routes>
              <Route path="/" element={<HomePage />} />
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
