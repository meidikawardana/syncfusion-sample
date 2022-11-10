<template>
    <q-select
      :clearable="clearable"
      outlined
      :model-value="value"
      @update:model-value="$emit('update:value', $event)"
      label="Client"
      :hint="hint"
      :options="clients"
      option-value="id"
      option-label="description"
      emit-value
      map-options

      :readonly="readonly"

      bottom-slots
      :error-message="errorMessage"
      :error="error"
    >
    </q-select>
</template>

<script>
import { mapState } from 'pinia'
import { useClientStore } from 'src/stores/config/Client'

export default {
  name: 'my-client',
  props: {
    value: {
      required: true
    },
    required: {
      type: Boolean,
      required: false
    },
    readonly: {
      type: Boolean,
      required: false
    },
    clearable: {
      default: true,
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
    },
    hint: {
      default: null,
      required: false
    }
  },
  data () {
    return {
    }
  },
  computed: {
    ...mapState(useClientStore, ['clients'])
  }
}
</script>
