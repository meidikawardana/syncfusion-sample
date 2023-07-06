import { IModel } from 'src/app/models/ModelInterface'
import { ISep } from 'src/modules/Sep/models/Sep/SepInterface'

export interface ISelHeader extends IModel {
  sep_id: number | undefined
  scope_id: number | undefined
  etm: number[] | undefined | null
  description: string | undefined
  delivery_planner_id: number | null | undefined
  phase_id: number | null | undefined
  service_base_id: number | null | undefined
  sep: undefined | null | ISep
  workshop_hours: null | undefined
  wbs: null | undefined
  comments: null | undefined
  start_date: Date | undefined | null
  finish_date: Date | undefined | null
  status_id: number | undefined
  created_by: string | undefined
  updated_by: string | undefined
}
