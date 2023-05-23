import { Api } from '@konnec/vue-eloquent'
import { http } from 'boot/axios'

export default class EquipmentApi extends Api {
  resource = 'eddp/equipments'

  constructor() {
    super()
  }

  static show(payload: number | string): Promise<any> {
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

  static filter(payload: number): Promise<any> {
    return new Promise((resolve, reject) => {
      http
        .get('equipment-data-source.json', {
          params: { equipment_query: payload },
        })
        .then((response) => {
          resolve(response.data)
        })
        .catch((er) => {
          console.error('error')
          reject(er)
        })
    })
  }
}
