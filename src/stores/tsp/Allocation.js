import { axiosInstance } from 'boot/axios'
import { defineStore } from 'pinia'

const state = {}

const actions = {
  getAllocations(payload) {
    return new Promise((resolve, reject) => {
      axiosInstance
        .get('/pivot-data-allocations.json', { params: payload })
        .then((response) => {
          resolve(response.data.data)
        })
        .catch((er) => {
          console.error(er)
          reject(er)
        })
    })
  },
}

const getters = {}

export const useAllocationStore = defineStore('Allocation', {
  state: () => {
    return state
  },
  actions,
  getters,
})
