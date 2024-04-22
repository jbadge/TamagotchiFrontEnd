export type PetType = {
  id: number | undefined
  name: string
  birthday?: Date
  hungerLevel: number
  happinessLevel: number
  lastInteractedWithDate?: Date
  isDead: boolean
  playtimes: number[]
  feedings: number[]
  scoldings: number[]
}

export type PetProps = {
  pet: PetType
  reloadPets: () => void
}
