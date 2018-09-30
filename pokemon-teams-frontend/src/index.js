document.addEventListener('DOMContentLoaded', function() {

const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

//step 1, get;
  fetch(TRAINERS_URL)
  .then(r => r.json())
  .then(trainerData => {
    document.getElementsByTagName('main')[0].innerHTML = trainerData.map(trainer => {
      let newTrainer = new Trainer(trainer);
      return newTrainer.renderInfo()
    }).join("")
  })

//step 2, add pokemon;
    const mainContainer = document.getElementsByTagName('main')[0];

    mainContainer.addEventListener("click", (event) => {
      if (event.target.innerText === "Add Pokemon"){
        let trainerId = event.target.parentElement.dataset.id;
        let targetTrainer = Trainer.findById(trainerId);
        if (targetTrainer.pokemons.length === 6){
          alert("You can't have more than 6 pokemons in your team")
        } else {
          fetch(POKEMONS_URL, {
            method: "POST",
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              trainer_id: trainerId
            })
          }).then(response => response.json())
          .then(pokeData => {
            event.target.parentElement.children[2].innerHTML += `<li>${pokeData.nickname} (${pokeData.species}) <button class="release" data-pokemon-id="${pokeData.id}">Release</button></li>`;
          })
        }
      }
    })

//step 3 release pokemon;
  mainContainer.addEventListener("click", (event) => {
    if (event.target.innerText === "Release"){
      let pokemonId = event.target.dataset.pokemonId;

      fetch(`http://localhost:3000/pokemons/${pokemonId}`, {
        method: "DELETE"
      }).then(response => response.json())
      .then(pokemon => {
        document.querySelector(`[data-pokemon-id="${pokemonId}"]`).parentElement.remove();
      })
    }
  })

})
