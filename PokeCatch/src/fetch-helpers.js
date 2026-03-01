export async function getRandomPokemon() {
    try {
        const randomId = Math.floor(Math.random() * 150) + 1
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`)

        if (!response.ok) {
            throw Error(`Failed to retrieve pokemon! ${response.status} ${response.statusText}`)
        }
        const responseData = await response.json()

        const pokemonObj = {
            name: responseData.name,
            types: responseData.types.map(t => t.type.name).join(', '),
            sprite: responseData.sprites.front_default
        }

        return { data: pokemonObj, error: null }
    }
    catch (error) {
        console.warn(`Error caught`, error)
        return { data: null, error: error }
    }
}

async function postDiscoveredPokemon(formData) {

    try {
        const response = await fetch('https://formspree.io/f/mnjbypzb', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(formData)
        });
        if (!response.ok) {
            throw Error(`Failed to get data ${response.status} ${response.statusText}`)
        }
        const responseData = await response.json()

        return { data: responseData, error: null }
    }
    catch (error) {
        console.warn(`Error caught`, error)
        return { data: null, error: error }
    }
}

export { getRandomPokemon, postDiscoveredPokemon }