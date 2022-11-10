<template>
  <q-bar
    class="toolbar text-grey-9 vertical-middle"
    style="height: 40px; min-width=100%"
  >
    <slot></slot>
  </q-bar>
</template>

<script>
export default {
  name: "my-toolbar",
  data() {
    return {};
  },
  methods: {},
};
</script>
