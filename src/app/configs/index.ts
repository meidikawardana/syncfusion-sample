import { reactive } from 'vue'
import Sel from 'src/modules/Sel/configs/Sel.json'
import SelHeader from 'src/modules/Sel/configs/SelHeader.json'

const constants = {
  Sel: reactive(Sel),
  SelHeader: reactive(SelHeader)
}

export {
  constants,
  /**
   * @deprecated
   * Below are deprecated and will be removed in the next major version.
   * Only kept for backwards compatibility on the stores
   */
  SelHeader,
  Sel
}
