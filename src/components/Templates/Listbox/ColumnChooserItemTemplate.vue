<template>
  <div class="row q-pa-sm">
    <span>{{ data.headerText }}</span>
    <q-space/>
    <span v-if="isFiltered">
      <Popper
        content="Filtered"
        :hover="true"
        class="my-popper"
      >
        <i aria-hidden="true" role="presentation" class="text-secondary q-icon notranslate material-icons">filter_alt</i>
      </Popper>
    </span>
    <span v-show="isSorted">
      <Popper
        content="Sorted"
        :hover="true"
        class="my-popper"
      >
        <i aria-hidden="true" role="presentation" class="text-secondary q-icon notranslate material-icons">sort</i>
      </Popper>
    </span>
  </div>
</template>

<script>
import {
  defineComponent
} from 'vue'
import Popper from 'vue3-popper'

export default defineComponent({
  name: 'ColumnChooserItemTemplate',
  data () {
    return {
    }
  },
  computed: {
    isFiltered () {
      if (document.getElementById(this.gridId)) {
        const gridObj = document.getElementById(this.gridId).ej2_instances[0]
        const filteredColumns = gridObj.filterSettings.columns
        const filterVisibleCols = filteredColumns.filter(el => el.field === this.data.field)
        if (filterVisibleCols.length) return true
      }
      return false
    },
    isSorted () {
      if (document.getElementById(this.gridId)) {
        const gridObj = document.getElementById(this.gridId).ej2_instances[0]
        const sortedColumns = gridObj.sortSettings.columns
        const sortVisibleCols = sortedColumns.filter(el => el.field === this.data.field)
        if (sortVisibleCols.length) return true
      }
      return false
    }
  },
  props: ['gridId', 'data'],
  components: {
    Popper
  }
})
</script>

<style lang='scss'>
  .my-popper {
    --popper-theme-background-color: #757575;
    --popper-theme-padding: 0;
    font-size: 11px;
    --popper-theme-text-color: white;
    --popper-theme-border-radius: 3px;
    --popper-theme-border-width: 3px;
    --popper-theme-border-style: solid;
    --popper-theme-border-color: #757575;
    --popper-theme-padding: 1px 5px;
  }
</style>
