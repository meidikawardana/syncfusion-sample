import { http } from "boot/axios";
import { defineStore } from "pinia";

const state = {
  action: "create",
  scheduleId: null,
  schedule: {},
  schedules: [],
  filters: {
    location_id: null,
    client_id: null,
    calloff_status_id: null,
    sep_id: null,
    calloff_id: null,
    status: null,
  },
  timeOffTable: [
    { id: 0, workedDays: 6, daysOff: 0 },
    { id: 1, workedDays: 9, daysOff: 3 },
    { id: 2, workedDays: 12, daysOff: 4 },
    { id: 3, workedDays: 15, daysOff: 5 },
    { id: 4, workedDays: 18, daysOff: 6 },
    { id: 5, workedDays: 21, daysOff: 7 },
    { id: 6, workedDays: 24, daysOff: 8 },
    { id: 7, workedDays: 27, daysOff: 10 },
    { id: 8, workedDays: 28, daysOff: 12 },
  ],
  objectID: null,
  // Summary Page
  summaryTimelineColumns: [
    { field: "name", headerText: "Name", width: 230, type: "string" },
    {
      field: "utilization_2021",
      headerText: "2021 Utilization",
      type: "number",
      width: 120,
      visible: false,
    },
    {
      field: "utilization_2022",
      headerText: "2022 Utilization",
      type: "number",
      width: 120,
      visible: false,
    },
    {
      field: "utilization_2023",
      headerText: "2023 Utilization",
      type: "number",
      width: 120,
      visible: false,
    },
    { field: "department", headerText: "Department", width: 120 },
    { field: "location", headerText: "Country", type: "string", width: 120 },
    {
      field: "id",
      headerText: "ID",
      width: 100,
      visible: false,
      isPrimaryKey: true,
      type: "number",
    },
  ],
  scheduleObj: [],
};

const mutations = {
  SET_ACTION(state, payload) {
    state.action = payload;
  },
  SET_SCHEDULE_ID(state, scheduleId) {
    state.scheduleId = scheduleId;
  },
  SET_SCHEDULE(state, payload) {
    state.schedule = payload;
  },
  SET_SCHEDULES(state, payload) {
    state.schedules = [...payload];
  },
  ADD_SCHEDULE(state, schedule) {
    state.calloffs.unshift(schedule);
  },
  UPDATE_SCHEDULES(state, schedule) {
    const index = state.schedule.findIndex((el) => el.id === schedule.id);
    state.schedules.splice(index, 1);
    state.schedules.unshift(schedule);
  },
  UPDATE_FILTERS(state, filters) {
    state.filters = filters;
  },
  SET_OBJECT_ID(state, id) {
    state.objectID = id;
  },
  SET_SUMMARY_COLUMNS(state, payload) {
    // console.log(payload)
    state.summaryTimelineColumns = payload;
  },
  SET_SUMMARY_LOCATIONS_DATASOURCE(state, payload) {
    state.summaryTimelineColumns[5].dataSource = payload;
  },
  SET_SUMMARY_DEPARTMENTS_DATASOURCE(state, payload) {
    state.summaryTimelineColumns[4].dataSource = payload;
  },
};

const actions = {
  getSchedules({ commit }, payload) {
    return new Promise((resolve, reject) => {
      http
        .get("/small-data-source.json", { params: payload })
        .then((response) => {
          resolve(response.data.data);
        })
        .catch((er) => {
          console.error(er);
        });
    });
  },
};

const getters = {};

export const useScheduleStore = defineStore("Schedule", {
  state: () => {
    return state;
  },
  actions,
  getters,
});
