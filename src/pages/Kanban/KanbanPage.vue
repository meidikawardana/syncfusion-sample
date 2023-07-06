<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn flat dense round icon="menu" aria-label="Menu" />

        <q-toolbar-title> Kanban Page </q-toolbar-title>

        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <q-page padding>
        <kanban-filter @done='onFilteredData' />

        <q-scroll-area :style='scrollArea'>
          <ejs-kanban
            id='kanban'
            ref='kanban'
            :allowDragAndDrop='true'
            :cardClick='cardClick'
            :cardDoubleClick='cardDoubleClick'
            :cardSettings='cardSettings'
            :dataSource='data'
            :dragStop='dragStop'
            :enablePersistence='false'
            :enableTooltip='true'
            keyField='station_name'
            :sortSettings='sortSettings'
            :tooltipTemplate="'tooltipSlot'"
            :width='width'
          >
            <template v-slot:headerSlot='{ data }'>
              <header-template :data='data' :stations='stations' />
            </template>
            <template v-slot:cardSlot='{ data }'>
              <card-template :data='data' :get-client='getClient' :get-location='getLocation' :get-scope='getScope' />
            </template>
            <template v-slot:tooltipSlot='{ data }'>
              <tooltip-template :data='data' />
            </template>
          </ejs-kanban>
        </q-scroll-area>

        <q-dialog v-model='openDeleteModal'>
          <delete-modal ref='DeleteModal'
                        label='Remove Card?'
                        @close='openDeleteModal = false'
                        @confirmed='onRemoveCardConfirmed'
          />
        </q-dialog>

        <q-dialog v-model='openMoveToBoardModal'>
          <move-to-flow-modal ref='ToFlowModal'
                              :card-id='cardId'
                              @close='openMoveToBoardModal = false'
                              @moved='onCardMoved'
          />
        </q-dialog>

        <q-dialog v-model='openAddToBoardModal'>
          <add-to-flow-modal ref='AddToFlowModal'
                            :sel-id='selId'
                            @close='openAddToBoardModal = false'
          />
        </q-dialog>

      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import { mapState, mapWritableState } from 'pinia'
import { useAuthStore } from 'src/stores/config/Auth'
import { useClientStore } from 'src/stores/config/Client'
import { useLocationStore } from 'src/stores/config/Location'
import { getKanbanStation } from 'src/modules/Sel/actions/GetKanbanStation'
import CardTemplate from 'src/modules/Sel/components/templates/Kanban/CardTemplate.vue'
import HeaderTemplate from 'src/modules/Sel/components/templates/Kanban/HeaderTemplate.vue'
import TooltipTemplate from 'src/modules/Sel/components/templates/Kanban/TooltipTemplate.vue'
import KanbanState from 'src/modules/Sel/mixins/KanbanState'
import { useSelStore } from 'src/stores/config/Sel'
import { useSelHeaderStore } from 'src/stores/config/SelHeader'
import { defineAsyncComponent, defineComponent } from 'vue'

