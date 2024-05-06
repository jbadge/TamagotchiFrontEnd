import React from 'react'
import Pet from '../components/Pet'
import useLoadPets from '../hooks/useLoadPets'
import CreatePetForm from '../components/PetCreateForm'
import SearchPetForm from '../components/SearchPetForm'
import { PetType } from '../types/PetsTypes'

const PetListHome = () => {
  const { pets } = useLoadPets()
  const [searchQuery, setSearchQuery] = React.useState<string>('')
  const [filteredPets, setFilteredPets] = React.useState<PetType[]>(pets)
  const [filterDeadPets, setFilterDeadPets] = React.useState<boolean>(false)
  const [sortBy, setSortBy] = React.useState<string>('name')

  // Search
  const handleSearchChange = (query: string) => {
    setSearchQuery(query)
    if (query === '') {
      setFilteredPets(pets)
    } else {
      const results = pets.filter((pet) =>
        pet.name.toLowerCase().startsWith(searchQuery.toLowerCase())
      )
      setFilteredPets(results)

      const filtered = pets.filter((pet) =>
        pet.name.toLowerCase().startsWith(query.toLowerCase())
      )
      setFilteredPets(
        filterDeadPets ? filtered.filter((pet) => !pet.isDead) : filtered
      )
    }
  }

  // Sort
  const handleSortChange = (criteria: string) => {
    setSortBy(criteria)
    const sortedPets = [...filteredPets]
    // Name
    if (criteria === 'name') {
      // Sort by name A-Z
      sortedPets.sort((currentPet, nextPet) =>
        currentPet.name.localeCompare(nextPet.name)
      )
    } else if (criteria === 'name-desc') {
      // Sort by name Z-A
      sortedPets.sort((currentPet, nextPet) =>
        nextPet.name.localeCompare(currentPet.name)
      )
    }
    // Hunger Level
    if (criteria === 'hunger-level' || criteria === 'hunger-level-desc') {
      // Sort by Happiness Level, ascending
      sortedPets.sort((currentPet, nextPet) => {
        if (
          currentPet.hungerLevel !== undefined &&
          nextPet.hungerLevel !== undefined
        ) {
          return criteria === 'hunger-level'
            ? currentPet.hungerLevel - nextPet.hungerLevel
            : nextPet.hungerLevel - currentPet.hungerLevel
        }
        return 0
      })
    }
    // Happiness Level
    if (criteria === 'happiness-level' || criteria === 'happiness-level-desc') {
      // Sort by Happiness Level, ascending
      sortedPets.sort((currentPet, nextPet) => {
        if (
          currentPet.happinessLevel !== undefined &&
          nextPet.happinessLevel !== undefined
        ) {
          return criteria === 'happiness-level'
            ? currentPet.happinessLevel - nextPet.happinessLevel
            : nextPet.happinessLevel - currentPet.happinessLevel
        }
        return 0
      })
    }
    // } else if (criteria === 'happiness-level-desc') {
    //   // Sort by Happiness Level, descending
    //   sortedPets.sort(
    //     (currentPet, nextPet) => nextPet.happinessLevel - currentPet.happinessLevel
    //   )
    // }
    setFilteredPets(sortedPets)
  }

  // Toggle on/off results displaying dead pets
  const toggleShowDeadPets = () => {
    setFilterDeadPets((prevFilterDeadPets) => !prevFilterDeadPets)
  }

  // Updates filtered list when toggle is pushed
  // React.useEffect(() => {
  //   // console.log('Pets:', pets)
  //   const filtered = filterDeadPets ? pets.filter((pet) => !pet.isDead) : pets
  //   setFilteredPets(filtered)
  //   // setFilteredPets(pets)
  //   // setFilteredPets(pets.filter((pet) => !filterDeadPets || !pet.isDead))
  // }, [pets, filterDeadPets])

  // Updates filtered list when the search field is used
  React.useEffect(() => {
    let filtered = pets.filter((pet) => !filterDeadPets || !pet.isDead)
    if (searchQuery) {
      filtered = filtered.filter((pet) =>
        pet.name.toLowerCase().startsWith(searchQuery.toLowerCase())
      )
    }
    setFilteredPets(filtered)
  }, [pets, filterDeadPets, searchQuery])

  return (
    <section className="pet-list-container">
      <div className="filter-options-container">
        <div className="filter-options">
          <div className="search-bar-toggle-container">
            <div className="search-bar-container">
              <SearchPetForm onSearchChange={handleSearchChange} />
            </div>
            <div className="toggle-dead-button-container">
              {/* Use the toggleShowDeadPets function */}
              <button onClick={toggleShowDeadPets}>
                {filterDeadPets ? 'Hide Dead Pets' : 'Show Dead Pets'}
              </button>
            </div>
          </div>
          <div className="sort-dropdown-container">
            Sort by:{' '}
            <select
              value={sortBy}
              onChange={(event) => handleSortChange(event.target.value)}
            >
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
            </select>
          </div>
        </div>
      </div>
      <div className="list-pets">
        <div className="pets">
          <ul className={'top-level'}>
            {/* Use showDeadPets state to conditionally render pets */}
            {pets
              .filter((pet) => (filterDeadPets ? true : !pet.isDead))
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

//   return (
//     <section className="pet-list-container">
//       <div className="filter-options-container">
//         <div className="filter-options">
//           <div className="search-bar-toggle-container">
//             <div className="search-bar-container">
//               <SearchPetForm onSearchChange={handleSearchChange} />
//             </div>
//             <div className="toggle-dead-button-container">
//               <button onClick={toggleDead}>
//                 {filterDeadPets ? 'Hide Dead Pets' : 'Show Dead Pets'}
//               </button>
//             </div>
//           </div>
//           <div className="sort-dropdown-container">
//             Sort by:{' '}
//             <select
//               value={sortBy}
//               onChange={(event) => handleSortChange(event.target.value)}
//             >
//               <option value="name">Name A-Z</option>
//               <option value="name-desc">Name Z-A</option>
//               <option value="hunger-level">Hunger Level, Ascending</option>
//               <option value="hunger-level-desc">
//                 Hunger Level, Descending
//               </option>
//               <option value="happiness-level">
//                 Happiness Level, Ascending
//               </option>
//               <option value="happiness-level-desc">
//                 Happiness Level, Descending
//               </option>
//             </select>
//           </div>
//         </div>
//       </div>
//       <div className="list-pets">
//         <div className="pets">
//           <ul className={'top-level'}>
//             {/* Use filteredPets based on filterDeadPets state */}
//             {pets
//               .filter((pet) => (filterDeadPets ? true : !pet.isDead))
//               .map((pet) => (
//                 <Pet key={pet.id} pet={pet} />
//               ))}
//           </ul>
//           <CreatePetForm />
//         </div>
//       </div>
//     </section>
//   )
// }

//   return (
//     <section className="pet-list-container">
//       <div className="filter-options-container">
//         <div className="filter-options">
//           <div className="search-bar-toggle-container">
//             <div className="search-bar-container">
//               <SearchPetForm onSearchChange={handleSearchChange} />
//             </div>
//             <div className="toggle-dead-button-container">
//               <button onClick={toggleDead}>
//                 {filterDeadPets ? 'Hide Dead Pets' : 'Show Dead Pets'}
//               </button>
//             </div>
//           </div>
//           <div className="sort-dropdown-container">
//             Sort by:{' '}
//             <select
//               value={sortBy}
//               onChange={(event) => handleSortChange(event.target.value)}
//             >
//               <option value="name">Name A-Z</option>
//               <option value="name-desc">Name Z-A</option>
//               <option value="hunger-level">Hunger Level, Ascending</option>
//               <option value="hunger-level-desc">
//                 Hunger Level, Descending
//               </option>
//               <option value="happiness-level">
//                 Happiness Level, Ascending
//               </option>
//               <option value="happiness-level-desc">
//                 Happiness Level, Descending
//               </option>
//             </select>
//           </div>
//         </div>
//       </div>
//       {/* </div>
//       </div> */}
//       <div className="list-pets">
//         <div className="pets">
//           <ul className={'top-level'}>
//             {filteredPets.map((pet) => (
//               <Pet key={pet.id} pet={pet} />
//             ))}
//           </ul>
//           <CreatePetForm />
//         </div>
//       </div>
//     </section>
//   )
// }

export default PetListHome
