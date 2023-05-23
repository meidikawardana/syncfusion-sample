<template>
  <q-select
    clearable
    :disable='disable'
    emit-value
    :error='error'
    error-message='Invalid Equipment Number'
    fill-input
    hide-dropdown-icon
    hide-selected
    hint='Minimum 4 characters to trigger autocompletion'
    input-debounce='100'
    :label='label'
    :loading='loading'
    map-options
    :model-value='mValue'
    :options='options'
    outlined
    :readonly='readonly'
    use-input
    @clear='onClear'
    @filter='filterFn'
    @input-value='setValue'
  >

    <template v-slot:no-option>
      <q-item>
        <q-item-section class='text-grey'>No results</q-item-section>
      </q-item>
    </template>

  </q-select>
</template>

<script lang="ts">
import EquipmentApi from 'src/modules/Config/models/Equipment/EquipmentApi'
import { IEquipment } from 'src/modules/Config/models/Equipment/EquipmentInterface'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'MyEquipment',
  props: {
    value: {
      required: false,
      type: Number
    },
    label: {
      required: false,
      default: 'Equipment',
      type: String
    },
    readonly: {
      type: Boolean,
      required: false
    },
    disable: {
      type: Boolean,
      required: false
    },
    error: {
      type: Boolean,
      default: false,
      required: false
    },
  },
  emits: {
    fill(equipment: IEquipment) {
      return equipment
    },
    'update:value'(val: number) {
      return val
    }
  },
  data() {
    return {
      mValue: null as number|null,
      options: [] as number[],
      loading: false
    }
  },
  computed: {
    isEquipment() {
      return (this.mValue)?.toString().length === 8
    }
  },
  watch: {
    value(val) {
      this.mValue = parseInt(val)
    }
  },
  methods: {
    filterFn(val: any, update: any, abort:any) {
      if (val.length < 4) {
        abort()
        return
      }
      update(() => {
        this.loading = true
        EquipmentApi.filter(val).then((response: { data: number[] }) => {
          this.options = response.data
          this.loading = false
        })
      })
    },
    setValue(val: string|number) {
      this.mValue = parseInt(val)
      this.$emit('update:value', this.mValue)
    },
    onClear() {
      this.mValue = null
    },
  },
})
</script>
