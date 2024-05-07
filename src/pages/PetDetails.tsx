import React from 'react'
import { Link, useParams } from 'react-router-dom'
import useDeletePet from '../hooks/useDeletePet'
import useLoadPet from '../hooks/useLoadPet'
import { getPokemonImage } from '../otherApi'
import usePlaytime from '../hooks/usePlaytime'
import useFeeding from '../hooks/useFeeding'
import useScolding from '../hooks/useScolding'
import useUpdatePet from '../hooks/useUpdatePet'
import { usePokemonNamesContext } from '../context/PokemonNamesContext'
import { flushSync } from 'react-dom'

const PetDetails = () => {
  const { id } = useParams() as { id: string }

  const { pet, isPetLoading, refetchPet } = useLoadPet(id)
  const deleteMutation = useDeletePet(id)
  const playtimeMutation = usePlaytime(id)
  const feedingMutation = useFeeding(id)
  const scoldingMutation = useScolding(id)

  const date = new Date(pet.birthday)
  const [image, setImage] = React.useState('')
  const [attemptFeeding, setAttemptFeeding] = React.useState(false)
  const [attemptScolding, setAttemptScolding] = React.useState(false)
  const updatingMutation = useUpdatePet(id)
  const bannerRef = React.useRef<HTMLDivElement>(null)
  const imageRef = React.useRef<HTMLDivElement>(null)
  const [bannerLeft, setBannerLeft] = React.useState<string>('50%')
  const [bannerTop, setBannerTop] = React.useState<string>('0')
  const [rotation, setRotation] = React.useState<number>(0)

  const pokemonNamesContext = usePokemonNamesContext()
  /////////////SIMPLEST AND
  // React.useEffect(() => {
  //   if (bannerRef.current && pet) {
  //     const imageWidth = bannerRef.current.parentElement?.offsetWidth || 0
  //     const bannerWidth = bannerRef.current.offsetWidth
  //     const rotationAngle = -20 + Math.random() * 40 // Random rotation angle between -20deg and 20deg
  //     const translateX = (imageWidth - bannerWidth) / 2

  //     bannerRef.current.style.transform = `rotate(${rotationAngle}deg) translateX(${translateX}px)`
  //   }
  // }, [pet])

  const handleFeedClick = async () => {
    try {
      if (pet!.hungerLevel! <= 5) {
        setAttemptFeeding(true)
      }
    } catch (error) {
      console.error('Error feeding pet:', error)
    }
    await feedingMutation.mutateAsync()
    refetchPet()
  }

  const handleScoldClick = async () => {
    try {
      if (pet!.happinessLevel! <= 4) {
        setAttemptScolding(true)

        updatingMutation.mutate(!pet.isDead)
      }
    } catch (error) {
      console.error('Error scolding pet:', error)
    }
    await scoldingMutation.mutateAsync()
    refetchPet()
  }

  React.useEffect(() => {
    // Check hungerlevel < 5
    if (pet.hungerLevel !== undefined && pet.hungerLevel > 5) {
      setAttemptFeeding(false)
    }
    // if (
    //   pet.id !== undefined &&
    //   pet.happinessLevel !== undefined &&
    //   pet.happinessLevel < 0
    // ) {
    //   console.log(pet)
    //   // updatingMutation.mutate()
    //   // need to send whole pet object + thing to be changed
    // }
  }, [pet])

  React.useEffect(() => {
    // fetch Pokemon
    const fetchPokemon = async () => {
      const name = pet.name.toLowerCase()
      const petIsPokemon: boolean =
        pokemonNamesContext.pokemonNames.includes(name)

      if (petIsPokemon && pet.name) {
        const images = await getPokemonImage(pet.name)
        setImage(images.picture)
      }
      setImage(pet.imageUrl)
    }
    fetchPokemon()
  }, [pet])

  const handleImageLoad = () => {
    if (imageRef.current && bannerRef.current) {
      const imageWidth = imageRef.current.offsetWidth
      const imageHeight = imageRef.current.offsetHeight
      const bannerWidth1 = bannerRef.current.offsetWidth
      const bannerHeight = bannerRef.current.offsetHeight

      // Random rotation angle between -20deg and 20deg
      const rotationAngle =
        (Math.random() < 0.5 ? 1 : -1) * (10 + Math.random() * 10)

      // Calculate the positioning for the banner
      // Position the banner at 10% of the image height from the top
      const bannerTop1 = imageHeight - bannerHeight
      const bannerTop =
        Math.abs(rotationAngle) > 10 && Math.abs(rotationAngle) < 12
          ? imageHeight - bannerTop1 - 15
          : imageHeight - bannerTop1
      const b = imageWidth
      console.log('rotationAngle', rotationAngle)
      const cosA = Math.cos(rotationAngle)
      const bannerWidth = imageWidth / cosA
      const bannerLeft = rotationAngle > 0 ? 10 : -10 // Center the banner horizontally
      console.log('A', rotationAngle, 'cos(A)', cosA)
      const c = b / cosA
      const absC = Math.abs(b / cosA)
      const a = Math.sqrt(c * c - b * b)
      console.log('b', b)
      console.log('c', c)
      console.log('a', a)
      console.log('absolute val c', absC)
      console.log('halfsies', c / 2 - a)
      // Set the rotation and positioning for the banner
      setBannerLeft(`${bannerLeft}px`)
      setBannerTop(`${bannerTop}px`)
      setRotation(rotationAngle)
      console.log('bannerRef', bannerRef)
      console.log('imageWidth', imageWidth)
      console.log('imageHeight', imageHeight)
      console.log('bannerWidth1', bannerWidth1)
      console.log('bannerWidth', bannerWidth)

      console.log('bannerHeight', bannerHeight)
      // console.log('rotationAngle', rotationAngle)
      // console.log('bannerLeft', bannerLeft)
      console.log('bannerTop', bannerTop)
    }
  }

  // React.useEffect(() => {
  //   console.log('bannerRef', bannerRef)
  //   console.log('bannerLeft', bannerLeft)
  //   console.log('bannerTop', bannerTop)
  // }, [bannerTop, bannerLeft])

  React.useEffect(() => {
    // Trigger handleImageLoad when the image and banner are loaded
    handleImageLoad()
  }, [imageRef, bannerRef]) // Update when pictureRef, bannerRef, or rotation changes

  // hdujha
  // const handleImageLoad = () => {
  //   if (pictureRef.current && bannerRef.current) {
  //     const pictureWidth = pictureRef.current.offsetWidth
  //     const pictureHeight = pictureRef.current.offsetHeight
  //     const bannerWidth = bannerRef.current.offsetWidth
  //     const bannerHeight = bannerRef.current.offsetHeight
  //     const centerX = pictureWidth / 2
  //     const centerY = pictureHeight * 0.25
  //     const rotationAngle = (rotation * Math.PI) / 180
  //     const diagonal = Math.sqrt(
  //       bannerWidth * bannerWidth + bannerHeight * bannerHeight
  //     )
  //     const bannerTopLeftX = centerX - (diagonal / 2) * Math.cos(rotationAngle)
  //     const bannerTopLeftY = centerY - (diagonal / 2) * Math.sin(rotationAngle)
  //     const adjustedLeft =
  //       bannerTopLeftX - (rotationAngle < Math.PI / 2 ? 0 : bannerWidth)
  //     const adjustedTop =
  //       bannerTopLeftY - (rotationAngle < Math.PI ? 0 : bannerHeight)
  //     const topEdgeOffset = Math.max(0, centerY - adjustedTop)
  //     const topEdgeOfImageDivY = pictureRef.current.getBoundingClientRect().top
  //     const finalTopPosition = Math.max(
  //       topEdgeOfImageDivY,
  //       adjustedTop + topEdgeOffset
  //     )

  //     setBannerLeft(`${adjustedLeft}px`)
  //     setBannerTop(`${finalTopPosition}px`)
  //     setRotation(rotation)
  //   }
  // }

  // React.useEffect(() => {
  //   // Banner Stuff
  //   if (pet && bannerRef.current) {
  //     const parentElement = bannerRef.current.parentElement
  //     if (parentElement) {
  //       const imageWidth = parentElement.offsetWidth || 0
  //       const bannerWidth = bannerRef.current.offsetWidth
  //       const rotationAngle = -20 + Math.random() * 40
  //       const petDetailsBlock = document.querySelector(
  //         '.pet-details-block'
  //       ) as HTMLElement | null
  //       const petDetailsBlockTop = petDetailsBlock
  //         ? petDetailsBlock.getBoundingClientRect().top
  //         : 0
  //       const bannerTopRelativeToBlock =
  //         bannerRef.current.getBoundingClientRect().top - petDetailsBlockTop
  //       const translateX = (imageWidth - bannerWidth) / 2
  //       const translateY = -bannerTopRelativeToBlock
  //       bannerRef.current.style.transform = `rotate(${rotationAngle}deg) translate(${translateX}px, ${translateY}px)`
  //     }
  //   }
  // }, [pet])

  if (isPetLoading) {
    return null
  }

  return (
    <section>
      <div className="pet-container">
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
            {/* <li className="is-active">
              <Link to={`/${params.category}`}>{categoryItem.title}</Link>
            </li> */}
          </ul>
        </nav>
        <div className="pet-details-name">{pet.name}</div>
        <div className="pet-details-block">
          {/* <div className="pet-details-picture">
            <img src={image} alt={`Picture of ${pet.name}`} />
            {pet.isDead && (
              <div ref={bannerRef} className="deceased-banner">
              <div
                ref={bannerRef}
                className="deceased-banner"
                style={{
                  transform: `rotate(${Math.random() * 360}deg)`,
                  // Adjust the positioning based on rotation
                  left: '50%',
                  top: '50%',
                  transformOrigin: 'top left',
                }}
              >
              <div
                ref={bannerRef}
                className="deceased-banner"
                style={{
                  transform: `rotate(${Math.random() * 360}deg)`,
                  // Adjust the positioning based on rotation
                  left: '50%',
                  top: '50%',
                  transformOrigin: 'top left',
                  // Center the banner horizontally within the image
                  marginLeft: '-50%',
                }}
              > */}
          <div className="pet-details-picture" ref={imageRef}>
            <img
              src={image}
              alt={`Picture of ${pet.name}`}
              onLoad={handleImageLoad}
            />
            {pet.isDead && (
              <div
                ref={bannerRef}
                className="deceased-banner"
                style={{
                  transform: `rotate(${rotation}deg)`,
                  // Adjust the positioning based on rotation
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
                {attemptScolding && (
                  <div className="happiness-message">
                    {pet.name} has died from sadness & depression!
                  </div>
                )}
              </li>
            </ul>
          </div>
        </div>
        <div className="actions">
          <div
            className="buttons-container"
            // "btn-group"
          >
            <div className="button-text play">Play</div>
            <button
              id="play"
              className="left button"
              onClick={() => {
                playtimeMutation.mutate()
              }}
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
    </section>
  )
}

export default PetDetails
