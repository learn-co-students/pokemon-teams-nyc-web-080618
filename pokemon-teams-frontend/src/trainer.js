const allTrainers = []
class Trainer {
  constructor({
    id,
    name,
    pokemons
  }) {
    this.id = id
    this.name = name
    this.pokemons = pokemons.map(pokemon => new Pokemon(pokemon))
    allTrainers.push(this)
  }

  renderCard(){
    return `<div class="card" data-id="${this.id}"><p>${this.name}</p>
  <button id='add-pokemon' data-trainer-id="${this.id}">Add Pokemon</button>
  <ul id='list'>
    ${this.pokemons.map( pokemon => {
      return `<li>${pokemon.nickname} (${pokemon.species}) <button class="release" data-pokemon-id="${pokemon.id}">Release</button></li>`
    }).join('')}
  </ul></div>
  `
  }
}
