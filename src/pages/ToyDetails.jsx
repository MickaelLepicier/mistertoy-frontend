import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { toyService } from '../services/toy.service.remote'
import { Loader } from '../cmps/Loader'
import { PopUp } from '../cmps/PopUp'
import { Chat } from '../cmps/Chat'
import { useTranslation } from 'react-i18next'

export function ToyDetails() {
  const {t} = useTranslation()

  const [toy, setToy] = useState(null)
  const [isChatOpen, setIsChatOpen] = useState(false)
  const { toyId } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    loadToy()
  }, [toyId])

  function loadToy() {
    toyService
      .getById(toyId)
      .then((toy) => setToy(toy))
      .catch((err) => {
        console.log('Had issues in toy details', err)
        showErrorMsg('Cannot load toy')
        navigate('/toy')
      })
  }

  if (!toy) return <Loader text={t('loading')} />
  const formattedDate = new Date(toy.createdAt).toLocaleString('he')

  return (
    <section className="toy-details" style={{ textAlign: 'center' }}>

      <h1>
        {t('toy_name')}: <span>{toy.name}</span>
      </h1>
      <h1>
      {t('toy_price')}: <span>${toy.price}</span>
      </h1>
      <h1>
      {t('labels')}: <span>{toy.labels.join(' ,')}</span>
      </h1>
      <h1>
      {t('created_at')}: <span>{formattedDate}</span>
      </h1>
      <h1 className={toy.inStock ? 'green' : 'red'}>
        {toy.inStock ? t('in_stock') : t('not_in_stock')}
      </h1>
      <button className="back-btn">
        <Link to="/toy">{t('back')}</Link>
      </button>
      <section>
        <PopUp
          header={<h3>{t('chat_about')} {toy.name}s</h3>}
          footer={<h4>&copy; 2025-9999 {t('toys')} INC.</h4>}
          onClose={() => setIsChatOpen(false)}
          isOpen={isChatOpen}
        >
          <Chat />
        </PopUp>
      </section>

      {!isChatOpen && (
        <button onClick={() => setIsChatOpen(true)} className="open-chat">
          {t('chat')}
        </button>
      )}
    </section>
  )
}
