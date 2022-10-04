<template>
  <q-card style="max-width: 1000px; width: 1000px; height: 750px">
    <q-card-section class="bg-primary text-white text-h6"
      >Column Chooser</q-card-section
    >
    <div class="row text-h6 text-center">
      <div class="col-6 q-pa-sm">Visible Columns</div>
      <div class="col-6 q-pa-sm">Hidden Columns</div>
    </div>
    <div class="row listboxes-container">
      <div class="col-6 q-pa-md">
        <ejs-listbox
          id="visibleColumns"
          :dataSource="visibleColumns"
          :itemTemplate="'leftItemTemplate'"
          :allowDragAndDrop="true"
          :fields="fields"
          scope="#hiddenColumns"
          :toolbarSettings="toolbarSettings"
          height="500px"
        >
          <template v-slot:leftItemTemplate="{ data }">
            <column-chooser-item-template
              :data="data"
              :gridId="gridId"
            ></column-chooser-item-template>
          </template>
        </ejs-listbox>
      </div>
      <div class="col-6 q-pa-md">
        <ejs-listbox
          id="hiddenColumns"
          :dataSource="hiddenColumns"
          :itemTemplate="'rightItemTemplate'"
          sortOrder="Ascending"
          :allowDragAndDrop="true"
          :fields="fields"
          height="500px"
          scope="combined-list"
        >
          <template v-slot:rightItemTemplate="{ data }">
            <column-chooser-item-template
              :data="data"
              :gridId="gridId"
            ></column-chooser-item-template>
          </template>
        </ejs-listbox>
      </div>
    </div>
    <q-card-actions align="right">
      <q-btn
        outline
        label="Cancel"
        color="primary"
        text-color="primary"
        @click="$emit('close')"
      />
      <q-btn
        :loading="loading"
        label="Update"
        color="primary"
        @click="onUpdate"
      />
    </q-card-actions>
  </q-card>
</template>

<script>
import { ListBoxComponent } from "@syncfusion/ej2-vue-dropdowns";
import ColumnChooserItemTemplate from "src/components/Templates/Listbox/ColumnChooserItemTemplate.vue";

export default {
  data() {
    return {
      visibleColumns: [],
      hiddenColumns: [],
      fields: { text: "headerText" },
      toolbarSettings: {
        items: [
          "moveUp",
          "moveDown",
          "moveTo",
          "moveFrom",
          "moveAllTo",
          "moveAllFrom",
        ],
      },
      loading: false,
    };
  },
  props: ["gridId"],

  methods: {
    onUpdate() {
      this.loading = true;
      const self = this;

      const visibleColsObj =
        document.getElementById("visibleColumns").ej2_instances[0];
      const hiddenColsObj =
        document.getElementById("hiddenColumns").ej2_instances[0];

      if (visibleColsObj.sortedData.length > 0) {
        setTimeout(() => {
          const gridObj = document.getElementById(this.gridId).ej2_instances[0];
          let counter = 0;
          const visibleColumnsByField = [];

          visibleColsObj.sortedData.forEach((el) => {
            if (el.headerText !== "Actions" && el.headerText !== "") {
              gridObj.treeGrid.reorderColumns(
                el.field,
                gridObj.treeGrid.columns[counter].field
              );
              visibleColumnsByField.push(el.headerText);
              counter++;
            }
          });
          const hiddenColumnsByField = [];
          hiddenColsObj.sortedData.forEach((el) => {
            hiddenColumnsByField.push(el.headerText);
          });
          gridObj.treeGrid.showColumns(visibleColumnsByField);
          gridObj.treeGrid.hideColumns(hiddenColumnsByField);
          self.$emit("close");
        }, 1000);
      } else {
        this.loading = false;
        console.log("Choose at least 1 columns");
      }
    },
  },
  created() {
    const gridObj = document.getElementById(this.gridId).ej2_instances[0];
    this.visibleColumns = [
      ...gridObj.treeGrid.columns.filter((el) => {
        if (el.visible === true && el.headerText !== "Actions") return true;
        return false;
      }),
    ];
    this.hiddenColumns = [
      ...gridObj.treeGrid.columns.filter((el) => el.visible === false),
    ];
  },
  components: {
    "ejs-listbox": ListBoxComponent,
    "column-chooser-item-template": ColumnChooserItemTemplate,
  },
};
</script>

<style lang='scss'>
.listboxes-container .e-listbox-wrapper {
  overflow-x: hidden;
}
</style>
