import { IEquipment } from 'src/modules/Config/models/Equipment/EquipmentInterface'
import EddpApi from 'src/modules/Eddp/models/EddpApi'

export default class Equipment implements IEquipment {
  readonly equipment_description: string
  readonly equipment: number
  readonly material: string
  readonly plant: string | null
  readonly serial_number: string
  readonly storage_location: string | null
  readonly status: string
  readonly superior_eq: number | null
  readonly wbs_element: string | null

  constructor(equipment: IEquipment) {
    this.equipment_description = equipment.equipment_description
    this.equipment = equipment.equipment
    this.material = equipment.material
    this.plant = equipment.plant
    this.serial_number = equipment.serial_number
    this.storage_location = equipment.storage_location
    this.status = equipment.status
    this.superior_eq = equipment.superior_eq
    this.wbs_element = equipment.wbs_element
  }

  static async find(equipment: number): Promise<Equipment> {
    const eq = await EddpApi.showEquipment(equipment) as { data: IEquipment }
    return new Equipment(eq.data)
  }
}
