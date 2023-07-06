import { boot } from "quasar/wrappers";
import { defineAsyncComponent } from "vue";

const MyGanttColumnChooser = defineAsyncComponent(() =>
  import("src/components/Buttons/ColumnChooserButtonGantt.vue")
);

const MyLocation = defineAsyncComponent(() =>
  import("components/Form/LocationField.vue")
);
const MyClient = defineAsyncComponent(() =>
  import("components/Form/ClientField.vue")
);
const MyInput = defineAsyncComponent(() =>
  import("components/Form/InputField.vue")
);
const MySelect = defineAsyncComponent(() =>
  import('components/Form/SelectField.vue')
)
// "async" is optional;
// more info on params: https://quasar.dev/quasar-cli/boot-files
export default boot(({ app }) => {
  app.component("MyGanttColumnChooser", MyGanttColumnChooser);

  app.component("MyLocation", MyLocation);
  app.component("MyClient", MyClient);
  app.component("MyInput", MyInput);
  app.component("MySelect", MySelect)
});
