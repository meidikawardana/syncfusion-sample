<template>
  <q-input
    v-model='searchField'
    class='q-ml-md'
    clear-icon='close'
    clearable
    dense
    label='Search'
    outlined
    @clear='clearSearch'
    @keyup.enter='onEnter'
  >
    <template v-slot:append>
      <q-icon v-if='!searchField' clickable name='sym_o_search' @click='btnSearch' />
      <q-icon v-else class='text-secondary' clickable name='sym_o_search' @click='btnSearch' />
    </template>
  </q-input>
</template>

<script lang="ts">
import { Query } from '@syncfusion/ej2-data'
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    kanbanId: {
      required: true,
      type: String,
    },
  },
  data() {
    return {
      searchField: null
    }
  },
  methods: {
    onEnter() {
      if (this.searchField!== null) {
        this.btnSearch()
      }
      else {
        this.clearSearch()
      }
    },
    btnSearch: function () {
      const kanbanObj = document.getElementById(this.kanbanId).ej2_instances[ 0 ]
      let searchQuery = new Query()
      if (this.searchField !== '') {
        searchQuery = new Query().search(
          this.searchField,
          [
            'id',
            'mps_view.service_order',
            'mps_view.equipment',
            'mps_view.sel_header_id',
            'mps_view.scope',
            'mps_view.comments',
            'mps_view.work_instruction'
          ],
          'contains',
          true
        )
      }
      kanbanObj.query = searchQuery
    },
    clearSearch() {
      const kanbanObj = document.getElementById(this.kanbanId).ej2_instances[ 0 ]
      kanbanObj.query = new Query()
    }
  }
})
</script>
