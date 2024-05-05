import React from 'react'
import { Link, useParams } from 'react-router-dom'
import useDeletePet from '../hooks/useDeletePet'
import useLoadPet from '../hooks/useLoadPet'
import { returnNameIfPokemonName, getPokemonImages } from '../otherApi'
import usePlaytime from '../hooks/usePlaytime'
import useFeeding from '../hooks/useFeeding'
import useScolding from '../hooks/useScolding'
import useUpdatePet from '../hooks/useUpdatePet'

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
  const pictureRef = React.useRef<HTMLDivElement>(null)
  const [bannerLeft, setBannerLeft] = React.useState<string>('50%')
  const [bannerTop, setBannerTop] = React.useState<string>('0')
  const [rotation, setRotation] = React.useState<number>(0)

  // const logMousePosition = (event: MouseEvent) => {
  //   console.log('Mouse X:', event.clientX)
  //   console.log('Mouse Y:', event.clientY)
  // }

  // // Add event listeners to log mouse position when the component mounts
  // React.useEffect(() => {
  //   window.addEventListener('mousemove', logMousePosition)
  //   return () => {
  //     window.removeEventListener('mousemove', logMousePosition)
  //   }
  // }, [])

  const handleImageLoad = () => {
    if (pictureRef.current && bannerRef.current) {
      const pictureWidth = pictureRef.current.offsetWidth
      const pictureHeight = pictureRef.current.offsetHeight
      const bannerWidth = bannerRef.current.offsetWidth
      const bannerHeight = bannerRef.current.offsetHeight
      // const leftOffset = (pictureWidth - bannerWidth) / 2
      // const topOffset = pictureHeight * 0.25 - bannerHeight / 2
      // const rotation = Math.random() * 90 - 45
      // setBannerLeft(`${leftOffset}px`)
      // setBannerTop(`${topOffset}px`)
      // setRotation(rotation)
      const centerX = pictureWidth / 2
      const centerY = pictureHeight * 0.25

      const rotationAngle = (rotation * Math.PI) / 180

      const diagonal = Math.sqrt(
        bannerWidth * bannerWidth + bannerHeight * bannerHeight
      )

      const bannerTopLeftX = centerX - (diagonal / 2) * Math.cos(rotationAngle)
      const bannerTopLeftY = centerY - (diagonal / 2) * Math.sin(rotationAngle)

      const adjustedLeft =
        bannerTopLeftX - (rotationAngle < Math.PI / 2 ? 0 : bannerWidth)
      const adjustedTop =
        bannerTopLeftY - (rotationAngle < Math.PI ? 0 : bannerHeight)

      const topEdgeOffset = Math.max(0, centerY - adjustedTop)

      const topEdgeOfImageDivY = pictureRef.current.getBoundingClientRect().top

      const finalTopPosition = Math.max(
        topEdgeOfImageDivY,
        adjustedTop + topEdgeOffset
      )

      setBannerLeft(`${adjustedLeft}px`)
      setBannerTop(`${finalTopPosition}px`)
      setRotation(rotation)

      // console.log('Top edge of image:', centerY)
      // console.log('Top-left edge of banner:', bannerTopLeftY)
      const imageRect = pictureRef.current.getBoundingClientRect()
      const bannerRect = bannerRef.current.getBoundingClientRect()

      // Log the positions of the image and the banner
      console.log('Actual top edge of image:', imageRect.top)
      console.log('Actual left edge of image:', imageRect.left)
      console.log('Actual top-left edge of banner:', bannerRect.top)
      console.log('Actual left edge of banner:', bannerRect.left)
    }
  }

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

  // Check hungerlevel < 5
  React.useEffect(() => {
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

  // fetchPokemonm
  React.useEffect(() => {
    const fetchPokemon = async () => {
      const pokemonName = await returnNameIfPokemonName()

      if (pokemonName.length > 0 && pet.name) {
        const images = await getPokemonImages(pokemonName)
        images.forEach((image) => {
          if (pet.name.toLowerCase() === image.name) {
            setImage(image.picture)
          }
        })
        setImage(pet.imageUrl)
      }
      setImage(pet.imageUrl)
    }
    fetchPokemon()
  }, [pet])

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

  ///////////////////BOTTOM
  // React.useEffect(() => {
  //   if (pet && bannerRef.current) {
  //     const parentElement = bannerRef.current.parentElement
  //     if (parentElement) {
  //       const imageWidth = parentElement.offsetWidth || 0
  //       const bannerWidth = bannerRef.current.offsetWidth
  //       const rotationAngle = -20 + Math.random() * 40 // Random rotation angle between -20deg and 20deg

  //       // Calculate the translateX to center the banner
  //       const translateX = (imageWidth - bannerWidth) / 2

  //       // Get the top position of the pet-details-block
  //       const petDetailsBlockTop =
  //         parentElement
  //           .querySelector('.pet-details-block')
  //           ?.getBoundingClientRect().top || 0

  //       // Calculate the translateYAdjusted to ensure the top edge of the banner aligns with the top edge of the pet-details-block
  //       const bannerTop = bannerRef.current.getBoundingClientRect().top
  //       const translateYAdjusted = bannerTop - petDetailsBlockTop

  //       bannerRef.current.style.transform = `rotate(${rotationAngle}deg) translate(${translateX}px, ${translateYAdjusted}px)`
  //     }
  //   }
  // }, [pet])

  React.useEffect(() => {
    // Banner Stuff
    // still not working. though apparently, some of it being set to the correct position had to do with a useeffect i had not commented out, either. here is that useeffect that was somehow also
    // console.log(pet)
    // console.log(bannerRef.current?.parentElement)

    if (pet && bannerRef.current) {
      const parentElement = bannerRef.current.parentElement
      if (parentElement) {
        const imageWidth = parentElement.offsetWidth || 0
        const bannerWidth = bannerRef.current.offsetWidth
        const rotationAngle = -20 + Math.random() * 40 // Random rotation angle between -20deg and 20deg

        // Get the top position of the pet-details-block
        const petDetailsBlock = document.querySelector(
          '.pet-details-block'
        ) as HTMLElement | null
        const petDetailsBlockTop = petDetailsBlock
          ? petDetailsBlock.getBoundingClientRect().top
          : 0

        // Get the top position of the banner relative to the pet-details-block
        const bannerTopRelativeToBlock =
          bannerRef.current.getBoundingClientRect().top - petDetailsBlockTop

        // Calculate the translateY to ensure the top edge of the banner stays within the boundaries of the pet-details-block
        const translateY = -bannerTopRelativeToBlock

        // Calculate the translateX to center the banner
        const translateX = (imageWidth - bannerWidth) / 2

        bannerRef.current.style.transform = `rotate(${rotationAngle}deg) translate(${translateX}px, ${translateY}px)`
      }
    }
  }, [pet])

  if (isPetLoading) {
    return null
  }

  return (
    <section>
      {/* <div className="cross-container">
        <div className="cross"></div> */}
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
          <div className="pet-details-picture" ref={pictureRef}>
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
