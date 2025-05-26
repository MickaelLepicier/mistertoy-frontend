import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

import { ReviewList } from '../cmps/ReviewList'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { loadReviews, removeReview } from '../store/review/review.actions'
import { useTranslation } from 'react-i18next'
import {
  socketService,
  SOCKET_EVENT_USER_UPDATED,
  SOCKET_EMIT_USER_WATCH
} from '../services/socket.service'
import { loadUser } from '../store/user/user.actions'
import { Loader } from '../cmps/Loader'

export function UserDetails() {
  const params = useParams()

  const user = useSelector((storeState) => storeState.userModule.loggedInUser)
  const reviews = useSelector((storeState) => storeState.reviewModule.reviews)
  const navigate = useNavigate()

  const { t } = useTranslation()


  useEffect(() => {
    if (!user) {
      navigate('/')
      showErrorMsg('Please login first')
      return
    }
    loadReviews({ byUserId: user._id })
    loadUser(params.userId)

    socketService.emit(SOCKET_EMIT_USER_WATCH, params.id)
    socketService.on(SOCKET_EVENT_USER_UPDATED, onUserUpdate)

    return () => {
      socketService.off(SOCKET_EVENT_USER_UPDATED, onUserUpdate)
    }
  }, [user, params.userId])

  function onUserUpdate(user) {
    showSuccessMsg(
      `This user ${user.fullname} just got updated from socket, new score: ${user.score}`
    )
    store.dispatch({ type: 'SET_WATCHED_USER', user })
  }

  async function onRemoveReview(reviewId) {
    try {
      await removeReview(reviewId)
      showSuccessMsg('Review removed')
    } catch (err) {
      showErrorMsg('Cannot remove')
    }
  }

  if (!user) return <Loader />

  return (
    <section className="user-details container">
      <h3>
        {t('hello')} {user.fullname}
        <img src={user.imgUrl} style={{ width: '100px' }} />
      </h3>
      <ReviewList reviews={reviews} onRemoveReview={onRemoveReview} />
      {!reviews.length && <span>{t('any_reviews')}</span>}
    </section>
  )
}
