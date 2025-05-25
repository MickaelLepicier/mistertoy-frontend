import { useEffect, useState } from 'react'
import { MyChart } from '../cmps/MyChart'
import { Loader } from '../cmps/Loader'
import { toyService } from '../services/toy'
import { useTranslation } from 'react-i18next'

export function ToyDashboard() {
  const {t} = useTranslation()

const [priceStats, setPriceStats] = useState()
const [inStockStats, setInStockStats] = useState()

useEffect(()=>{
    loadPriceStats()
    loadInStockStats()
},[])

async function loadPriceStats(){
  try {
    const stats = await toyService.getPricePerLabelStats()
    setPriceStats(stats)
  } catch (err) {
    console.error('Cannot load price stats', err)
  }
}

async function loadInStockStats(){
  try {
    const stats = await toyService.getInStockPerLabelStats()
    setInStockStats(stats)
  } catch (err) {
    console.error('Cannot load in-stock stats', err)
  }
}

if(!priceStats || !inStockStats) return <Loader text={t('loading')}/>

return (
    <section>
      <MyChart priceStats={priceStats} inStockStats={inStockStats}/>
    </section>
  )
}
