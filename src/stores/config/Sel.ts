import { defineStore } from 'pinia'
import { Sel } from 'src/app/configs'
import { ISelView } from 'src/modules/Sel/models/Sel/SelViewInterface'
import { ISelHeader } from 'src/modules/Sel/models/SelHeader/SelHeaderInterface'

export const useSelStore = defineStore('Sel', {
  state: () => ({
    sel: {} as ISelView,
    // frozenColumns: 5,
    selHeader: {} as ISelHeader,
    selHeaderId: null as number | null,
    dashboardData: [],
    categories: Sel.categories,
    srps: Sel.srps,
    ownerships: Sel.ownerships,
    ownershipsSimplified: Sel.ownershipsSimplified,
    releaseStatuses: Sel.releaseStatuses,
    executionStatuses: Sel.executionStatuses
  }),
  actions: {
    SET_SEL_HEADER(payload: ISelHeader) {
      this.selHeader = payload
    },
    SET_SEL_HEADER_ID(payload: number) {
      this.selHeaderId = payload
    }
  },
  getters: {
    getCategory: (state) => (id: number) => {
      return state.categories.find((element) => element.id === id).name
    },
    getOwnership: (state) => (id: number) => {
      if (id) return state.ownerships.find((element) => element.id === id).name
      return null
    },
    getReleaseStatus: (state) => (id: number) => {
      return state.releaseStatuses.find((element) => element.id === id).name
    },
    getSrp: (state) => (id: number) => {
      if (id) return state.srps.find((element) => element.id === id).name
      return null
    },
    getExecutionStatus: (state) => (id: number) => {
      if (id)
        return state.executionStatuses.find((element) => element.id === id).name
      return null
    },
  }
})
