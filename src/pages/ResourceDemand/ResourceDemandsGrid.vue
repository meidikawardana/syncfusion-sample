<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn flat dense round icon="menu" aria-label="Menu" />

        <q-toolbar-title> Resource Demands Sample </q-toolbar-title>

        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <q-page padding>
        <!-- content -->
        <!-- Toolbar -->
        <filter-bar @filtered="onFilter" />

        <!-- Grid -->
        <div class="max-grid-height">
          <ejs-grid
            ref="grid"
            id="ResourceDemandGrid"
            :dataSource="data"
            :enablePersistence="true"
            :allowPaging="true"
            :pageSettings="pageSettings"
            :allowSelection="true"
            :allowSorting="true"
            :sortSettings="sortSettings"
            :allowFiltering="true"
            :filterSettings="filterSettings"
            :editSettings="editSettings"
            :selectionSettings="selectionOptions"
            :height="height"
            :frozenColumns="0"
            :allowExcelExport="true"
            :allowResizing="true"
            :allowMultiSorting="true"
            :enableAutoFill="true"
            :cellSelected="cellSelected"
            :cellSave="cellSave"
            :beforeBatchSave="beforeBatchSave"
          >
            <e-columns>
              <e-column
                field="id"
                headerText="ID"
                isPrimaryKey="true"
                :allowEditing="false"
                :visible="false"
                :showInColumnChooser="false"
              ></e-column>
              <e-column
                field="sep.location_id"
                headerText="Location"
                foreignKeyValue="location"
                foreignKeyField="id"
                :dataSource="locations"
                width="100"
                clipMode="EllipsisWithTooltip"
                :allowEditing="false"
                :customAttributes="disabledColumnAttribute"
                :visible="false"
              ></e-column>
              <e-column
                field="sep.client_id"
                headerText="Client"
                foreignKeyValue="description"
                foreignKeyField="id"
                :dataSource="clients"
                :allowEditing="false"
                width="100"
                clipMode="EllipsisWithTooltip"
                :customAttributes="disabledColumnAttribute"
              ></e-column>
              <e-column
                field="sep_id"
                headerText="SEP#"
                type="number"
                width="100"
                :visible="true"
                clipMode="EllipsisWithTooltip"
                :allowEditing="false"
                :customAttributes="disabledColumnAttribute"
              ></e-column>
              <e-column
                field="sep.project"
                headerText="Project"
                :allowEditing="false"
                width="150"
                clipMode="EllipsisWithTooltip"
                :customAttributes="disabledColumnAttribute"
              ></e-column>

              <e-column
                field="role"
                headerText="Role"
                :allowEditing="false"
                width="160"
                clipMode="EllipsisWithTooltip"
                :customAttributes="disabledColumnAttribute"
              ></e-column>
              <e-column
                field="phase_id"
                headerText="Phase"
                foreignKeyValue="name"
                foreignKeyField="id"
                :dataSource="projectPhases"
                width="100"
                clipMode="EllipsisWithTooltip"
                :allowEditing="false"
                :visible="false"
                :customAttributes="disabledColumnAttribute"
              ></e-column>
              <e-column
                field="scope"
                headerText="Project Scope"
                type="string"
                width="200"
                clipMode="EllipsisWithTooltip"
              ></e-column>
              <e-column
                field="comments"
                headerText="Comments"
                type="string"
                width="130"
                clipMode="EllipsisWithTooltip"
              ></e-column>

              <e-column headerText="Jan-22" :columns="jan22Cols"></e-column>
              <e-column headerText="Feb-22" :columns="feb22Cols"></e-column>
              <e-column headerText="Mar-22" :columns="mar22Cols"></e-column>
              <e-column headerText="Apr-22" :columns="apr22Cols"></e-column>
              <e-column headerText="May-22" :columns="may22Cols"></e-column>
              <e-column headerText="Jun-22" :columns="jun22Cols"></e-column>
              <e-column headerText="Jul-22" :columns="jul22Cols"></e-column>
              <e-column headerText="Aug-22" :columns="aug22Cols"></e-column>
              <e-column headerText="Sep-22" :columns="sep22Cols"></e-column>
              <e-column headerText="Oct-22" :columns="oct22Cols"></e-column>
              <e-column headerText="Nov-22" :columns="nov22Cols"></e-column>
              <e-column headerText="Dec-22" :columns="dec22Cols"></e-column>

              <e-column headerText="Jan-23" :columns="jan23Cols"></e-column>
              <e-column headerText="Feb-23" :columns="feb23Cols"></e-column>
              <e-column headerText="Mar-23" :columns="mar23Cols"></e-column>
              <e-column headerText="Apr-23" :columns="apr23Cols"></e-column>
              <e-column headerText="May-23" :columns="may23Cols"></e-column>
              <e-column headerText="Jun-23" :columns="jun23Cols"></e-column>
              <e-column headerText="Jul-23" :columns="jul23Cols"></e-column>
              <e-column headerText="Aug-23" :columns="aug23Cols"></e-column>
              <e-column headerText="Sep-23" :columns="sep23Cols"></e-column>
              <e-column headerText="Oct-23" :columns="oct23Cols"></e-column>
              <e-column headerText="Nov-23" :columns="nov23Cols"></e-column>
              <e-column headerText="Dec-23" :columns="dec23Cols"></e-column>

              <!--
              <e-column
                headerText="Jan-22"
                :columns="null"
                :visible="false"
              ></e-column>
              <e-column
                headerText="Feb-22"
                :columns="null"
                :visible="false"
              ></e-column>
              <e-column
                headerText="Mar-22"
                :columns="null"
                :visible="false"
              ></e-column>
              <e-column
                headerText="Apr-22"
                :columns="null"
                :visible="false"
              ></e-column>
              <e-column
                headerText="May-22"
                :columns="null"
                :visible="false"
              ></e-column>
              <e-column
                headerText="Jun-22"
                :columns="null"
                :visible="false"
              ></e-column>
              <e-column
                headerText="Jul-22"
                :columns="null"
                :visible="false"
              ></e-column>
              <e-column
                headerText="Aug-22"
                :columns="null"
                :visible="false"
              ></e-column>
              <e-column
                headerText="Sep-22"
                :columns="null"
                :visible="false"
              ></e-column>
              <e-column
                headerText="Oct-22"
                :columns="null"
                :visible="false"
              ></e-column>
              <e-column
                headerText="Nov-22"
                :columns="null"
                :visible="false"
              ></e-column>
              <e-column
                headerText="Dec-22"
                :columns="null"
                :visible="false"
              ></e-column>

              <e-column
                headerText="Jan-23"
                :columns="null"
                :visible="false"
              ></e-column>
              <e-column
                headerText="Feb-23"
                :columns="null"
                :visible="false"
              ></e-column>
              <e-column
                headerText="Mar-23"
                :columns="null"
                :visible="false"
              ></e-column>
              <e-column
                headerText="Apr-23"
                :columns="null"
                :visible="false"
              ></e-column>
              <e-column
                headerText="May-23"
                :columns="null"
                :visible="false"
              ></e-column>
              <e-column
                headerText="Jun-23"
                :columns="null"
                :visible="false"
              ></e-column>
              <e-column
                headerText="Jul-23"
                :columns="null"
                :visible="false"
              ></e-column>
              <e-column
                headerText="Aug-23"
                :columns="null"
                :visible="false"
              ></e-column>
              <e-column
                headerText="Sep-23"
                :columns="null"
                :visible="false"
              ></e-column>
              <e-column
                headerText="Oct-23"
                :columns="null"
                :visible="false"
              ></e-column>
              <e-column
                headerText="Nov-23"
                :columns="null"
                :visible="false"
              ></e-column>
              <e-column
                headerText="Dec-23"
                :columns="null"
                :visible="false"
              ></e-column>
              -->
            </e-columns>
          </ejs-grid>
        </div>

        <q-dialog v-model="confirmDeleteModal">
          <q-card style="width: 300px">
            <q-card-section>
              <div class="text-h6">Delete?</div>
            </q-card-section>
            <q-card-section class="row items-center">
              <span class="q-ml-sm"
                >Confirm deleting {{ this.selectedRows.length }} lines?</span
              >
            </q-card-section>
            <q-card-actions align="right">
              <q-btn outline label="Cancel" color="primary" v-close-popup />
              <q-btn
                icon="o_delete"
                label="Delete"
                color="red"
                v-close-popup
                @click="btnConfirmDelete"
              />
            </q-card-actions>
          </q-card>
        </q-dialog>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import { weeks } from "src/scripts/weeks";
