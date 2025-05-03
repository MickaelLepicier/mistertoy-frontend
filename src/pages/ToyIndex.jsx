import { useEffect, useState } from 'react'
// import { toyService } from '../services/toy.service.remote'
import { useSelector } from 'react-redux'
import { loadToys, removeToy } from '../store/toy/toyActions'
import { Loader } from '../cmps/Loader'
import { ToyList } from '../cmps/ToyList'
import { PopUp } from '../cmps/PopUp'
import { PaginationButtons } from '../cmps/PaginationButtons'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

export function ToyIndex() {
  const {t} = useTranslation()

  const toys = useSelector((storeState) => storeState.toyModule.toys)
  const filterBy = useSelector((storeState) => storeState.toyModule.filterBy)
  const sortBy = useSelector((storeState) => storeState.toyModule.sortBy)
  const isLoading = useSelector((storeState) => storeState.toyModule.isLoading)
  const pageIdx = useSelector((storeState) => storeState.toyModule.pageIdx)

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
          <Link to="/toy/edit">{t('add_toy')}</Link>
        </button>
      </div>

      {isLoading && <Loader text={t('loading')}/>}
      {!isLoading && <ToyList toys={toys} onRemoveToy={onRemoveToy} />}

      {<PaginationButtons pageIdx={pageIdx} />}

      <PopUp footer={<footer>An Image</footer>} isOpen={pageIdx === 2}>
        <img src="./img/HERO_IMG.jpg" />
        <button>{t('send')}</button>
      </PopUp>
    </section>
  )
}
