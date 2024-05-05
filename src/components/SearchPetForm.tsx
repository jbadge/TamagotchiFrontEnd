import React from 'react'

interface SearchPetFormProps {
  onSearchChange: (_query: string) => void
}

const SearchPetForm: React.FC<SearchPetFormProps> = ({ onSearchChange }) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value
    onSearchChange(query)
  }

  return (
    <div className="search-input-container">
      <div className="search-input-wrapper">
        <input
          type="text"
          id="search-input"
          placeholder="Search pets..."
          onChange={handleChange}
        />
        <button type="submit">Search</button>
      </div>
      <div id="search-results"></div>
    </div>
  )
}

export default SearchPetForm
