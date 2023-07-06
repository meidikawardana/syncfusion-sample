import {
  ColumnDirective,
  ColumnsDirective,
  KanbanComponent,
  StackedHeaderDirective,
  StackedHeadersDirective,
} from '@syncfusion/ej2-vue-kanban'
import { defineComponent } from 'vue'

export default defineComponent({
  components: {
    EjsKanban: KanbanComponent,
    EColumns: ColumnsDirective,
    EColumn: ColumnDirective,
    EStackedHeader: StackedHeaderDirective,
    EStackedHeaders: StackedHeadersDirective,
  },
  data() {
    return {}
  },
})
