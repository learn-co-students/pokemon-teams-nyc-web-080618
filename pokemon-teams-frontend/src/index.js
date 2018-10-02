

const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`


const trainerContainmentObject = document.getElementById('pokemonContainerObject')


fetch(TRAINERS_URL) // initial fetch
  .then(resp => resp.json())
  .then(function(response){
    response.forEach(function(trainer){
      trainerContainmentObject.innerHTML += Display.getInitialTrainerRender(trainer)
    })
  })

document.addEventListener("click", (event) => {
const listOfPokemon= document.getElementById('pokmeonlist')


  if(event.target.innerText === "Add Pokemon"){

    fetch(POKEMONS_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        trainer_id: event.target.dataset.trainerId
      })
    }).then(resp => resp.json())
    .then(function(response){
      const specificPokemonContainer = document.getElementById(`${event.target.dataset.trainerId}`)
      specificPokemonContainer.innerHTML += `<li>Name: ${response.nickname}<button class="release" data-pokemon-id="${response.id}">Release</button></li>`
    })
  }

  if(event.target.innerText === "Release"){
    fetch(POKEMONS_URL, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        trainer_id: event.target.dataset.trainerId
      })
    }).then(resp => resp.json())
  }


})
