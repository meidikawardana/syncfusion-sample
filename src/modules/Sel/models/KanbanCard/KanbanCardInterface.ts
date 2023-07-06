import { IModel } from 'src/app/models/ModelInterface'
import { ISelView } from 'src/modules/Sel/models/Sel/SelViewInterface'

export interface IKanbanCard extends IModel {
  sel_id: number;
  station_id: number;
  station_started_at: Date;
  updated_by: string;
  mps_view: ISelView | undefined
}
