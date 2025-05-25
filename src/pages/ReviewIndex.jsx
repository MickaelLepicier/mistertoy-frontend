import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import { getActionAddReview, getActionRemoveReview, loadReviews, removeReview } from '../store/review/review.actions'
import { socketService, SOCKET_EVENT_REVIEW_ADDED, SOCKET_EVENT_REVIEW_REMOVED } from '../services/socket.service'

import { ReviewEdit } from '../cmps/ReviewEdit'
import { ReviewList } from '../cmps/ReviewList'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { toyService } from '../services/toy'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'

export function ReviewIndex() {
  const user = useSelector((storeState) => storeState.userModule.loggedInUser)
  const reviews = useSelector((storeState) => storeState.reviewModule.reviews)

  const [toys, setToys] = useState([])
  const { t } = useTranslation()

  const dispatch = useDispatch()

  useEffect(() => {
    loadReviews()
    loadToys()

    socketService.on(SOCKET_EVENT_REVIEW_ADDED, (review) => {
      console.log('GOT from socket', review)
      dispatch(getActionAddReview(review))
    })

    socketService.on(SOCKET_EVENT_REVIEW_REMOVED, (reviewId) => {
      console.log('GOT from socket', reviewId)
      dispatch(getActionRemoveReview(reviewId))
    })

    return () => {
      socketService.off(SOCKET_EVENT_REVIEW_ADDED)
      socketService.off(SOCKET_EVENT_REVIEW_REMOVED)
    }
  }, [])

  async function loadToys() {
    try {
      const toys = await toyService.query()
      setToys(toys)
    } catch (error) {
      console.log('error:', error)
    }
  }

  async function onRemoveReview(reviewId) {
    try {
      await removeReview(reviewId)
      showSuccessMsg('Review removed')
    } catch (err) {
      showErrorMsg('Cannot remove')
    }
  }

  return (
    <div className="review-index">
      <h2>{t('reviews_gossip')}</h2>
      {!user && <p>{t('login_first')}</p>}
      {user && <ReviewEdit toys={toys} />}
      {!!reviews.length && (
        <ReviewList reviews={reviews} onRemoveReview={onRemoveReview} />
      )}
    </div>
  )
}
