const { DEV, VITE_LOCAL } = import.meta.env

import { toyService as local } from './toy.service.local'
import { toyService as remote } from './toy.service.remote'

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

export function getEmptyToy() {
  return {
    name: '',
    price: '',
    labels: _getRandomLabels(),
    inStock: true
  }
}

function getDefaultFilter() {
  return {
    txt: '',
    inStock: null,
    labels: [],
    pageIdx: 0
  }
}

function _getRandomLabels() {
  const labelsCopy = [...labels]
  const randomLabels = []
  for (let i = 0; i < 2; i++) {
    const idx = Math.floor(Math.random() * labelsCopy.length)
    randomLabels.push(labelsCopy.splice(idx, 1)[0])
  }
  return randomLabels
}

// console.log('VITE_LOCAL:', VITE_LOCAL)

const service = VITE_LOCAL === 'true' ? local : remote
export const toyService = { getEmptyToy, getDefaultFilter, ...service }

//* Easy access to this service from the dev tools console
//* when using script - dev / dev:local

if (DEV) window.toyService = toyService
