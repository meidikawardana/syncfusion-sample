import { Api } from '@konnec/vue-eloquent'
import { http } from 'boot/axios'

export default class EddpApi extends Api {
  resource = 'eddp'

  dates = ['start_date', 'finish_date']

  constructor() {
    super()
  }

  static showMaterial(pn: string) {
    return new Promise((resolve, reject) => {
      http.get('/api/v1/eddp/materials/' + pn)
        .then((response) => {
          resolve(response.data)
        })
        .catch((err) => {
          console.error(err)
          reject(err)
        })
    })
  }
  static storeMaterials(payload: any) {
    return new Promise((resolve, reject) => {
      http.post('/api/v1/eddp/materials', payload)
        .then((response) => {
          resolve(response.data)
        })
        .catch((err) => {
          console.error(err)
          reject(err)
        })
    })
  }

  static storeMaterialMasters(payload: any) {
    return new Promise((resolve, reject) => {
      http.post('/api/v1/eddp/materials/masters', payload)
        .then((response) => {
          resolve(response.data)
        })
        .catch((err) => {
          console.error(err)
          reject(err)
        })
    })
  }

  static showEquipment(payload: number | string) {
    return new Promise((resolve, reject) => {
      if (typeof payload === 'string') {
        payload = parseInt(payload)
      }
      http.get('/api/v1/eddp/equipments/' + payload)
        .then((response) => {
          resolve(response.data)
        })
        .catch((err) => {
          console.error(err)
          reject(err)
        })
    })
  }
  static storeEquipments(payload: any) {
    return new Promise((resolve, reject) => {
      http.post('/api/v1/eddp/equipments', payload)
        .then((response) => {
          resolve(response.data)
        })
        .catch((err) => {
          console.error(err)
          reject(err)
        })
    })
  }
  static storeEquipmentsNotInApac(payload: any) {
    return new Promise((resolve, reject) => {
      http.post('/api/v1/eddp/equipments/additionals', payload)
        .then((response) => {
          resolve(response.data)
        })
        .catch((err) => {
          console.error(err)
          reject(err)
        })
    })
  }

  static storeServiceOrders(payload: any) {
    return new Promise((resolve, reject) => {
      http.post('/api/v1/eddp/service-orders', payload)
        .then((response) => {
          resolve(response.data)
        })
        .catch((err) => {
          console.error(err)
          reject(err)
        })
    })
  }

  static storeNotifications(payload: any) {
    return new Promise((resolve, reject) => {
      http.post('/api/v1/eddp/notifications', payload)
        .then((response) => {
          resolve(response.data)
        })
        .catch((err) => {
          console.error(err)
          reject(err)
        })
    })
  }

  static storeAdditionalNotifications(payload: any) {
    return new Promise((resolve, reject) => {
      http.post('/api/v1/eddp/notifications/additionals', payload)
        .then((response) => {
          resolve(response.data)
        })
        .catch((err) => {
          console.error(err)
          reject(err)
        })
    })
  }

  static storeMrps(payload: any) {
    return new Promise((resolve, reject) => {
      http.post('/api/v1/eddp/mrp-demands', payload)
        .then((response) => {
          resolve(response.data)
        })
        .catch((err) => {
          console.error(err)
          reject(err)
        })
    })
  }

  static storeMaterialsIssues(payload: any) {
    return new Promise((resolve, reject) => {
      http.post('/api/v1/eddp/material-issues', payload)
        .then((response) => {
          resolve(response.data)
        })
        .catch((err) => {
          console.error(err)
          reject(err)
        })
    })
  }

  static storeTeamcenterDocuments(payload: any) {
    return new Promise((resolve, reject) => {
      http.post('/api/v1/eddp/teamcenter-documents', payload)
        .then((response) => {
          resolve(response.data)
        })
        .catch((err) => {
          console.error(err)
          reject(err)
        })
    })
  }

  static storeWarehouses(payload: any) {
    return new Promise((resolve, reject) => {
      http.post('/api/v1/eddp/warehouse-inventories', payload)
        .then((response) => {
          resolve(response.data)
        })
        .catch((err) => {
          console.error(err)
          reject(err)
        })
    })
  }

  static storeEtmHeaders(payload: any) {
    return new Promise((resolve, reject) => {
      http.post('/api/v1/eddp/etm-headers', payload)
        .then((response) => {
          resolve(response.data)
        })
        .catch((err) => {
          console.error(err)
          reject(err)
        })
    })
  }
  static storeEtms(payload: any) {
    return new Promise((resolve, reject) => {
      http.post('/api/v1/eddp/etms', payload)
        .then((response) => {
          resolve(response.data)
        })
        .catch((err) => {
          console.error(err)
          reject(err)
        })
    })
  }
}
