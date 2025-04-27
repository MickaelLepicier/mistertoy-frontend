import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'

export function AppHeader() {
  // const filterBy = useSelector(storeState => storeState.toys)
  // const sortBy = useSelector(storeState => storeState.toys)

  return (
    <section className="app-header">
      {/* CartButton */}

      <header>
        Fast and free delivery to collection points throughout the country for
        purchases over 299 NIS
      </header>

      <main>
      <div className="logo">MISTER TOY</div>

      <nav>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/toy">Toys</NavLink>
        <NavLink to="/dashboard">Dashboard</NavLink>
        <NavLink to="/about">About</NavLink>
      </nav>

      {/* FilterTab */}
      </main>

    {/* <footer> special filter </footer> */}

    </section>
  )
}
