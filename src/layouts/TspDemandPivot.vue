<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn flat dense round icon="menu" aria-label="Menu" />

        <q-toolbar-title> PivotView Sample </q-toolbar-title>

        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <q-page padding>
        <!-- Gantt -->
        <div class="row">
          <div class="col-12">
            <div>
              <allocations-filter
                gridId="TspDemandPivotView"
                @result="onUpdate"
              />
              <my-toolbar>
                <q-btn
                  v-show="shouldShowToggleButton"
                  :icon="
                    innerExpandAll
                      ? 'o_unfold_less_double'
                      : 'o_unfold_more_double'
                  "
                  :label="innerExpandAll ? 'Group' : 'Collapse'"
                  :loading="isToggling"
                  color="primary"
                  dense
                  flat
                  size="md"
                  @click="toggleCollapse"
                />
                <q-space />
                <pivot-layout-button
                  grid-id="TspDemandPivotView"
                ></pivot-layout-button>
              </my-toolbar>
              <ejs-pivotview
                id="TspDemandPivotView"
                ref="TspDemandPivotView"
                :actionBegin="actionBegin"
                :actionComplete="actionComplete"
                :allowDeferLayoutUpdate="true"
                :allowDrillThrough="true"
                :allowExcelExport="true"
                :chartSeriesCreated="chartSeriesCreated"
                :chartSettings="chartSettings"
                :chartTypes="chartTypes"
                :dataBound="dataBound"
                :dataSourceSettings="dataSourceSettings"
                :displayOption="displayOption"
                :enablePersistence="false"
                :enableVirtualization="true"
                :fetchReport="fetchReport"
                :gridSettings="gridSettings"
                :height="height"
                :load="load"
                :loadReport="loadReport"
                :showFieldList="true"
                :showGroupingBar="true"
                :showToolbar="true"
                :toolbar="toolbar"
              >
              </ejs-pivotview>
            </div>
          </div>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import { mapActions } from "pinia";
import { useCapacityStore } from "src/stores/snop/Capacity";
import { useAllocationStore } from "src/stores/tsp/Allocation";
import PivotTableState from "src/mixins/PivotTableState";
import { defineAsyncComponent } from "vue";

