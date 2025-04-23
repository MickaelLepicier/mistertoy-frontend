import { NavLink } from 'react-router-dom'

export function AppHeader() {
  return (
    <section className="app-header container">
      <div className="logo">Mister Toy</div>

      <nav>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/toy">Toys</NavLink>
        <NavLink to="/dashboard">Dashboard</NavLink>
        <NavLink to="/about">About</NavLink>
      </nav>
    </section>
  )
}
