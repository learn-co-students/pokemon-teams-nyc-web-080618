const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
document.addEventListener("DOMContentLoaded",()=>{
  const main=document.getElementsByTagName('main')[0]
   fetch(`${TRAINERS_URL}`)
   .then(res=>res.json())
   .then(data=>{
     data.forEach(obj=>new Trainer(obj))
     main.innerHTML=Trainer.render_all()
   })

   main.addEventListener('click',e=>{
      if (e.target.tagName==="BUTTON") {
         if (e.target.className=="add") {
           const trainer=Trainer.find(e.target.dataset.trainerId)
           if (trainer.pokemons.length<6) {
             fetch(`${POKEMONS_URL}`,{
               method:"POST",
               headers:{
                 'Accept':'application/json',
                 'Content-Type':'application/json'
               },
               body:JSON.stringify({trainer_id:trainer.id})
             }).then(res=>res.json())
             .then(data=>{
               console.log(data);
               trainer.pokemons.push(data)
               main.innerHTML=Trainer.render_all()
             })
           }//add new pokemon

         }else if (e.target.className=="release") {
           const trainer=Trainer.find(e.target.dataset.id)
           const pokeId=e.target.dataset.pokemonId
           fetch(`${POKEMONS_URL}/${parseInt(pokeId)}`,{
             method:"DELETE"
           }).then(res=>res.json())
           .then(data=>{
             trainer.pokemons=trainer.pokemons.filter(poke=>poke.id!=data.id)
             main.innerHTML=Trainer.render_all()
           })
         }//release poke
      }
   })
})
