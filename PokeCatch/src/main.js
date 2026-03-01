import { renderPokemon, renderError, renderSuccess } from "./dom-helpers";
import { getRandomPokemon } from "./fetch-helpers"

async function getAndRenderPokemon() {
  const { data, error } = await getRandomPokemon()

  if (error) {
    renderError(error)
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