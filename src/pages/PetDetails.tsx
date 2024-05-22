import React from 'react'
import { Link, useParams } from 'react-router-dom'
import useDeletePet from '../hooks/useDeletePet'
import useLoadPet from '../hooks/useLoadPet'
import usePlaytime from '../hooks/usePlaytime'
import useFeeding from '../hooks/useFeeding'
import useScolding from '../hooks/useScolding'
import useUpdatePet from '../hooks/useUpdatePet'

const PetDetails = () => {
  const { id } = useParams() as { id: string }
  const { pet, isPetLoading, refetchPet } = useLoadPet(id)
  const date = new Date(pet.birthday)

  const deleteMutation = useDeletePet(id)
  const playtimeMutation = usePlaytime(id)
  const feedingMutation = useFeeding(id)
  const scoldingMutation = useScolding(id)
  const updatingMutation = useUpdatePet(id)

  const [attemptFeeding, setAttemptFeeding] = React.useState(false)

  const bannerRef = React.useRef<HTMLDivElement>(null)
  const imageRef = React.useRef<HTMLImageElement>(null)
  const [bannerLeft, setBannerLeft] = React.useState<string>('50%')
  const [bannerTop, setBannerTop] = React.useState<string>('0')
  const [rotation, setRotation] = React.useState<number>(0)

  // Play Button
  const handlePlayClick = async () => {
    if (!pet.isDead) {
      try {
        setAttemptFeeding(false)
      } catch (error) {
        console.error('Error playing with pet:', error)
      }
      await playtimeMutation.mutateAsync()
      refetchPet()
    }
  }

  // Feed Button
  const handleFeedClick = async () => {
    if (!pet.isDead) {
      try {
        if (pet!.hungerLevel! <= 5) {
          setAttemptFeeding(true)
          return
        }
      } catch (error) {
        console.error('Error feeding pet:', error)
      }
      await feedingMutation.mutateAsync()
      refetchPet()
    }
  }

  // Scold Button
  const handleScoldClick = async () => {
    if (!pet.isDead) {
      try {
        await scoldingMutation.mutateAsync()
        if (pet!.happinessLevel! <= 4) {
          updatingMutation.mutate(!pet.isDead)
        }
      } catch (error) {
        console.error('Error scolding pet:', error)
      }
      refetchPet()
    }
  }

  // Deceased Banner
  const handleImageLoad = () => {
    if (imageRef.current && bannerRef.current) {
      const imageHeight = imageRef.current.offsetHeight
      const bannerHeight = bannerRef.current.offsetHeight
      const rotationAngle =
        (Math.random() < 0.5 ? 1 : -1) * (10 + Math.random() * 5)
      const bannerTop =
        Math.abs(rotationAngle) > 10 && Math.abs(rotationAngle) < 12
          ? imageHeight - (imageHeight - bannerHeight) - 25
          : imageHeight - (imageHeight - bannerHeight) - 20
      const bannerLeft = rotationAngle > 0 ? 10 : -10

      setBannerLeft(`${bannerLeft}px`)
      setBannerTop(`${bannerTop}px`)
      setRotation(rotationAngle)
    }
  }

  React.useEffect(() => {
    handleImageLoad()
    const buttonsContainer = document.querySelector('.buttons-container')
    if (buttonsContainer) {
      const buttons = buttonsContainer.querySelectorAll('button')
      buttons.forEach((button) => {
        button.disabled = true
      })
    }
  }, [pet.isDead])

  if (isPetLoading) {
    return null
  }

  return (
    <section>
      <div className="pet-details-container">
        <nav className="breadcrumb" aria-label="breadcrumbs">
          <ul>
            <li>
              <Link to="/">
                <span className="icon">
                  <i className="fa fa-home" aria-hidden="true" />
                </span>
                <span>Home</span>
              </Link>
            </li>
          </ul>
        </nav>
        <div className="pet-details-pet-container">
          <div className="pet-details-name">{pet.name}</div>
          <div className="pet-details-inner">
            <div className="pet-details-block">
              <div className="pet-details-picture" ref={imageRef}>
                <img
                  ref={imageRef}
                  src={pet.imageUrl}
                  alt={`Picture of ${pet.name}`}
                  onLoad={handleImageLoad}
                />
                {pet.isDead && (
                  <div
                    ref={bannerRef}
                    className="deceased-banner"
                    style={{
                      transform: `rotate(${rotation}deg)`,
                      left: bannerLeft,
                      top: bannerTop,
                    }}
                  >
                    Deceased
                  </div>
                )}
              </div>
              <div className="pet-details-info">
                <ul>
                  <li>
                    Birthday:{' '}
                    {`${date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}`}
                  </li>
                  {pet.hungerLevel !== undefined && (
                    <li className="hunger-level">
                      <div>Hunger Level: {pet.hungerLevel}</div>
                      {attemptFeeding && (
                        <div className="hunger-message">
                          {pet.name} is not hungry enough to eat!
                        </div>
                      )}
                    </li>
                  )}
                  <li className="happiness-level">
                    <div>Happiness Level: {pet.happinessLevel}</div>
                    {pet.isDead && (
                      <div className="happiness-message">
                        {pet.name} has died from sadness &{' '}
                        <span className="break-point">depression!</span>
                      </div>
                    )}
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="actions">
            <div className="buttons-container">
              <div className="button-text play">Play</div>
              <button
                id="play"
                className="left button"
                onClick={handlePlayClick}
              ></button>
              <div className="button-text feed">Feed</div>
              <button
                id="feed"
                className="middle button"
                onClick={handleFeedClick}
              ></button>
              <div className="button-text scold">Scold</div>
              <button
                id="scold"
                className="right button"
                onClick={handleScoldClick}
              ></button>
            </div>
            <div className="delete-button-container">
              <div className="button-text">Delete</div>
              <button
                id="deleted"
                className="bottom button"
                onClick={function () {
                  deleteMutation.mutate()
                }}
              ></button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default PetDetails
