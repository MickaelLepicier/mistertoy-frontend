import { httpService } from './http.service'
import { utilService } from './util.service'

const BASE_URL = 'toy/'

export const toyService = {
  query,
  getById,
  save,
  remove,
  getEmptyToy,
  getDefaultFilter,
  getRandomToy
}

function query(filterBy = {}) {
  return httpService.get(BASE_URL, filterBy)
}

function getById(carId) {
  return httpService.get(BASE_URL + carId)
}

function remove(carId) {
  return httpService.delete(BASE_URL + carId)
}

function save(car) {
  if (car._id) {
    return httpService.put(BASE_URL + car._id, car)
  } else {
    return httpService.post(BASE_URL, car)
  }
}

function getEmptyToy() {
  return {
    name: '',
    imgUrl: '',
    price: '',
    labels: [],
    createdAt: '',
    inStock: ''
  }
}

function getRandomToy() {
  const labels = [
    'On wheels',
    'Box game',
    'Art',
    'Baby',
    'Doll',
    'Puzzle',
    'Outdoor',
    'Battery Powered'
  ]

  // TODO get random data

  return {
    name: '',
    imgUrl: '',
    price: utilService.getRandomIntInclusive(1000, 9000),
    labels: [],
    createdAt: Date.now(),
    inStock: ''
  }
}

function getDefaultFilter() {
  return { txt: '', maxPrice: '', minSpeed: '' }
}
