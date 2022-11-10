import { axiosInstance } from 'boot/axios'
import { defineStore } from 'pinia'

const state = {
  functions: [
    { id: 1, name: 'SEL' },
    { id: 2, name: 'CallOff' },
    { id: 3, name: 'Hardware Engineers' },
    { id: 4, name: 'Controls Engineers' },
  ],
}

const actions = {
  getCapacitiesDashboard(payload) {
    return new Promise((resolve, reject) => {
      axiosInstance
        .get('/pivot-data-dashboard.json', { params: payload })
        .then((response) => {
          resolve(response.data.data)
        })
        .catch((er) => {
          console.error(er)
          reject(er)
        })
    })
  }
}

const getters = {}

export const useCapacityStore = defineStore('Capacity', {
  state: () => {
    return state
  },
  actions,
  getters,
})
