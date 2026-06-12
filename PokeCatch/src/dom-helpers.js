const renderPokemon = (pokemonObj) => {
  const ul = document.querySelector(`#discovered-list`)

  const name = document.createElement('p')
  const types = document.createElement('p')
  const li = document.createElement('li')
  const sprite = document.createElement('img')

  types.textContent = pokemonObj.types
  name.textContent = pokemonObj.name
  sprite.src = pokemonObj.sprite

  li.appendChild(name)
  li.appendChild(types)
  li.appendChild(sprite)
  ul.appendChild(li)

}

const renderError = (msg) => {
  const error = document.querySelector('#error')
  error.textContent = msg
}

const renderSuccess = (msg) => {
  const success = document.querySelector('#success')
  success.textContent = msg
}

export { renderPokemon, renderError, renderSuccess }

