<template>
  <q-select
    outlined
    :clearable="clearable"
    :model-value="value"
    @update:model-value="$emit('update:value', $event)"
    :label="label"
    :options="locationsOptions"
    option-value="id"
    option-label="location"
    emit-value
    map-options
    :readonly="isReadOnly"
    :multiple="multiple"
    :use-chips="multiple"

    bottom-slots
    :error-message="errorMessage"
    :error="error"
    :hint="hint"
  >
    <template v-slot:option="scope">
      <q-item v-bind="scope.itemProps" v-on:change="scope.itemEvents">
        <q-item-section avatar>
          <img :src="scope.opt.flag" alt="flag" style="width: 20px;">
        </q-item-section>
        <q-item-section>
          <q-item-label>{{ scope.opt.location }}</q-item-label>
        </q-item-section>
      </q-item>
    </template>

  </q-select>
</template>

<script>
import { mapState } from 'pinia'
import { useLocationStore } from 'src/stores/config/Location'
import FormField from 'src/mixins/Form/FormField'
export default {
  name: 'my-location',
  mixins: [FormField],
  props: {
    value: {
      required: true
    },
    label: {
      required: false,
      default: 'Location'
    },
    clearable: {
      required: false,
      default: true
    },
    allCountries: {
      type: Boolean,
      default: false,
      required: false
    },
    hint: {
      required: false
    },
    readonly: {
      type: [Boolean, Function],
      default: false,
      required: false
    },
    multiple: {
      type: Boolean,
      required: false
    },
    error: {
      type: Boolean,
      default: false,
      required: false
    },
    errorMessage: {
      default: 'Required',
      required: false
    }
  },
  data () {
    return {
      locationsOptions: []
    }
  },
  computed: {
    ...mapState(useLocationStore, ['locations', 'getApacLocations'])
    // ...mapState(useLocationStore, ['getApacLocations'])
  },
  created () {
    if (this.allCountries) {
      this.locationsOptions = [...this.locations]
    } else {
      this.locationsOptions = [...this.getApacLocations]
    }
  }

}
</script>
