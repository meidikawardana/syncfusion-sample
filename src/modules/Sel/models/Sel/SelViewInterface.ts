import { ISel } from 'src/modules/Sel/models/Sel/SelInterface'

export interface ISelView extends ISel {
  scope_id: number | undefined
  serial_number: string | null
  equipment_pn: string | null
  serial_status: string | null
  plant: string | null
  sloc: string | null
  superior_eq: number | null

  basic_finish_date: Date | null
  service_order_status: string | null
  part_criticality: string | null

  tasklist_id: number | null
  project_configuration: boolean | null
  ewaa_cost: number | null | undefined
  mylb_cost: number | null | undefined

  open_notifications_count: number | null
  andon_names: string | null

  order: number | undefined
  sel_header_id: number | undefined
  category_id: number | undefined
  pn: string | undefined | null
  description: string | undefined | null
  quantity: number | undefined | null
  srp_id: number | undefined | null
  work_instruction: string | undefined | null
  release_status_id: number | undefined | null
  comments: string | undefined | null
  equipment: number | undefined | null
  ownership_id: number | undefined | null
  need_date: Date | undefined | null
  wbs: string | undefined | null
  execution_status_id: number | undefined | null
  flag: string | undefined | null
  where_used: string | undefined | null
  service_order: number | undefined | null
  updated_by: string | undefined | null
  planned_year: number | undefined | null
  planned_week: number | undefined | null
  etm: number | undefined | null
  etm_item: number | undefined | null
  sales_order: string | undefined | null
  client_pn: string | undefined | null
  custom1: string | undefined | null
  custom2: string | undefined | null
}
