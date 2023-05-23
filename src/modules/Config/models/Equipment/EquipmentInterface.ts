export interface IEquipment {
    readonly equipment: number
    readonly serial_number: string
    readonly material: string
    readonly equipment_description: string
    readonly status: string
    readonly plant: string | null
    readonly storage_location: string | null
    readonly superior_eq: number | null
    readonly wbs_element: string | null
}