export default defineComponent({
  components: {
    KanbanFilter: defineAsyncComponent(() =>
      import('src/modules/Sel/components/filters/KanbanFilter.vue')
    ),
    AddToFlowModal: defineAsyncComponent(() => import('src/modules/Sel/components/Sel/Kanban/AddToKanbanFlowModal.vue')),
    MoveToFlowModal: defineAsyncComponent(() => import('src/modules/Sel/components/Sel/Kanban/MoveToKanbanFlowModal.vue')),
    CardTemplate: CardTemplate,
    HeaderTemplate: HeaderTemplate,
    TooltipTemplate: TooltipTemplate,
    DeleteModal: defineAsyncComponent(
      () => import('src/modules/Application/components/App/DeleteConfirmationModal.vue')
    ),
    KanbanSearch: defineAsyncComponent(() =>
      import('src/modules/Application/components/Buttons/KanbanSearchField.vue')
    )
  },
  mixins: [KanbanState],
  data() {
    return {
      data: [],
      cardSettings: {
        headerField: 'id',
        template: 'cardSlot',
        selectionType: 'Single'
      },
      sortSettings: {
        sortBy: 'Custom',
        field: 'station_started_at',
        direction: 'Ascending'
      },
      selId: 0,
      cardId: 0,
      selectedCard: undefined,
      stations: [],
      openDeleteModal: false,
      openMoveToBoardModal: false,
      openAddToBoardModal: false
    }
  },
  computed: {
    ...mapState(useSelStore, [
      'categories',
      'ownerships',
      'srps',
      'executionStatuses',
      'releaseStatuses',
    ]),
    ...mapWritableState(useSelStore, ['sel']),
    ...mapState(useAuthStore, ['user', 'isAdmin']),
    ...mapState(useLocationStore, ['getLocation']),
    ...mapState(useClientStore, ['getClient']),
    ...mapState(useSelHeaderStore, ['getScope']),
    width() {
      return this.stations.length * 300 + 'px'
    },
    scrollArea() {
      const offset = 260
      const height = this.$q.screen.height - offset
      return `height: ${height}px; max-width: ${this.$q.screen.width - 90 + 'px'};`
    }
  },
  watch: {
    openBoardModal(val) {
      if (!val) {
        this.selectedCard = undefined
      }
    }
  },
  mounted() {
  },
  beforeUnmount() {
  },
  methods: {
    delete(data) {
      const kanbanObj = document.getElementById('kanban').ej2_instances[ 0 ]
      kanbanObj.deleteCard(data)
    },
    deleteColumns(){
      const kanbanObj = document.getElementById('kanban').ej2_instances[ 0 ]
      const currentColumns =kanbanObj.layoutModule.columnKeys
      currentColumns.forEach((key) => {
        kanbanObj.deleteColumn(key)
      })
    },
    onUpdateSel(args) {
    },
    cardClick(args) {
      if (this.selectedCard === undefined) {
        this.selectedCard = args.data
      } else {
        this.selectedCard = undefined
      }
    },
    cardDoubleClick(args) {
      args.cancel = true
      this.sel = args.data
      this.selId = args.data.sel_id
    },
    dragStop(args) {
      // console.log('dragStop', args)
      const params = {
        id: args.data[ 0 ].id,
        station_id: getKanbanStation(this.stations, args.data[ 0 ].station_name).id,
        station_started_at: new Date(),
        updated_by: 'Meidika'
      }
    },
    onFilteredData(args) {
      this.deleteColumns()
      this.stations = [...args.stations]
      this.data = [...args.cards]
      this.createStations()
    },
    onRemoveCard() {
      if (this.selectedCard) {
        this.openDeleteModal = true
      } else {
        this.$q.notify({
          message: 'No Card selected',
          color: 'warning'
        })
      }
    },
    onRemoveCardConfirmed() {
      this.selectedCard = undefined
    },
    createStations() {
      let index = 0
      const kanbanObj = document.getElementById('kanban').ej2_instances[ 0 ]

      this.stations.forEach((element) => {
        kanbanObj.addColumn({
          allowToggle: true,
          headerText: element.name,
          keyField: element.name,
          template: 'headerSlot',
          showItemCount: true,
          showAddButton: false,
          data: element,
          // minCount: 2,
          // maxCount: 6,
        }, index)
        index++
      })
    },
    onMoveToFlow() {
      if (this.selectedCard) {
        this.cardId = this.selectedCard.id
        this.openMoveToBoardModal = true
      } else {
        this.$q.notify({
          message: 'No Card selected',
          color: 'warning'
        })
      }
    },
    onCardMoved(args) {
      this.delete(args)
    },
    onAddToFlow() {
      if (this.selectedCard) {
        this.selId = this.selectedCard.sel_id
        this.openAddToBoardModal = true
      } else {
        this.$q.notify({
          message: 'No Card selected',
          color: 'warning'
        })
      }
    },
  },
})
</script>

<style lang="scss">
  .e-kanban .e-kanban-content {
    height: 70vh;
  }
</style>
