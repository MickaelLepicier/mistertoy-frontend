import { useState } from 'react'
import { getEmptyCredentials } from '../services/user'
import { useTranslation } from 'react-i18next'

export function LoginForm({ onLogin, isSignup }) {
  const [credentials, setCredentials] = useState(
    getEmptyCredentials()
  )
  const { t, i18n } = useTranslation()

  function handleChange({ target }) {
    const { name: field, value } = target
    setCredentials((prevState) => {
      return { ...prevState, [field]: value }
    })
  }

  function handleSubmit(ev) {
    ev.preventDefault()
    onLogin(credentials)
  }

  const { fullname, username, password } = credentials

  return (
    <form className="form" onSubmit={handleSubmit}>
      <input
        type="text"
        name="username"
        value={username}
        placeholder={t('username')}
        onChange={handleChange}
        required
        autoFocus
      />
      <input
        type="password"
        name="password"
        value={password}
        placeholder={t('password')}
        onChange={handleChange}
        required
      />
      {isSignup && (
        <input
          type="text"
          name="fullname"
          value={fullname}
          placeholder="Full name"
          onChange={handleChange}
          required
        />
      )}
      <button className="btn">{isSignup ? t('logout') : t('login')}</button>
    </form>
  )
}
