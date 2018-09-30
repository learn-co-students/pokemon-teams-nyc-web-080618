const Trainer = (() => {

  const allTrainers = [];

  return class {
    constructor(trainer){
      this.id = trainer.id;
      this.name = trainer.name;
      this.pokemons = trainer.pokemons;
      allTrainers.push(this)
    }

    renderInfo(){
      return `<div class="card" data-id="${this.id}"><p>${this.name}</p>
      <button data-trainer-id="${this.id}">Add Pokemon</button>
      <ul>
      ${this.pokemons.map(pokemon => `<li>${pokemon.nickname} (${pokemon.species}) <button class="release" data-pokemon-id="${pokemon.id}">Release</button></li>`).join("")}
      </ul>
    </div>`
    }

    static findById(trainerId){
      return allTrainers.find(trainer => trainer.id == trainerId)
    }
  }
})()
