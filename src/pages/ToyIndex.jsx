import { useEffect, useState } from 'react'
// import { toyService } from '../services/toy.service.remote'
import { useSelector } from 'react-redux'
import { loadToys, removeToy } from '../store/toy/toyActions'
import { Loader } from '../cmps/Loader'
import { ToyList } from '../cmps/ToyList'
import { PopUp } from '../cmps/PopUp'
import { PaginationButtons } from '../cmps/PaginationButtons'
import { Link } from 'react-router-dom'

export function ToyIndex() {
  const toys = useSelector((storeState) => storeState.toyModule.toys)
  const filterBy = useSelector((storeState) => storeState.toyModule.filterBy)
  const sortBy = useSelector((storeState) => storeState.toyModule.sortBy)
  const isLoading = useSelector((storeState) => storeState.toyModule.isLoading)
  const pageIdx = useSelector((storeState) => storeState.toyModule.pageIdx)

  //   const [pageIdx, setPageIdx] = useState(0)
  const [toyLabels, setToyLabels] = useState()

  useEffect(() => {
    loadToys(pageIdx).catch((err) => {
      console.log('err:', err)
      showErrorMsg('Cannot load toys')
    })
  }, [filterBy, sortBy, pageIdx])

  function onRemoveToy(toyId) {
    removeToy(toyId)
      .then(() => showSuccessMsg('Toy removed'))
      .catch((err) => {
        console.log('Cannot remove toy', err)
        showErrorMsg('Cannot remove toy')
      })
  }

  //   console.log('toys: ',toys)
  return (
    <section className="toy-index">
      <div style={{ marginBlockStart: '0.5em', textAlign: 'center' }}>
        <button style={{ marginInline: 0 }}>
          <Link to="/toy/edit">Add Toy</Link>
        </button>
      </div>

      {isLoading && <Loader />}
      {!isLoading && <ToyList toys={toys} onRemoveToy={onRemoveToy} />}

      {<PaginationButtons pageIdx={pageIdx} />}

      <PopUp footer={<footer>An Image</footer>} isOpen={pageIdx === 2}>
        <img src="./img/HERO_IMG.jpg" />
        <button>Send</button>
      </PopUp>
    </section>
  )
}
