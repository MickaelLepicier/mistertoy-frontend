import { useState } from 'react'

import { addReview } from '../store/review/review.actions'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { useTranslation } from 'react-i18next'
import { Loader } from './Loader'

export function ReviewEdit({ toys }) {
  const [reviewToEdit, setReviewToEdit] = useState({
    txt: '',
    aboutToyId: ''
  })

  const { t } = useTranslation()

  function handleChange(ev) {
    const { name, value } = ev.target
    setReviewToEdit({ ...reviewToEdit, [name]: value })
  }

  async function onAddReview(ev) {
    ev.preventDefault()

    if (!reviewToEdit.txt || !reviewToEdit.aboutToyId)
      return alert('All fields are required')

    try {
      await addReview(reviewToEdit)
      showSuccessMsg('Review added')
      setReviewToEdit({ txt: '', aboutToyId: '' })
    } catch (err) {
      showErrorMsg('Cannot add review')
    }
  }
  if (!toys) return <Loader />
  return (
    <form className="review-edit" onSubmit={onAddReview}>
      <select
        onChange={handleChange}
        value={reviewToEdit.aboutToyId}
        name="aboutToyId"
      >
        <option value="">{t('review_about')}</option>
        {toys.map((toy) => (
          <option key={toy._id} value={toy._id}>
            {toy.name}
          </option>
        ))}
      </select>
      <textarea
        name="txt"
        onChange={handleChange}
        value={reviewToEdit.txt}
        placeholder=" That's a nice toy..."
      ></textarea>
      <button className="btn">{t('add')}</button>
    </form>
  )
}
