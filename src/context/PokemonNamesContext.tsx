import React from 'react'
import { getAllPokemon } from '../otherApi'

export type PokemonNamesContextType = {
  pokemonNames: string[]
  setPokemonNames: React.Dispatch<React.SetStateAction<string[]>>
}

export const PokemonNamesContext = React.createContext<PokemonNamesContextType>(
  {
    pokemonNames: [],
    setPokemonNames: () => {},
  }
)

type Props = {
  children: React.ReactNode
}

export const PokemonNamesContextProvider = ({ children }: Props) => {
  const [pokemonNames, setPokemonNames] = React.useState<string[]>([])

  React.useEffect(() => {
    const fetchStaticData = async () => {
      const names = await getAllPokemon()
      setPokemonNames(names)
    }
    fetchStaticData()
  }, [])

  const contextValue = { pokemonNames, setPokemonNames }

  return (
    <PokemonNamesContext.Provider value={contextValue}>
      {children}
    </PokemonNamesContext.Provider>
  )
}

export const usePokemonNamesContext = () => {
  const pokemonNamesContext = React.useContext(PokemonNamesContext)

  if (!pokemonNamesContext) {
    throw new Error('You need to use this context inside a Provider')
  }
  return pokemonNamesContext
}
