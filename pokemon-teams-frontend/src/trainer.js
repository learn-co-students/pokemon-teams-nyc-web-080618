const Trainer=(()=>{
    const list=[]
    return class  {
      constructor(obj) {
        this.id=obj.id
        this.name=obj.name
        this.pokemons=obj.pokemons
        list.push(this)
      }

    static render_all(){
      return list.map(trainer=>{
        const pokemon_list=trainer.pokemons.map(pokemon=>{
          return `<li>${pokemon.nickname} (${pokemon.species}) <button class="release" data-id="${trainer.id}" data-pokemon-id="${pokemon.id}">Release</button></li>`
        }).join("")
        return `<div class="card" data-id="${trainer.id}"><p>${trainer.name}</p>
          <button class="add" data-trainer-id="${trainer.id}">Add Pokemon</button>
          <ul>
            ${pokemon_list}
          </ul>
        </div>`
      }).join("")
    }

    static find(id){
      return list.find(trainer=>trainer.id==id)
    }
    }
}
)()
