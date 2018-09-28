allTrainers = [];
class Trainer {
  constructor(trainerObj){
    this.id = trainerObj.id;
    this.name = trainerObj.name;
    this.pokemons = trainerObj.pokemons;
    allTrainers.push(this);
  }

  render(){
    return `
    <div class="card" data-id=${this.id}><p>${this.name}</p>
    <button class="add-btn" data-trainer-id=${this.id}>Add Pokemon</button>
    <ul id="trainer-${this.id}">

    </ul>
    </div>
    `
  }

}
