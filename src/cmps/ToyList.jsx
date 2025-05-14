import { Link } from 'react-router-dom'
import { ToyPreview } from './ToyPreview'
import { useTranslation } from 'react-i18next'

export function ToyList({ onRemoveToy, toys }) {
  const { t } = useTranslation()

  // console.log('toys: ',toys)

  const elLis = toys.map((toy) => (
    <li key={toy._id}>
      <ToyPreview toy={toy} />
      <div>
        <button>
          <Link to={`/toy/edit/${toy._id}`}>{t('edit')}</Link>
        </button>
        <button onClick={() => onRemoveToy(toy._id)}>{t('remove')}</button>
      </div>
    </li>
  ))

  //   console.log('elLis:', elLis)
  return (
    <section className="toy-list container">
      <ul>{elLis}</ul>
    </section>
  )
}
