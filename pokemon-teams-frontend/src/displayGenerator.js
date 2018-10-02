class Display {

  static getInitialTrainerRender(trainer){
    var finalStringOfHTML = `<div class="card" id="${trainer.id}"><p>${trainer.name}</p>
      <button data-trainer-id="${trainer.id}">Add Pokemon</button><ul id='pokmeonlist'>`

      var pokemonsString = ""
      trainer.pokemons.forEach(function(pokemon){
        pokemonsString += `<li>Name: ${pokemon.nickname}<button class="release" data-pokemon-id="${pokemon.id}">Release</button></li>`
      })
      finalStringOfHTML = finalStringOfHTML + pokemonsString + "</ul>"
      return finalStringOfHTML
  }





}
