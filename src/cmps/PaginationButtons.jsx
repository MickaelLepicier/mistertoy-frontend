import { useTranslation } from 'react-i18next'
import { setPageIdx } from '../store/toy/toy.actions'

export function PaginationButtons({ pageIdx }) {
  const { t } = useTranslation()

  return (
    <div className="pagination">
      <button onClick={() => setPageIdx(pageIdx - 1)} disabled={pageIdx === 0}>
        {t('previous')}
      </button>
      {pageIdx + 1}
      <button onClick={() => setPageIdx(pageIdx + 1)}>{t('next')}</button>
    </div>
  )
}
