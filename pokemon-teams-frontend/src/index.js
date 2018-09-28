document.addEventListener("DOMContentLoaded", function() {

    const BASE_URL = "http://localhost:3000"
    const TRAINERS_URL = `${BASE_URL}/trainers`
    const POKEMONS_URL = `${BASE_URL}/pokemons`
    const mainPanel = document.querySelector("#main")

    fetch(`${TRAINERS_URL}`)
    .then(response => response.json())
    .then(trainerObjs => {
      mainPanel.innerHTML = trainerObjs.map(trainerObj => {
        let newTrainer = new Trainer(trainerObj);
        return newTrainer.render();
      }).join("")
    }).then(data => {
      allTrainers.map(trainer => {
        let trainerId = trainer.id;
        let trainerUl = document.querySelector(`#trainer-${trainerId}`)
        trainerUl.innerHTML = trainer.pokemons.map(pokemon => {
          let newPokemon = new Pokemon(pokemon);
          return newPokemon.render();
        }).join("")
      })
    })
    document.addEventListener("click", e => {
      if (e.target.className === "add-btn") {
        let trainerId = e.target.dataset.trainerId;
        let targetTrainer = allTrainers.find(trainer => trainer.id == trainerId);
        if (targetTrainer.pokemons.length < 6) {
          fetch(`${POKEMONS_URL}`, {
            method: "POST",
            headers: {
              "Accept": "application/json",
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              trainer_id: trainerId
            })
          })
          .then(r => r.json())
          .then(pokeObj => {
            let newPokemon = new Pokemon(pokeObj);
            let trainerUl = document.querySelector(`#trainer-${trainerId}`)
            trainerUl.innerHTML += newPokemon.render()
          })
        } else {
          alert("Cannot have more than 6 pokemons!")
        }
      }
      if (e.target.className === "release") {
        let pokeId = e.target.dataset.pokemonId;
        let trainerId = e.target.dataset.trainerId;
        let trainerUl = document.querySelector(`#trainer-${trainerId}`)
        fetch(`${POKEMONS_URL}/${pokeId}`, {
          method: "DELETE"
        })
        .then(r => r.json())
        .then(deletedPoke => {
          document.querySelector(`#poke-${pokeId}`).remove();
          allPokemon = allPokemon.filter(poke => poke.id != pokeId)
        })
      }
    })
});
