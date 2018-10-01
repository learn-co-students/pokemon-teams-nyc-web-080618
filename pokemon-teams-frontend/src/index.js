const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
const main = document.querySelector('main')

main.addEventListener('click', (e) => {
  if (e.target.id === 'add-pokemon') {
    const list = e.target.parentNode.children["list"]
    const trainerId = e.target.parentNode.dataset.id
    const trainerObj = allTrainers.find(trainer => trainer.id == trainerId)
    if(trainerObj.pokemons.length < 6){
      fetch(POKEMONS_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          'trainer_id': trainerId
        })
      }).then(res => res.json()).then(data => {
        const newPokemon = new Pokemon(data)
        trainerObj.pokemons.push(newPokemon)
        list.innerHTML += newPokemon.render()
      })
    }else{
      alert('Your team is full')
    }
  }else if(e.target.className === 'release'){
    const pokemonId = e.target.dataset.pokemonId
    fetch(`${POKEMONS_URL}/${pokemonId}`,{
      method: 'DELETE'
    })
    e.target.parentNode.remove()
  }
})



document.addEventListener('DOMContentLoaded', () => {
  fetch(TRAINERS_URL).then(res => res.json()).then(data => {
    data.forEach(trainer => {
      const trainerObj = new Trainer(trainer)
      main.innerHTML += trainerObj.renderCard()
    })
  })

})
