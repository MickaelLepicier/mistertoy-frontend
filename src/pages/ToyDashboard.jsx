import { useEffect, useState } from 'react'
import { MyChart } from '../cmps/MyChart'
import { Loader } from '../cmps/Loader'
import { toyService } from '../services/toy.service.remote'
import { useTranslation } from 'react-i18next'

export function ToyDashboard() {
  const {t} = useTranslation()

const [priceStats, setPriceStats] = useState()
const [inStockStats, setInStockStats] = useState()

useEffect(()=>{
    loadPriceStats()
    loadInStockStats()
},[])

function loadPriceStats(){
    toyService.getPricePerLabelStats().then(setPriceStats)
}

function loadInStockStats(){
    toyService.getInStockPerLabelStats().then(setInStockStats)
}

if(!priceStats || !inStockStats) return <Loader text={t('loading')}/>

return (
    <section>
      <MyChart priceStats={priceStats} inStockStats={inStockStats}/>
    </section>
  )
}
