import React from 'react'

const Home = () => {
  return (
    <section className="list-pets">
      <div className="pets">
        <ul className="top-level">
          <li>
            <ul className="pet">
              Pet 1<li>name</li>
              <li>birthday</li>
              <li>hunger level</li>
              <li>happiness level</li>
            </ul>
          </li>
          <li>
            <ul className="pet">
              Pet 2<li>name</li>
              <li>birthday</li>
              <li>hunger level</li>
              <li>happiness level</li>
            </ul>
          </li>
          <li>
            <ul className="pet">
              Pet 3<li>name</li>
              <li>birthday</li>
              <li>hunger level</li>
              <li>happiness level</li>
            </ul>
          </li>
          <li>
            <ul className="pet">
              Pet 4<li>name</li>
              <li>birthday</li>
              <li>hunger level</li>
              <li>happiness level</li>
            </ul>
          </li>
        </ul>
      </div>
    </section>
  )
}

export default Home
