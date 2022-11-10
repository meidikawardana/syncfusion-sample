import { LocalStorage } from 'quasar'
import { axiosInstance } from 'boot/axios'
import { defineStore } from 'pinia'
import { useAuthStore } from 'src/stores/config/Auth'

const state = {
  grid: {
    columns: [],
    filterSettings: {},
    groupSettings: {},
    pageSettings: {},
    searchSettings: {},
    selectedRowIndex: null,
    sortSettings: {},
  },
  columns: [],
  previousColumnsStatus: [],
}

const actions = {
  loadGrid(gridId, columns) {
    const grid = LocalStorage.getItem('grid' + gridId)
    this.SET_GRID(grid)
    this.columns(columns)
    this.previousColumnsStatus(columns)
  },
  getVisibleColumns: (gridId) => {
    const columns = LocalStorage.getItem('grid' + gridId).columns
    let index = 0
    const gridColumns = state.columns
    columns.foreach((element) => {
      gridColumns[index].visible = element.visible
      index++
    })
    this.columns(gridColumns)
    this.previousColumnsStatus(gridColumns)
    return gridColumns
  },
  getLayouts(gridId) {
    return new Promise((resolve, reject) => {
      const store = useAuthStore()
      const payload = {
        grid_id: gridId,
        user_id: store.user.id,
      }
      axiosInstance
        .get('/api/v1/layouts', { params: payload })
        .then((response) => {
          // response.data.data.settings = JSON.parse(response.data.settings)
          resolve(response.data.data)
        })
        .catch((er) => {
          console.error(er)
          reject(er)
        })
    })
  },
  storeLayout(payload) {
    return new Promise((resolve, reject) => {
      axiosInstance
        .post('/api/v1/layouts', payload)
        .then((response) => {
          resolve(response.data.data)
        })
        .catch((er) => {
          console.error(er)
          reject(er)
        })
    })
  },
  updateLayout(payload) {
    return new Promise((resolve, reject) => {
      axiosInstance
        .patch('/api/v1/layouts/' + payload.id, payload)
        .then((response) => {
          resolve(response.data.data)
        })
        .catch((er) => {
          console.error(er)
          reject(er)
        })
    })
  },
  selectLayout(payload) {
    return new Promise((resolve, reject) => {
      axiosInstance
        .patch('/api/v1/layouts/select', payload)
        .then((response) => {
          resolve(response.data.data)
        })
        .catch((er) => {
          console.error(er)
          reject(er)
        })
    })
  },
  deleteLayout(id) {
    return new Promise((resolve, reject) => {
      axiosInstance
        .delete('/api/v1/layouts/' + id)
        .then((response) => {
          resolve(response.data.data)
        })
        .catch((er) => {
          console.error(er)
          reject(er)
        })
    })
  },
  SET_GRID(payload) {
    this.grid = payload
  },
  columns(payload) {
    this.columns = payload
  },
  previousColumnsStatus(payload) {
    this.previousColumnsStatus = payload
  },
}

const getters = {
  // getGrid: (gridId) => {
  //   return LocalStorage.getItem('grid' + gridId)
  // },
}

export const useGridStore = defineStore('Grid', {
  state: () => {
    return state
  },
  actions,
  getters,
  persist: true,
})
