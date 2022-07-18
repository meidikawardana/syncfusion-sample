const MyGanttColumnChooser = () =>
  import("src/components/Buttons/ColumnChooserButtonGantt.vue");

// "async" is optional;
// more info on params: https://quasar.dev/quasar-cli/boot-files
export default async ({ Vue }) => {
  Vue.component("MyGanttColumnChooser", MyGanttColumnChooser);
};
