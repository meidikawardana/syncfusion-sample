<template>
  <q-card style="max-width: 1000px;width:1000px;height:85vh">
    <q-card-section class="bg-primary text-white text-h6">Grid Layout</q-card-section>
    <q-card-section class="q-gutter-md">
    </q-card-section>

    <q-card-section class="q-gutter-md">
      <ejs-grid
        id='LayoutGrid'
        ref='LayoutGrid'
        :allowEditing='false'
        :allowFiltering='true'
        :allowMultiSorting='true'
        :allowPaging='true' :allowReordering='true'
        :allowResizing='true'
        :allowSorting='true' :dataSource='data'
        :editSettings='editSettings'
        :filterSettings='filterSettings'
        :pageSettings='pageSettings'
        :rowSelected="rowSelected"
        :selectionSettings='selectionSettings'
        :sortSettings="sortOptions"
        height=250
      >
        <e-columns>
          <e-column :visible='false' field='id' headerText='ID' isPrimaryKey='true' width='100'></e-column>
          <e-column field='name' headerText='Name' width='120'></e-column>
          <e-column field='description' headerText='Description' width='250'></e-column>
          <e-column :visible="false" field='settings' headerText='Settings'></e-column>
          <e-column field='updated_at' format='dd/MM/yy' headerText='Updated At' type='date' width='120'></e-column>
        </e-columns>
      </ejs-grid>
    </q-card-section>

    <q-card-actions align="right">
      <q-btn color="red" data-cy="Delete" icon="o_delete" label="Delete" @click="onDelete"/>
      <q-space/>
      <q-btn v-close-popup color="primary" label="Cancel" outline />
      <q-btn color="primary" label="Create New" @click="onCreate"/>
    </q-card-actions>
    <q-card-section v-show="showCreate">
      <div class="row modal-section q-my-md">
        <div class="col-12">Create New Layout</div>
      </div>
      <my-input v-model:value="form.name" :error="v$.form.name.$error" label="Name" />
      <my-input v-model:value="form.description" label="Description"/>
      <q-btn :loading="loading" color="primary" label="Save New" @click="onStore"/>
    </q-card-section>

    <q-card-section v-show="showEdit">
      <div class="row modal-section q-my-md">
        <div class="col-12">Layout</div>
      </div>
      <div class="row">
        <div class="col-3 q-pa-sm"><my-input v-model:value="form.name" :error="v$.form.name.$error" label="Name" /></div>
        <div class="col-9 q-pa-sm"><my-input v-model:value="form.description" label="Description"/></div>
      </div>
      <q-card-actions align="right">

        <q-btn :loading="loading" color="primary" label="Save Changes" @click="onUpdate"/>
        <q-btn color="secondary" label="Select" @click="onSelect"/>
      </q-card-actions>
    </q-card-section>

  </q-card>
</template>

<script>
import { mapActions, mapState } from 'pinia'
import GridState from 'src/mixins/GridState'
import { required } from '@vuelidate/validators'
import { useGridStore } from 'src/stores/config/Grid'
import { useAuthStore } from 'src/stores/config/Auth'
import useVuelidate from '@vuelidate/core'

export default {
  mixins: [GridState],
  setup () {
    return {
      v$: useVuelidate()
    }
  },
  data () {
    return {
      data: [],
      showCreate: false,
      showEdit: false,
      loading: false,
      editSettings: {
        allowEditing: false,
        showConfirmDialog: false,
        allowAdding: false,
        allowDeleting: true
      },
      filterSettings: { type: 'Excel' },
      pageSettings: {
        pageSize: 12
      },
      selectionSettings: { type: 'Single' },
      sortOptions: {
        columns: [
          { field: 'name', direction: 'Ascending' }
        ]
      },
      form: {
        id: null,
        grid_id: null,
        name: null,
        user_id: null,
        description: null,
        settings: null
      }
    }
  },
  validations: {
    form: {
      name: {
        required
      }
    }
  },
  props: ['gridId'],
  computed: {
    ...mapState(useAuthStore, ['user'])
  },
  methods: {
    ...mapActions(useGridStore, ['getLayouts', 'storeLayout', 'updateLayout', 'selectLayout', 'deleteLayout']),
    rowSelected: function (args) {
      this.showEdit = true
      this.showCreate = false
      this.form.id = args.data.id
      this.form.name = args.data.name
      this.form.description = args.data.description
      this.form.settings = args.data.settings
    },
    onCreate: function () {
      this.showEdit = false
      this.showCreate = true
      this.form.id = null
      this.form.name = null
      this.form.description = null
      this.form.settings = null
    },
    onStore: function () {
      this.v$.$touch()
      if (!this.v$.$invalid) {
        this.loading = true
        this.form.settings = this.getPivotPersistData()
        this.storeLayout(this.form).then(response => {
          this.data.push(response)
          this.data = [...this.data]
          this.loading = false
        })
      }
    },
    onSelect: function () {
      const dataSource = document.getElementById(this.gridId).ej2_instances[0].dataSourceSettings.dataSource
      document.getElementById(this.gridId).ej2_instances[0].dataSourceSettings = this.form.settings.dataSourceSettings
      document.getElementById(this.gridId).ej2_instances[0].dataSourceSettings.dataSource = dataSource
      document.getElementById(this.gridId).ej2_instances[0].refresh()
      const params = {
        id: this.form.id,
        grid_id: this.gridId
      }
      this.selectLayout(params).then(() => {
        this.$emit('close')
      })
    },
    onUpdate: function () {
      this.v$.$touch()
      if (!this.v$.$invalid) {
        this.loading = true
        this.form.settings = this.getPivotPersistData()
        this.updateLayout(this.form).then(response => {
          this.data = [...this.data.map(element => {
            if (element.id === response.id) {
              element.name = response.name
              element.description = response.description
            }
            return element
          })]

          this.$grid('LayoutGrid').update(response)
          this.loading = false
        })
      }
    },
    onDelete: function () {
      const gridObj = document.getElementById('LayoutGrid').ej2_instances[0]
      const selected = gridObj.getSelectedRecords()
      if (selected && selected[0]) {
        this.deleteLayout(selected[0].id).then(() => {
          this.data = [...this.data.filter(el => el.id !== selected[0].id)]
        })
      }
    },
    getPivotPersistData () {
      const persistData = document.getElementById(this.gridId).ej2_instances[0].getPersistData()
      let pivotObj = JSON.parse(persistData).dataSourceSettings
      pivotObj = {
        ...pivotObj,
        dataSource: []
      }
      const settings = {
        dataSourceSettings: pivotObj
      }
      return settings
    }
  },
  created () {
    this.getLayouts(this.gridId).then(response => {
      this.data = [...response]
    })
    this.form.grid_id = this.gridId
    this.form.user_id = this.user.id
  }
}
</script>

<style>
</style>
