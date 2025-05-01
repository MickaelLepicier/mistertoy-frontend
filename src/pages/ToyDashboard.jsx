import { useEffect, useState } from 'react'
import { MyChart } from '../cmps/MyChart'
import { Loader } from '../cmps/Loader'
import { toyService } from '../services/toy.service.remote'

export function ToyDashboard() {
  // TODOs:
  // Chart for Prices per label
  // toy.price , toy.label

  // Chart for Inventory by label
  // toy.inStock toy.label

  // create data and add it to the <MyChart/>

  const pricePerLabelStats = ''
  const inStockPerLabelStats = ''

const [toys, setToys] = useState([])
const [priceStats, setPriceStats] = useState()
const [inStockStats, setInStockStats] = useState()



useEffect(()=>{
    loadToys()
    loadPriceStats()
    loadInStockStats()
},[])

function loadToys(){
    toyService.query().then(setToys)
}

function loadPriceStats(){
    toyService.getPricePerLabelStats().then(setPriceStats)
}

function loadInStockStats(){
    toyService.getInStockPerLabelStats().then(setInStockStats)
}

if(!priceStats) return <Loader/>

return (
    <section>
      <MyChart priceStats={priceStats} inStockStats={inStockStats}/>
    </section>
  )
}