import { mapState, mapActions } from "pinia";
import GridState from "src/mixins/GridState";
import { defineAsyncComponent, defineComponent } from "vue";
import { useResourceDemandStore } from "src/stores/snop/ResourceDemand";
import { useSepStore } from "src/stores/sep/Sep";
import { useLocationStore } from "src/stores/config/Location";
import { useClientStore } from "src/stores/config/Client";
import { useDepartmentStore } from "src/stores/config/Department";
import { useRoleStore } from "src/stores/config/Role";

export default defineComponent({
  name: "resource_demand",
  mixins: [GridState],
  data() {
    return {
      action: "create",
      customAttributes: { class: "customColumn" },

      searchField: null,
      confirmDeleteModal: false,
      openResourceDemandModal: false,
      demandId: null,

      data: [],
      originalData: [],
      selectedRows: [],
      filterSettings: { type: "Excel" },
      pageSettings: {
        pageSize: 21,
        pageSizes: ["21", "50", "All"],
      },
      editSettings: {
        allowEditing: true,
        showConfirmDialog: true,
        allowAdding: true,
        allowDeleting: true,
        mode: "Batch",
      },
      selectionOptions: {
        type: "Multiple",
        mode: "Cell",
        cellSelectionMode: "Box",
      },

      sortSettings: {
        columns: [
          { field: "sep.location_id", direction: "Ascending" },
          { field: "sep.client_id", direction: "Ascending" },
          { field: "sep_id", direction: "Ascending" },
        ],
      },
      disabledColumnAttribute: { class: "disabledColumnCss" },

      jan22Cols: weeks.jan22Cols,
      feb22Cols: weeks.feb22Cols,
      mar22Cols: weeks.mar22Cols,
      apr22Cols: weeks.apr22Cols,
      may22Cols: weeks.may22Cols,
      jun22Cols: weeks.jun22Cols,
      jul22Cols: weeks.jul22Cols,
      aug22Cols: weeks.aug22Cols,
      sep22Cols: weeks.sep22Cols,
      oct22Cols: weeks.oct22Cols,
      nov22Cols: weeks.nov22Cols,
      dec22Cols: weeks.dec22Cols,

      jan23Cols: weeks.jan23Cols,
      feb23Cols: weeks.feb23Cols,
      mar23Cols: weeks.mar23Cols,
      apr23Cols: weeks.apr23Cols,
      may23Cols: weeks.may23Cols,
      jun23Cols: weeks.jun23Cols,
      jul23Cols: weeks.jul23Cols,
      aug23Cols: weeks.aug23Cols,
      sep23Cols: weeks.sep23Cols,
      oct23Cols: weeks.oct23Cols,
      nov23Cols: weeks.nov23Cols,
      dec23Cols: weeks.dec23Cols,
    };
  },
  computed: {
    ...mapState(useLocationStore, ["locations"]),
    ...mapState(useClientStore, ["clients"]),
    ...mapState(useDepartmentStore, ["departments"]),
    ...mapState(useRoleStore, ["roles"]),
    ...mapState(useResourceDemandStore, ["projectPhases", "projects"]),
    height() {
      return this.$q.screen.height - 370 + "px";
    },
  },
  methods: {
    ...mapActions(useResourceDemandStore, [
      "getResourceDemands",
      "updateBatchResourceDemands",
      "deleteBatchResourceDemands",
    ]),
    ...mapActions(useSepStore, ["filterHeaderId"]),
    cellSave(args) {
      if (args.columnName.startsWith("w")) {
        if (typeof args.value === "undefined") {
          args.value = null;
        }
      }
    },
    beforeBatchSave: function (args) {
      if (args.batchChanges.changedRecords.length) {
        this.updateBatchResourceDemands({
          data: args.batchChanges.changedRecords,
        }).then((response) => {});
      }
    },
    onFilter(args) {
      this.data = [...args];
      this.originalData = [...args];
    },
    addResourceDemand: function (args) {
      // console.log(args)
      this.data.unshift(args);
      this.originalData.unshift(args);
      this.data = [...this.data];
    },
    updateResourceDemand: function (args) {
      const gridObj =
        document.getElementById("ResourceDemandGrid").ej2_instances[0];
      const rowData = gridObj.dataSource.find((el) => el.id === args.id);

      rowData.sep.location_id = args.sep.location_id;
      rowData.sep.client_id = args.sep.client_id;
      rowData.sep.project = args.sep.project;

      rowData.snop_roles_id = args.snop_roles_id;
      rowData.comments = args.comments;
      rowData.scope = args.scope;
      rowData.sep_id = args.sep_id;
      rowData.phase_id = args.phase_id;
      gridObj.refresh();
    },
    cellSelected: function (args) {
      this.selectedRows = [];
      const selection = args.selectedRowCellIndex;
      const grid = this.$refs.grid.ej2Instances.getCurrentViewRecords();
      selection.forEach((element) => {
        this.selectedRows.push(grid[element.rowIndex]);
      });
    },
    btnAdd: function () {
      this.resourceDemandData = {};
      this.action = "create";
      this.openResourceDemandModal = true;
    },
    btnEdit: function () {
      this.action = "edit";
      this.demandId = this.getSelectedRecord().id;
      this.openResourceDemandModal = true;
    },
    getSelectedRecord: function () {
      const gridObj =
        document.getElementById("ResourceDemandGrid").ej2_instances[0];
      const selectedRowCellIndexes = gridObj.getSelectedRowCellIndexes();
      const currentViewRecords = gridObj.getCurrentViewRecords();
      const rowRecord = currentViewRecords[selectedRowCellIndexes[0].rowIndex];
      const gridCols = gridObj.getColumns();

      const selectedFieldName =
        gridCols[selectedRowCellIndexes[0].cellIndexes[0]].field;
      const selectedCellRecord = rowRecord[selectedFieldName];

      const selectedColumn = gridCols.find(
        (el) => el.field === selectedFieldName
      );

      const record = {
        id: rowRecord.id,
        index: selectedRowCellIndexes[0].rowIndex,
        column: selectedColumn,
        value: selectedCellRecord,
        rowData: rowRecord,
      };
      return record;
    },
    btnSave: function () {
      const gridObj =
        document.getElementById("ResourceDemandGrid").ej2_instances[0];
      gridObj.endEdit();
    },
    btnCancel: function () {
      this.$refs.grid.ej2Instances.editModule.batchCancel();
    },
    btnDelete: function () {
      if (this.selectedRows.length > 0) {
        this.confirmDeleteModal = true;
      } else {
        console.log("No Rows selected");
      }
    },
    btnConfirmDelete: function () {
      const params = {
        data: [],
      };
      this.selectedRows.forEach((element) => {
        params.data.push({
          id: element.id,
        });
      });
      this.deleteBatchResourceDemands(params).then((response) => {
        response.forEach((element) => {
          this.data = this.data.filter((el) => el.id !== element);
        });
        this.data = [...this.data];
      });
    },
    btnDashboard: function () {
      this.$router.push({ path: "/resource_demand/dashboard" });
    },
  },
  created() {
    this.filterHeaderId();
  },
  components: {
    "filter-bar": defineAsyncComponent(() =>
      import("src/components/Filters/ResourceDemandFilter.vue")
    ),
  },
});
</script>

<style lang="scss">
</style>