export default {
  mixins: [PivotTableState],
  data() {
    return {
      data: [],
      dataSourceSettings: {
        dataSource: [],
        rows: [{ name: "week" }],
        columns: [{ name: "discipline" }],
        values: [{ name: "demand", type: "Sum" }],
        expandAll: false,
        allowValueFilter: true,
        filters: [
          { name: "year" },
          { name: "type" },
          { name: "category" },
          { name: "discipline" },
          { name: "role" },
          { name: "status" },
          { name: "location" },
          { name: "phase" },
        ],
        filterSettings: [
          {
            name: "year",
            type: "Include",
            items: [new Date().getFullYear().toString()],
          },
          {
            name: "status",
            type: "Exclude",
            items: ["Cancelled", "Rejected"],
          },
          {
            name: "category",
            type: "Exclude",
            items: ["Training"],
          },
          {
            name: "role",
            type: "Exclude",
            items: ["Engineer"],
          },
          {
            name: "phase",
            type: "Exclude",
            items: ["Upside"],
          },
        ],
        formatSettings: [{ name: "demand", format: "###,###" }],
      },
      displayOption: {
        primary: "Chart",
        view: "Both",
      },
      chartTypes: ["StackingColumn", "Column", "Bar", "Line", "Area"],
      chartSettings: {
        value: "demand",
        chartSeries: { type: "StackingColumn" },
        zoomSettings: {
          enableScrollbar: false,
          toolbarItems: ["Zoom", "ZoomIn", "ZoomOut", "Pan", "Reset"],
        },
      },
      gridSettings: {},
      toolbar: ["Load", "Grid", "Chart", "Export", "FieldList"],
      innerExpandAll: false,
      isToggling: false,
      shouldShowToggleButton: false,
    };
  },
  computed: {
    height() {
      return this.$q.screen.height - 270 + "px";
    },
  },
  methods: {
    ...mapActions(useAllocationStore, ["getAllocations"]),
    ...mapActions(useCapacityStore, ["getCapacitiesDashboard"]),
    toggleCollapse() {
      const pivotObj =
        document.getElementById("TspDemandPivotView").ej2_instances[0];
      pivotObj.dataSourceSettings.expandAll = !this.innerExpandAll;
      this.isToggling = true;
    },
    onUpdate(args) {
      const capacitiesParams = { function_id: [2] };
      this.getCapacitiesDashboard(capacitiesParams).then((res) => {
        const pivotObj =
          document.getElementById("TspDemandPivotView").ej2_instances[0];
        pivotObj.dataSourceSettings.dataSource = args.concat(res);
        this.data = [...pivotObj.dataSourceSettings.dataSource];
      });
    },
    chartSeriesCreated(args) {
      args.series.forEach((element) => {
        if (element.name === "Capacity") {
          element.type = "Line";
          element.width = 5;
        }
      });
    },
    load: function () {
      this.handleToggleButtonVisibility();
    },
    fetchReport: function (args) {
      args.reportName = ["By Discipline", "By Project", "S&OP"];
    },
    loadReport: function (args) {
      const pivotObj =
        document.getElementById("TspDemandPivotView").ej2_instances[0];
      switch (args.reportName) {
        case "S&OP":
          pivotObj.dataSourceSettings = {
            dataSource: [...this.data],
            rows: [{ name: "week" }],
            columns: [{ name: "phase" }],
            values: [{ name: "demand", type: "Sum" }],
            expandAll: this.innerExpandAll,
            allowValueFilter: true,
            filters: [
              { name: "year" },
              { name: "category" },
              { name: "discipline" },
              { name: "role" },
              { name: "status" },
              { name: "location" },
              { name: "discipline" },
            ],
            filterSettings: [
              {
                name: "year",
                type: "Include",
                items: [new Date().getFullYear().toString()],
              },
              {
                name: "status",
                type: "Exclude",
                items: ["Cancelled", "Rejected"],
              },
              {
                name: "category",
                type: "Exclude",
                items: ["Training"],
              },
              {
                name: "role",
                type: "Exclude",
                items: ["Engineer"],
              },
              {
                name: "phase",
                type: "Exclude",
                items: ["Upside", "undefined"],
              },
            ],
            formatSettings: [{ name: "demand", format: "###,###" }],
          };
          break;
        case "By Project":
          pivotObj.dataSourceSettings = {
            dataSource: [...this.data],
            rows: [
              { name: "location" },
              { name: "client" },
              { name: "project" },
            ],
            columns: [{ name: "discipline" }],
            values: [{ name: "demand", type: "Sum" }],
            drilledMembers: [
              { name: "location", items: ["Australia", "Malaysia"] },
            ],
            expandAll: this.innerExpandAll,
            allowValueFilter: true,
            filters: [
              { name: "year" },
              { name: "category" },
              { name: "discipline" },
              { name: "role" },
              { name: "status" },
              { name: "location" },
              { name: "phase" },
            ],
            filterSettings: [
              {
                name: "year",
                type: "Include",
                items: [new Date().getFullYear().toString()],
              },
              {
                name: "status",
                type: "Exclude",
                items: ["Cancelled", "Rejected"],
              },
              {
                name: "category",
                type: "Exclude",
                items: ["Training"],
              },
              {
                name: "role",
                type: "Exclude",
                items: ["Engineer"],
              },
              {
                name: "phase",
                type: "Exclude",
                items: ["Upside", "undefined"],
              },
            ],
            formatSettings: [{ name: "demand", format: "###,###" }],
          };
          break;
        case "By Discipline":
        default:
          pivotObj.dataSourceSettings = {
            dataSource: [...this.data],
            rows: [{ name: "week" }],
            columns: [{ name: "discipline" }],
            values: [{ name: "demand", type: "Sum" }],
            expandAll: this.innerExpandAll,
            allowValueFilter: true,
            filters: [
              { name: "year" },
              { name: "category" },
              { name: "discipline" },
              { name: "role" },
              { name: "status" },
              { name: "location" },
              { name: "phase" },
            ],
            filterSettings: [
              {
                name: "year",
                type: "Include",
                items: [new Date().getFullYear().toString()],
              },
              {
                name: "status",
                type: "Exclude",
                items: ["Cancelled", "Rejected"],
              },
              {
                name: "category",
                type: "Exclude",
                items: ["Training"],
              },
              {
                name: "role",
                type: "Exclude",
                items: ["Engineer"],
              },
              {
                name: "phase",
                type: "Exclude",
                items: ["Upside"],
              },
            ],
            formatSettings: [{ name: "demand", format: "###,###" }],
          };
          break;
      }
    },
    actionBegin: function () {
      this.handleToggleButtonVisibility();
      this.preventSaveChangesAlert();
    },
    actionComplete: function () {
      const pivotObj =
        document.getElementById("TspDemandPivotView").ej2_instances[0];
      this.handleToggleButtonVisibility();
      this.onUpdate(
        pivotObj.dataSourceSettings.dataSource.filter(
          (data) => data.discipline !== "Capacity"
        )
      );
    },
    dataBound: function () {
      const pivotObj =
        document.getElementById("TspDemandPivotView").ej2_instances[0];
      this.innerExpandAll = pivotObj.dataSourceSettings.expandAll;
      this.isToggling = false;

      this.preventSaveChangesAlert();
    },
    preventSaveChangesAlert: function () {
      const pivotObj =
        document.getElementById("TspDemandPivotView").ej2_instances[0];
      pivotObj.isModified = false;
      pivotObj.toolbarModule.action = "";
    },
    handleToggleButtonVisibility() {
      this.$nextTick(() => {
        const pivotObj =
          document.getElementById("TspDemandPivotView").ej2_instances[0];
        this.shouldShowToggleButton = pivotObj.currentView === "Table";
      });
    },
  },
  components: {
    AllocationsFilter: defineAsyncComponent(() =>
      import("src/components/Filters/AllocationFilter.vue")
    ),
    PivotLayoutButton: defineAsyncComponent(() =>
      import("src/components/Buttons/LayoutButtonPivot.vue")
    ),
  },
};
</script>

<style>
</style>
