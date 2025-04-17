import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'

const STORAGE_KEY = 'toyDB'

_createToys()

export const toyService = {
  query,
  getById,
  save,
  remove,
  getEmptyToy,
  getRandomToy,
  getDefaultFilter
}

function query(filterBy = {}) {
  return storageService.query(STORAGE_KEY).then((toys) => {
    if (!filterBy.txt) filterBy.txt = ''
    if (!filterBy.maxPrice) filterBy.maxPrice = Infinity
    const regExp = new RegExp(filterBy.txt, 'i')
    return toys.filter((toy) => {
      console.log(toy.vendor, regExp.test(toy.vendor))
      console.log(toy.price, toy.price <= filterBy.maxPrice)
      return regExp.test(toy.vendor) && toy.price <= filterBy.maxPrice
    })
  })
}

function getById(toyId) {
  return storageService.get(STORAGE_KEY, toyId)
}

function remove(toyId) {
  return storageService.remove(STORAGE_KEY, toyId)
}

function save(toy) {
  if (toy._id) {
    return storageService.put(STORAGE_KEY, toy)
  } else {
    // when switching to backend - remove the next line
    toy.owner = userService.getLoggedinUser()
    return storageService.post(STORAGE_KEY, toy)
  }
}

function getEmptyToy() {
  return {
    vendor: '',
    price: '',
    speed: ''
  }
}

function getRandomToy() {
  return {
    name: '',
    imgUrl: '',
    price: utilService.getRandomIntInclusive(1000, 9000),
    labels: [],
    createdAt: Date.now(),
    inStock: ''
  }

  // return {
  //     vendor: 'Susita-' + (Date.now() % 1000),
  //     price: utilService.getRandomIntInclusive(1000, 9000),
  //     speed: utilService.getRandomIntInclusive(50, 150),
  // }
}

function getDefaultFilter() {
  return { txt: '', maxPrice: '' }
}

function _createToys() {
  var toys = utilService.loadFromStorage(STORAGE_KEY)
  if (toys && toys.length > 0) return

  toys = [
    {
      _id: 't101',
      name: 'Talking Doll',
      imgUrl: '../assets/img/1.png',
      price: 123,
      labels: ['Doll', 'Battery Powered', 'Baby'],
      createdAt: 1631031801011,
      inStock: true
    },
    {
      _id: 't102',
      name: 'Robo Dino',
      imgUrl: 'hardcoded-url-for-now',
      price: 299,
      labels: ['On wheels', 'Art'],
      createdAt: 1641031802011,
      inStock: false
    },
    {
      _id: 't103',
      name: 'Lego City',
      imgUrl: 'hardcoded-url-for-now',
      price: 189,
      labels: ['Box game', 'Puzzle'],
      createdAt: 1618031801111,
      inStock: true
    },
    {
      _id: 't104',
      name: 'Magic Cube',
      imgUrl: 'hardcoded-url-for-now',
      price: 49,
      labels: ['Puzzle', 'Battery Powered'],
      createdAt: 1601031801456,
      inStock: true
    },
    {
      _id: 't105',
      name: 'Plush Bunny',
      imgUrl: 'hardcoded-url-for-now',
      price: 35,
      labels: ['Puzzle', 'Outdoor', 'Baby'],
      createdAt: 1652031801011,
      inStock: false
    },
    {
      _id: 't106',
      name: 'Race Car',
      imgUrl: 'hardcoded-url-for-now',
      price: 89,
      labels: ['On wheels'],
      createdAt: 1677031801311,
      inStock: true
    },
    {
      _id: 't107',
      name: 'Action Figure X',
      imgUrl: 'hardcoded-url-for-now',
      price: 129,
      labels: ['Art', 'Battery Powered'],
      createdAt: 1682031801542,
      inStock: true
    },
    {
      _id: 't108',
      name: 'Doodle Tablet',
      imgUrl: 'hardcoded-url-for-now',
      price: 79,
      labels: ['Battery Powered', 'Baby'],
      createdAt: 1626031801011,
      inStock: false
    },

    {
      _id: 't109',
      name: 'Musical Mat',
      imgUrl: 'hardcoded-url-for-now',
      price: 99,
      labels: ['Baby', 'Outdoor', 'Battery Powered'],
      createdAt: 1693031801011,
      inStock: true
    },
    {
      _id: 't110',
      name: 'Puzzle Train',
      imgUrl: 'hardcoded-url-for-now',
      price: 59,
      labels: ['Puzzle', 'Art'],
      createdAt: 1571031801011,
      inStock: true
    }
  ]

  // toys = []
  // for(var i = 0; i < 12; i++){
  //     const toy = getRandomToy()
  //     toy._id = utilService.makeId()
  //     toys.push(toy)
  // }
  utilService.saveToStorage(STORAGE_KEY, toys)
}
