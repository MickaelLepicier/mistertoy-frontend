import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { toyService } from '../services/toy'
import { Loader } from '../cmps/Loader'
import { PopUp } from '../cmps/PopUp'
import { Chat } from '../cmps/Chat'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'

// FIX BUG - when add a msg in Chat it is not saving in toy_db

export function ToyDetails() {
  const user = useSelector((storeState) => storeState.userModule.loggedInUser)

  const [toy, setToy] = useState(null)
  const [isChatOpen, setIsChatOpen] = useState(false)
  const { toyId } = useParams()
  const navigate = useNavigate()

  const { t } = useTranslation()

  useEffect(() => {
    loadToy()
  }, [toyId])

  async function loadToy() {
    try {
      const toy = await toyService.getById(toyId)
      setToy(toy)
    } catch (err) {
      console.log('Had issues in toy details', err)
      showErrorMsg('Cannot load toy')
      navigate('/toy')
    }
  }

  async function onSaveMsg(msg) {
    try {
      const savedMsg = await toyService.addMsg(toy._id, msg)
      setToy((prevToy) => ({
        ...prevToy,
        msgs: [...(prevToy.msgs || []), savedMsg]
      }))
      showSuccessMsg('Message saved!')
    } catch (error) {
      showErrorMsg('Cannot save message')
    }
  }

  if (!toy) return <Loader text={t('loading')} />
  const formattedDate = new Date(toy.createdAt).toLocaleString('he')

  const msgs = toy.msgs.map((m) => m.txt).join(', ')

  return (
    <section className="toy-details container" style={{ textAlign: 'center' }}>
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
      <h1>
        {t('comments')}: <span>{msgs}</span>
      </h1>
      <h1 className={toy.inStock ? 'green' : 'red'}>
        {toy.inStock ? t('in_stock') : t('not_in_stock')}
      </h1>

      <button className="back-btn">
        <Link to="/toy">{t('back')}</Link>
      </button>
      {user && isChatOpen && (
        <PopUp
          header={
            <h3>
              {t('chat_about')} {toy.name}s
            </h3>
          }
          footer={<h4>&copy; 2025-9999 {t('toys')} INC.</h4>}
          onClose={() => setIsChatOpen(false)}
          isOpen={isChatOpen}
        >
          <Chat
            msgs={toy.msgs || []}
            user={user}
            onSend={onSaveMsg}
            toyId={toy._id}
          />
        </PopUp>
      )}

      {!isChatOpen && (
        <button onClick={() => setIsChatOpen(true)} className="open-chat">
          {t('chat')}
        </button>
      )}
    </section>
  )
}
