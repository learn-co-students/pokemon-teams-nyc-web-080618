allPokemon = [];
class Pokemon {
  constructor(pokemonObj){
    this.id = pokemonObj.id;
    this.nickname = pokemonObj.nickname;
    this.species = pokemonObj.species;
    this.trainer_id = pokemonObj.trainer_id;
    allPokemon.push(this);
  }

  render(){
    return `
    <li id="poke-${this.id}">${this.nickname} (${this.species}) <button class="release" data-pokemon-id="${this.id}" data-trainer-id="${this.trainer_id}">Release</button>
    </li>
    `
  }
}
