import React from 'react'
import { PetProps } from '../types/PetsTypes'
import { Link } from 'react-router-dom'

const Pet = ({
  pet: { id, name, birthday, hungerLevel, happinessLevel, isDead, spriteUrl },
}: PetProps) => {
  const bannerRef = React.useRef<HTMLDivElement>(null)
  const spriteRef = React.useRef<HTMLImageElement>(null)
  const date = new Date(birthday)

  const [bannerLeft, setBannerLeft] = React.useState<string>('50%')
  const [bannerTop, setBannerTop] = React.useState<string>('0')
  const [rotation, setRotation] = React.useState<number>(0)

  // Deceased Banner
  const handleImageLoad = () => {
    if (spriteRef.current && bannerRef.current) {
      const spriteWidth = spriteRef.current.offsetWidth
      const bannerWidth = bannerRef.current.offsetWidth
      const spriteHeight = spriteRef.current.offsetHeight
      const bannerHeight = bannerRef.current.offsetHeight
      const rotationAngle =
        (Math.random() < 0.5 ? 1 : -1) * (10 + Math.random() * 10)

      const bannerLeft =
        rotationAngle < 0
          ? (spriteWidth - bannerWidth) / 2 - 5
          : (spriteWidth - bannerWidth) / 2 + 5

      const bannerTop =
        Math.abs(rotationAngle) > 10 && Math.abs(rotationAngle) < 12
          ? spriteHeight - (spriteHeight - bannerHeight) - 35
          : spriteHeight - (spriteHeight - bannerHeight) - 35

      setBannerLeft(`${bannerLeft}px`)
      setBannerTop(`${bannerTop}px`)
      setRotation(rotationAngle)
    }
  }

  React.useEffect(() => {
    handleImageLoad()
  }, [isDead])

  return (
    <li key={id} className="pet">
      <div className="image-container">
        <Link to={`/pets/${id}`}>
          <img
            ref={spriteRef}
            src={spriteUrl}
            alt={`Sprite of ${name}`}
            onLoad={handleImageLoad}
          />
          {isDead && (
            <div
              ref={bannerRef}
              className="deceased-banner-sprite"
              style={{
                transform: `rotate(${rotation}deg)`,
                left: bannerLeft,
                top: bannerTop,
              }}
            >
              Deceased
            </div>
          )}
        </Link>
      </div>
      <ul className="pet-list-pet-details">
        <li>
          <Link to={`/pets/${id}`}>{name}</Link>
        </li>
        <li>
          Birthday:
          {`${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`}
        </li>
        <li>Hunger Level: {hungerLevel}</li>
        <li>Happiness Level: {happinessLevel}</li>
      </ul>
    </li>
  )
}

export default Pet
