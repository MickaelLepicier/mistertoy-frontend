import { setPageIdx } from '../store/toy/toyActions'

export function PaginationButtons({ pageIdx }) {


  return (
    <div className="pagination">
      <button onClick={() => setPageIdx(pageIdx - 1)} disabled={pageIdx === 0}>
        Previous
      </button>
      {pageIdx + 1}
      <button onClick={() => setPageIdx(pageIdx + 1)}>Next</button>
    </div>
  )
}
