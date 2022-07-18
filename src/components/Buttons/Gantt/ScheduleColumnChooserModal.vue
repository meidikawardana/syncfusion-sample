<template>
  <q-card style="max-width: 1000px;width:1000px;height:750px">
    <q-card-section class="bg-primary text-white text-h6">Column Chooser</q-card-section>
    <div class="row text-h6 text-center">
      <div class="col-6 q-pa-sm">Visible Columns</div>
      <div class="col-6 q-pa-sm">Hidden Columns</div>
    </div>
    <div class="row">
      <div class="col-6 q-pa-md">
        <ejs-listbox
          id="visibleColumns"
          :dataSource='visibleColumns'
          :itemTemplate="itemTemplate"
          :allowDragAndDrop="true"
          :fields="fields"
          scope="#hiddenColumns"
          :toolbarSettings='toolbarSettings'
          height="500px"
        ></ejs-listbox>
      </div>
      <div class="col-6 q-pa-md">
        <ejs-listbox
          id="hiddenColumns"
          :dataSource='hiddenColumns'
          :itemTemplate="itemTemplate"
          sortOrder="Ascending"
          :allowDragAndDrop="true"
          :fields="fields"
          height="500px"
          scope="combined-list"
        ></ejs-listbox>
      </div>
    </div>
    <q-card-actions align="right">
      <q-btn outline label="Cancel" color="primary" text-color="primary" @click="$emit('close')"/>
      <q-btn :loading="loading" label="Update" color="primary" @click="onUpdate"/>
    </q-card-actions>
  </q-card>
</template>

<script>
import Vue from 'vue'
import { QSpace, QIcon, QTooltip } from 'quasar'

import { ListBoxPlugin } from '@syncfusion/ej2-vue-dropdowns'
Vue.use(ListBoxPlugin)
let gridIdStr
export default {
  data () {
    return {
      visibleColumns: [],
      hiddenColumns: [],
      fields: { text: 'headerText', iconCss: 'iconCss' },
      toolbarSettings: { items: ['moveUp', 'moveDown', 'moveTo', 'moveFrom', 'moveAllTo', 'moveAllFrom'] },
      loading: false,
      itemTemplate: function () {
        return {
          template: Vue.component('itemTemplate', {
            template: `<div class="row q-pa-sm">
                        <span>{{ data.headerText }}</span>
                        <q-space/>
                        <span><q-icon v-if="isFiltered" name="filter_alt" class="text-secondary"><q-tooltip>Filtered</q-tooltip></q-icon></span>
                        <span><q-icon v-show="isSorted" name="sort" class="text-secondary"><q-tooltip>Sorted</q-tooltip></q-icon></span>
                      </div>`,
            data () {
              return {
                data: {
                  data: {}
                }
              }
            },
            computed: {
              isFiltered () {
                const gridObj = document.getElementById(gridIdStr).ej2_instances[0]
                const filteredColumns = gridObj.treeGrid.filterSettings.columns
                const filterVisibleCols = filteredColumns.filter(el => el.field === this.data.field)
                if (filterVisibleCols.length) return true
                return false
              },
              isSorted () {
                const gridObj = document.getElementById(gridIdStr).ej2_instances[0]
                const sortedColumns = gridObj.treeGrid.sortSettings.columns
                const sortVisibleCols = sortedColumns.filter(el => el.field === this.data.field)
                if (sortVisibleCols.length) return true
                return false
              }
            },
            components: {
              QSpace, QIcon, QTooltip
            }
          })
        }
      }
    }
  },
  props: ['gridId'],

  methods: {
    onUpdate () {
      const visibleColsObj = document.getElementById('visibleColumns').ej2_instances[0]
      if (visibleColsObj.sortedData.length > 0) {
        this.loading = true
        this.showColumns()
        this.hideColumns()
        this.reorderColumns()
        this.loading = false
        this.$emit('close')
      } else {
        console.log('Choose at least 1 columns')
      }
    },
    hideColumns () {
      const hiddenColsObj = document.getElementById('hiddenColumns').ej2_instances[0]
      const hideHeaderTextObj = []
      hiddenColsObj.sortedData.forEach(el => {
        hideHeaderTextObj.push(el.headerText)
      })
      // console.log(hideHeaderTextObj)
      const gridObj = document.getElementById(this.gridId).ej2_instances[0]
      gridObj.hideColumn(hideHeaderTextObj)
    },
    showColumns () {
      const visibleColsObj = document.getElementById('visibleColumns').ej2_instances[0]
      const columnsHeaderText = []
      visibleColsObj.sortedData.forEach(el => {
        columnsHeaderText.push(el.headerText)
      })
      // console.log(columnsHeaderText)
      const gridObj = document.getElementById(this.gridId).ej2_instances[0]
      gridObj.showColumn(columnsHeaderText)
      gridObj.treeGrid.refreshColumns()
    },
    reorderColumns () {
      const visibleColsObj = document.getElementById('visibleColumns').ej2_instances[0].sortedData
      let index = 0
      visibleColsObj.forEach(element => {
        const gridObj = document.getElementById(this.gridId).ej2_instances[0]
        const columns = gridObj.treeGrid.getColumns()
        gridObj.reorderColumns(element.field, columns[index].field)
        index++
      })
    }
  },
  created () {
    gridIdStr = this.gridId
    const gridObj = document.getElementById(this.gridId).ej2_instances[0]
    this.visibleColumns = [...gridObj.getGridColumns().filter(el => el.visible === true)]
    this.hiddenColumns = [...gridObj.getGridColumns().filter(el => el.visible === false)]
  }
}
</script>

<style lang='scss'>
</style>
