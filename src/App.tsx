import React from 'react'
import { Route, Routes } from 'react-router'
import PetListHome from './pages/PetListHome'
import PetDetails from './pages/PetDetails'
import { PokemonNamesContextProvider } from './context/PokemonNamesContext'

export function App() {
  return (
    <PokemonNamesContextProvider>
      <div className="app">
        <header>
          <h1>THE RISE OF THE</h1>
          <h2>TAMAGOTCHI</h2>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<PetListHome />} />
            <Route path="/pets/:id" element={<PetDetails />} />
            <Route path="*" element={<p>404 - PET NOT FOUND!</p>} />
          </Routes>
        </main>
      </div>
    </PokemonNamesContextProvider>
  )
}
