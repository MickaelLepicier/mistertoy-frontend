import { useTranslation } from 'react-i18next'
import { GoogleMaps } from '../cmps/GoogleMap'

export function AboutUs() {
  const { t } = useTranslation()

  return (
    <section className="about-page">
      <h1>{t('About Us')}</h1>
      <h1>{t('welcome_to')} Mister-Toy</h1>
      <p>{t('msg_p_1')}</p>
      <p>{t('msg_p_2')}</p>
      <ul>
        <li>{t('msg_p_3')}</li>
        <li>{t('msg_p_4')}</li>
        <li>{t('msg_p_5')}</li>
      </ul>
      <p>{t('msg_p_6')}</p>
      <p>{t('msg_p_7')}</p>
      <p>{t('msg_p_8')}</p>
      <p>{t('msg_p_9')}</p>
      <h3>{t('msg_p_10')}</h3>
      <p>{t('msg_p_11')}</p>
      <p>{t('msg_p_12')}</p>

      <GoogleMaps />
    </section>
  )
}
