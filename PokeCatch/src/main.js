import { renderPokemon, renderError, renderSuccess } from "./dom-helpers";
import { getRandomPokemon, postDiscoveredPokemon } from "./fetch-helpers"

async function getAndRenderPokemon() {
  const { data, error } = await getRandomPokemon()

  if (error) {
    renderError(error.message)
    renderSuccess('')
  } else {
    renderPokemon(data)
    renderSuccess(`${data.name} was discovered`)
    renderError('')
  }
}

getAndRenderPokemon()

const discoverButton = document.querySelector('#discover-button')
discoverButton.addEventListener('click', getAndRenderPokemon)

const captureForm = document.querySelector('#capture-form')

captureForm.addEventListener('submit', async (event) => {
  event.preventDefault()

  const formValues = Object.fromEntries(new FormData(captureForm))
  formValues.isFavorite = Boolean(formValues.isFavorite)

  const { data, error } = await postDiscoveredPokemon(formValues)

  if (error) {
    renderError('Error: unable to capture Pokémon. Please try again later')
  } else {
    renderSuccess(`${formValues.name} has been captured!`)
    captureForm.reset()
  }
})