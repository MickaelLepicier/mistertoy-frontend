import { httpService } from './http.service'

const BASE_URL = 'toy/'
export const labels = [
  'On wheels',
  'Box game',
  'Art',
  'Baby',
  'Doll',
  'Puzzle',
  'Outdoor',
  'Battery Powered'
]

export const toyService = {
  query,
  getById,
  save,
  remove,
  getEmptyToy,
  getDefaultFilter,
  getDefaultSort,
  getToyLabels,
  getToyLabelCounts,
  getPricePerLabelStats,
  getInStockPerLabelStats,
  addMsg,
  removeMsg
}

function query(filterBy = {}, sortBy, pageIdx) {
  return httpService.get(BASE_URL, { filterBy, sortBy, pageIdx })
  // return axios.get(BASE_URL, {params: { filterBy, sortBy, pageIdx }})
}

function getById(toyId) {
  return httpService.get(BASE_URL + toyId)
}

function remove(toyId) {
  return httpService.delete(BASE_URL + toyId)
}

function save(toy) {
  const method = toy._id ? 'put' : 'post'
  return httpService[method](BASE_URL, toy)
}

function getDefaultFilter() {
  return {
    txt: '',
    inStock: null,
    labels: []
    // pageIdx: 0,
  }
}

function getDefaultSort() {
  return { type: '', desc: 1 }
}

function getEmptyToy() {
  return {
    name: '',
    price: '',
    labels: _getRandomLabels(),
    inStock: true
  }
}

function getToyLabels() {
  return httpService.get(BASE_URL + 'labels')
}

function getToyLabelCounts() {
  return httpService.get(BASE_URL + 'labels/count')
}

async function getPricePerLabelStats() {
  const toys = await query()

  const stats = _getStatsPerLabel(
    toys,
    (toy) => ({ sum: toy.price, count: 1 }),
    (sum, count) => Number((sum / count).toFixed(1))
  )
  // console.log('avgPricesPerLabel: ', stats)
  return stats
}

async function getInStockPerLabelStats() {
  const toys = await query()

  const stats = _getStatsPerLabel(
    toys,
    (toy) => ({ sum: toy.inStock ? 1 : 0, count: 1 }),
    (sum, count) => Number(((sum / count) * 100).toFixed(1))
  )
  // console.log('inStockPerLabel: ', stats)
  return stats
}

async function addMsg(toyId, msg) {
  return httpService.post(BASE_URL + `${toyId}/msg`, msg)
}

async function removeMsg(toyId, msgId) {
  return httpService.delete(BASE_URL + `${toyId}/msg/${msgId}`)
}

function _getStatsPerLabel(toys, valueExtractor, resultFormatter) {
  const labelStats = {}

  toys.forEach((toy) => {
    toy.labels.forEach((label) => {
      if (!labelStats[label]) labelStats[label] = { sum: 0, count: 0 }
      const { sum, count } = valueExtractor(toy)
      labelStats[label].sum += sum
      labelStats[label].count += count
    })
  })

  const formattedStats = {}
  for (const label in labelStats) {
    const { sum, count } = labelStats[label]
    formattedStats[label] = resultFormatter(sum, count)
  }

  return formattedStats
}

function _getRandomLabels() {
  const labelsCopy = [...labels]
  const randomLabels = []
  for (let i = 0; i < 2; i++) {
    const randomIdx = Math.floor(Math.random() * labelsCopy.length)
    randomLabels.push(labelsCopy.splice(randomIdx, 1)[0])
  }
  return randomLabels
}
