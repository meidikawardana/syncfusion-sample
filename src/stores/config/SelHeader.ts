import { defineStore } from 'pinia'
import { SelHeader } from 'src/app/configs'

export const useSelHeaderStore = defineStore('SelHeader', {
  state: () => ({
    selHeaders: [] as any,
    selHeaderIds: [] as number[],
    selHeadersDashboardData: [],
    selHeaderStatus: SelHeader.status,
    selHeaderScopes: SelHeader.scopes,
    selHeaderScopesSimplified: SelHeader.scopesSimplified,
  }),
  actions: {
  },
  getters: {
    getScope: (state) => (id: number) => {
      if (id)
        return state.selHeaderScopes.find((element: any) => element.id === id)?.name
      return null
    },
  },
})
