import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { setFilter, setPageIdx, setSort } from '../store/toy/toyActions'
import { ToyFilter } from './ToyFilter'
import { toyService } from '../services/toy.service.remote'
import { useEffect, useState } from 'react'
import { ToySort } from './ToySort'

export function AppHeader() {
  const filterBy = useSelector((storeState) => storeState.toyModule.filterBy)
  const sortBy = useSelector((storeState) => storeState.toyModule.sortBy)

  const [toyLabels, setToyLabels] = useState()

  useEffect(() => {
    toyService
      .getToyLabels()
      .then(setToyLabels)
      .catch((err) => {
        console.log('err:', err)
        showErrorMsg('Cannot load toys labels')
      })
  }, [])

  function onSetFilter(filterBy) {
    setFilter(filterBy)
    setPageIdx(0)
  }

  function onSetSort(sortBy) {
    setSort(sortBy)
  }

  return (
    <section className="app-header">
      {/* CartButton */}

      <header>
        Fast and free delivery to collection points throughout the country for
        purchases over 99$
      </header>

      <main>
        <ToyFilter
          filterBy={filterBy}
          onSetFilter={onSetFilter}
          sortBy={sortBy}
          onSetSort={onSetSort}
          toyLabels={toyLabels}
        />

        <div className="logo">MISTER TOY</div>

        <nav>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/toy">Toys</NavLink>
          <NavLink to="/dashboard">Dashboard</NavLink>
          <NavLink to="/about">About</NavLink>
        </nav>
      </main>

      {/* <footer> special filter </footer> */}
    </section>
  )
}
