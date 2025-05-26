import { useTranslation } from 'react-i18next'
import heroImg from '../assets/img/HERO_IMG.jpg'

export function HomePage() {
  const {t} = useTranslation()
  return (
    <section className="home-page container">
      <h2>{t('welcome_to')} Mister-Toy!</h2>
      <img
        // src="https://images.unsplash.com/photo-1545558014-8692077e9b5c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
        // src="./img/HERO_IMG.jpg"
        src={heroImg}
        alt="Hero Img"
      />
    </section>
  )
}
