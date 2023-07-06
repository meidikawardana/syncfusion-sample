
export const getKanbanStation = (stations: Array<object>, name:string): object|undefined|null => {
  if (name) {
    return stations.find((element: any) => element.name === name)
  }
  return null
}
