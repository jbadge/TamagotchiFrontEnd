import React from 'react'
import Pet from '../components/Pet'
import useLoadPets from '../hooks/useLoadPets'
import CreatePetForm from '../components/PetCreateForm'
import SearchPetForm from '../components/SearchPetForm'
import { PetType } from '../types/PetsTypes'

const PetListHome = () => {
  const { pets, isPetsLoading } = useLoadPets()
  const [searchQuery, setSearchQuery] = React.useState<string>('')
  const [filteredPets, setFilteredPets] = React.useState<PetType[]>([])
  const [showDeadPets, setShowDeadPets] = React.useState<boolean>(false)
  const [sortBy, setSortBy] = React.useState<string>('default')

  // Search
  const handleSearchChange = (query: string) => {
    setSearchQuery(query)
    const filtered = pets.filter((pet) =>
      pet.name.toLowerCase().startsWith(query.toLowerCase())
    )
    setFilteredPets(
      showDeadPets ? filtered.filter((pet) => !pet.isDead) : filtered
    )
  }

  // Sort
  const handleSortChange = (criteria: string) => {
    setSortBy(criteria)

    if (criteria !== 'default') {
      const sortedPets = [...filteredPets]
      // Name
      if (criteria === 'name' || criteria === 'name-desc') {
        sortedPets.sort((currentPet, nextPet) => {
          if (currentPet.name !== undefined && nextPet.name !== undefined) {
            return criteria === 'name'
              ? // Sort by name A-Z
                currentPet.name.localeCompare(nextPet.name)
              : // Sort by name Z-A
                nextPet.name.localeCompare(currentPet.name)
          }
          return 0
        })
      }
      // Hunger Level
      if (criteria === 'hunger-level' || criteria === 'hunger-level-desc') {
        sortedPets.sort((currentPet, nextPet) => {
          if (
            currentPet.hungerLevel !== undefined &&
            nextPet.hungerLevel !== undefined
          ) {
            return criteria === 'hunger-level'
              ? // Sort by Hunger Level, ascending
                currentPet.hungerLevel - nextPet.hungerLevel
              : // Sort by Hunger Level, descending
                nextPet.hungerLevel - currentPet.hungerLevel
          }
          return 0
        })
      }
      // Happiness Level
      if (
        criteria === 'happiness-level' ||
        criteria === 'happiness-level-desc'
      ) {
        sortedPets.sort((currentPet, nextPet) => {
          if (
            currentPet.happinessLevel !== undefined &&
            nextPet.happinessLevel !== undefined
          ) {
            return criteria === 'happiness-level'
              ? // Sort by Happiness Level, ascending
                currentPet.happinessLevel - nextPet.happinessLevel
              : // Sort by Happiness Level, descending
                nextPet.happinessLevel - currentPet.happinessLevel
          }
          return 0
        })
      }
      // ID (default)
      if (criteria === 'id-asc' || criteria === 'id-desc') {
        sortedPets.sort((currentPet, nextPet) => {
          if (currentPet.id !== undefined && nextPet.id !== undefined) {
            return criteria === 'id-asc'
              ? // Sort by ID, ascending
                currentPet.id - nextPet.id
              : // Sort by ID, ascending
                nextPet.id - currentPet.id
          }
          return 0
        })
      }

      setFilteredPets(sortedPets)
    } else {
      setFilteredPets([...pets])
    }
  }

  // Toggle on/off results displaying dead pets
  const toggleFilterDeadPets = () => {
    setShowDeadPets((prevShowDeadPets) => !prevShowDeadPets)
  }

  // Updates filtered list when the search field is used
  React.useEffect(() => {
    if (!isPetsLoading) {
      let filtered = pets.filter((pet) => showDeadPets || !pet.isDead)
      if (searchQuery) {
        filtered = filtered.filter((pet) =>
          pet.name.toLowerCase().startsWith(searchQuery.toLowerCase())
        )
      }
      setFilteredPets(filtered)
    }
  }, [showDeadPets, searchQuery])

  // Initial Load
  React.useEffect(() => {
    if (!isPetsLoading) {
      setFilteredPets([...pets])
    }
  }, [pets])

  if (isPetsLoading) {
    return null
  }

  return (
    <section className="pet-list-container">
      <div className="filter-options-container">
        <div className="filter-options">
          <div className="sort-dropdown-container">
            <span className="sort-label">Sort by: </span>
            <select
              value={sortBy}
              onChange={(event) => handleSortChange(event.target.value)}
            >
              <option value="">Choose sort method</option>
              <option value="name">Name A-Z</option>
              <option value="name-desc">Name Z-A</option>
              <option value="hunger-level">Hunger Level, Ascending</option>
              <option value="hunger-level-desc">
                Hunger Level, Descending
              </option>
              <option value="happiness-level">
                Happiness Level, Ascending
              </option>
              <option value="happiness-level-desc">
                Happiness Level, Descending
              </option>
              <option value="id-asc">ID, Ascending</option>
              <option value="id-desc">ID, Descending</option>
            </select>
          </div>
          <div className="search-bar-toggle-container">
            <div className="search-bar-container">
              <SearchPetForm onSearchChange={handleSearchChange} />
            </div>
            <div className="toggle-dead-button-container">
              <button onClick={toggleFilterDeadPets}>
                {showDeadPets ? 'Hide Dead Pets' : 'Show Dead Pets'}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="list-pets">
        <div className="pets">
          <ul className={'top-level'}>
            {filteredPets
              .filter((pet) => (showDeadPets ? true : !pet.isDead))
              .map((pet) => (
                <Pet key={pet.id} pet={pet} />
              ))}
          </ul>
          <CreatePetForm />
        </div>
      </div>
    </section>
  )
}

export default PetListHome
