import { useEffect, useState } from 'react'
import { toyService } from '../services/toy.service'
import { useSelector } from 'react-redux'
import { loadToys, removeToy } from '../store/toy/toyActions'
import { Loader } from '../cmps/Loader'
import { ToyList } from '../cmps/ToyList'

export function ToyIndex() {
  const toys = useSelector((storeState) => storeState.toyModule.toys)
  const filterBy = useSelector(storeState => storeState.toyModule.filterBy)
  const sortBy = useSelector(storeState => storeState.toyModule.sortBy)
  const isLoading = useSelector((storeState) => storeState.toyModule.isLoading)

  const [pageIdx, setPageIdx] = useState(0)

  useEffect(() => {
    loadToys(pageIdx)
  }, [])

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
      {isLoading && <Loader />}
      {!isLoading && <ToyList toys={toys} onRemoveToy={onRemoveToy} />}
    </section>
  )
}
