import { boot } from 'quasar/wrappers'
import * as api from 'src/app/models'

export default boot(({ app }) => {
  app.config.globalProperties.$api = api
})
