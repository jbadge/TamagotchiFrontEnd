export type PetType = {
  id: number | undefined
  name: string
  birthday: string
  hungerLevel: number | undefined
  happinessLevel: number | undefined
  lastInteractedWithDate: string
  isDead: boolean
  playtimes: number[] | undefined
  feedings: number[] | undefined
  scoldings: number[] | undefined
  spriteUrl: string
  imageUrl: string
  visitorId?: string
}

export type PetProps = {
  pet: PetType
}

export const EmptyPet: PetType = {
  id: undefined,
  name: '',
  birthday: '',
  hungerLevel: undefined,
  happinessLevel: undefined,
  lastInteractedWithDate: '',
  isDead: false,
  playtimes: undefined,
  feedings: undefined,
  scoldings: undefined,
  spriteUrl: '',
  imageUrl: '',
  visitorId: '',
}

export type VisitorInfo = {
  visitorId: string
  isAdmin: boolean
}
