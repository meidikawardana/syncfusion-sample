<template>
  <q-input
    outlined
    :model-value="value"
    @update:model-value="$emit('update:value', $event)"
    :label="label"
    :readonly="readonly"
    :hint="hint"
    :error="error"
    :error-message="errorMessage"
    :type="type"
    :clearable="clearable"
  >
  </q-input>
</template>

<script>
import FormField from 'src/mixins/Form/FormField'
export default {
  mixins: [FormField],
  props: {
    value: {
      required: true
    },
    type: {
      required: false
    },
    label: {
      required: true
    },
    clearable: {
      required: false,
      default: false
    },
    append: {
      required: false
    },
    readonly: {
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
    },
    hint: {
      default: null,
      required: false
    }
  },
  data () {
    return {
    }
  }
}
</script>

<style></style>
