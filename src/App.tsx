import React from 'react'
import { Route, Routes } from 'react-router'
import PetListHome from './pages/PetListHome'
import PetPage from './pages/PetPage'

export function App() {
  return (
    <div className="app">
      <header>
        <h1>The Rise of the Tamagotchi</h1>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<PetListHome />} />
          <Route path="/pets/:id" element={<PetPage />} />
          <Route path="*" element={<p>404 - PET NOT FOUND!</p>} />
        </Routes>
      </main>
      {/* <footer>
        <section className="add-new-pet">
          <form>
            <label htmlFor="petname">Pet Name:</label>
            <input form="text" id="petname" name="petname" />
            <input type="submit" value="Create"></input>
          </form>
        </section>
      </footer> */}
    </div>
  )
}
