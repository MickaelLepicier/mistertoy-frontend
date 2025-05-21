import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

export function ReviewPreview({ review }) {
  const { byUser, aboutToy } = review
  const { t, i18n } = useTranslation()

  return (
    <article className="review-preview">
      <p>
        {t('about')}:{' '}
        <Link className="about" to={`/toy/${aboutToy._id}`}>
          {aboutToy.name}
        </Link>
      </p>
      <p className="review-by">{t('by')}: {byUser.fullname}</p>
      <pre className="review-txt">{review.txt}</pre>
      {review.createdAt && (
        <section className="created-at">
          <h4>{t('created_at')}:</h4>
          {new Date(review.createdAt).toLocaleString(i18n.language)}
        </section>
      )}
    </article>
  )
}
