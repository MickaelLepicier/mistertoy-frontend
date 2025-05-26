import { httpService } from '../http.service'

const BASE_URL = 'toy/'

export const toyService = {
  query,
  getById,
  save,
  remove,
  getDefaultSort,
  getToyLabels,
  getToyLabelCounts,
  getPricePerLabelStats,
  getInStockPerLabelStats,
  addMsg,
  removeMsg
}

function query(filterBy = {}, sortBy = {}, pageIdx = 0) {
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
  const id = toy._id ? toy._id : ''
  return httpService[method](BASE_URL + id, toy)
}

function getDefaultSort() {
  return { type: '', desc: 1 }
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
