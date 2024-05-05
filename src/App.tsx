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
          <div className="name">
            <h1>THE RISE OF THE</h1>
            <span className="initial">T</span>a<span className="m">m</span>agotc
            <span className="h">h</span>i{/* <h2>TAMAGOTCHI</h2> */}
          </div>
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
