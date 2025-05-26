import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { setFilter, setPageIdx, setSort } from '../store/toy/toy.actions'
import { ToyFilter } from './ToyFilter'
import { toyService } from '../services/toy'
import { useEffect, useState } from 'react'
import { ToySort } from './ToySort'
import { useTranslation } from 'react-i18next'
import { LoginSignup } from './LoginSignup'
import { logout } from '../store/user/user.actions'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'

export function AppHeader() {
  const user = useSelector((storeState) => storeState.userModule.loggedInUser)
  const filterBy = useSelector((storeState) => storeState.toyModule.filterBy)
  const sortBy = useSelector((storeState) => storeState.toyModule.sortBy)
  const [toyLabels, setToyLabels] = useState()

  const { t, i18n } = useTranslation()
  
  const lngs = {
    en: { nativeName: 'EN' },
    fr: { nativeName: 'FR' }
  }

  useEffect(() => {
    loadToyLabels()
  }, [])

  async function loadToyLabels() {

    try {
      const labels = await toyService.getToyLabels()
      setToyLabels(labels)
    } catch (err) {
      console.log('err:', err)
      showErrorMsg('Cannot load toys labels')
    }
  }

  function onSetFilter(filterBy) {
    setFilter(filterBy)
    setPageIdx(0)
  }

  function onSetSort(sortBy) {
    setSort(sortBy)
  }

  async function onLogout() {
    try {
      await logout()
      showSuccessMsg('Bye Bye')
    } catch (error) {
      showErrorMsg('OOPs try again')
    }
  }

  return (
    <section className="app-header">
      <header>{t('msg_top_header')}</header>
      {/* CartButton */}

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
          <NavLink to="/">{t('home')}</NavLink>
          <NavLink to="/toy">{t('toys')} </NavLink>
          <NavLink to="/dashboard">{t('dashboard')} </NavLink>
          <NavLink to="/review">{t('reviews')}</NavLink>
          <NavLink to={`/user/${user._id}`}>{t('profile')}</NavLink>
          <NavLink to="/about">{t('about')} </NavLink>
        </nav>
      </main>

      <footer>
        {user ? (
          <section>
            <span to={`/user/${user._id}`}>
              {t('hello')} {user.fullname}
            </span>
            <button className="btn btn-logout" onClick={onLogout}>
              {t('logout')}
            </button>
          </section>
        ) : (
          <LoginSignup />
        )}
        <div>
          {Object.keys(lngs).map((lng) => (
            <button
              className="btn-lng"
              // type="submit"
              key={lng}
              onClick={() => i18n.changeLanguage(lng)}
              disabled={i18n.resolvedLanguage === lng}
            >
              {lngs[lng].nativeName}
            </button>
          ))}
        </div>
      </footer>

      {/* <footer> special filter </footer> */}
    </section>
  )
}
