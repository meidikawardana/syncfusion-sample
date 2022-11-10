<template>
  <div class="row">
    <div class="col-2 q-pa-sm">
      <my-location v-model:value="searchForm.location_id" multiple/>
    </div>
    <div class="col-2 q-pa-sm">
      <my-input v-model:value="searchForm.year" label="Demand Year" type="number"/>
    </div>
    <div class="col-1 q-pa-sm"><q-btn ref="onSearchBtn" :loading="loading" color="primary" label="Search" @click="onSearch"></q-btn></div>
  </div>
</template>

<script>
import { mapActions } from 'pinia'
import { useAllocationStore } from 'src/stores/tsp/Allocation'

export default {
  name: 'AllocationsFilter',
  data () {
    return {
      expanded: true,
      searchForm: {
        location_id: [],
        year: new Date().getFullYear()
      },
      loading: false
    }
  },
  props: ['gridId'],
  methods: {
    ...mapActions(useAllocationStore, ['getAllocations']),
    onSearch: function () {
      const params = {}
      if (this.searchForm.location_id) params['filter[location_id]'] = this.searchForm.location_id
      if (this.searchForm.year) params['filter[year]'] = this.searchForm.year
      this.expanded = false
      this.loading = true
      this.getAllocations(params).then(response => {
        this.$emit('result', response)
        this.loading = false
      })
    }
  },
  created () {
    this.onSearch()
  }
}
</script>
