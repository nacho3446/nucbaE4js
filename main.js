const form = document.getElementById('form');
const enviar = document.getElementById('enviar');
const card_container = document.querySelector('.card_container');




//variables contador
const incrementar = document.getElementById('incrementar');
const decrementar = document.getElementById('decrementar');
const valor = document.getElementById('valor');
const error = document.querySelector('.error_cero_card');
const igualError = document.querySelector('.error_igual_card');
const inicio = document.querySelector('.inicio');
 // -------------------------------------------------------------



 let kokemones = [];
 let contador = 0;
 
 
 
 
 //contador
 const aumentar = () =>{
     contador++
     if (contador > 905){
        return contador = 905;
     }
     valor.textContent = contador;
    
 }
 const reducir = () =>{
     contador--
     if(contador < 0){
         return contador = 0;
     }
     return valor.textContent = contador
 }
 
 //ERRORES 1
 const submitBtn = (e) =>{
     e.preventDefault();
 
     if(contador === 0){
         error.style.display = 'block';
         inicio.style.display = 'none';
         return;
 }
     else{
         error.style.display = 'none';
     }
 }
 //-------------------------------------------------------------------
 
 const searchPokemon = async(e) =>{
     e.preventDefault(); //cancela la recarga al interactuar con el input
 
     const inputValue = contador; // guarda el valor del input
     
     const pokemonArray = await requestAPI(inputValue) //espera la respuesta de la API
     console.log(pokemonArray)
 
     //ERRORES 2
     if(inputValue === 0){
        igualError.style.display = 'none';
        card_container.innerHTML = '';
        return;
     }
  
      if(kokemones.some(kokemon => kokemon.id === pokemonArray.id)){
         igualError.style.display = 'block' //error de id =
         inicio.style.display = 'none';
 return;
     }else{
         igualError.style.display = 'none'
         inicio.style.display = 'none';
         kokemones = [pokemonArray]
     }
 //------------------------------------------------------------------------------
 
     renderCardHTML (kokemones)
 }
 
 
 const createCard = (array) =>{
     return `<div class="card">
                      <h3 class="pokemonName">${array.name}</h3>
                      <img src="${array.sprites.other.dream_world.front_default}">
                <div class="stats">
                      <p class = "valores">Type: ${array.types[0].type.name}</p>
                      <p class = "valores"><i class="fa-solid fa-heart"></i> ${array.stats[0].base_stat}</p>
                      <p class = "valores"><i class="fa-sharp fa-solid fa-burst"></i> ${array.stats[1].base_stat}</p>
                      <p class = "valores"><i class="fa-sharp fa-solid fa-shield"></i> ${array.stats[2].base_stat}</p>
                </div>
            </div>`
 }
 
 const renderCardHTML = (kokemones) =>{
     card_container.innerHTML = kokemones.map(card => createCard(card))
 }
 
 
 
 
 const init = () =>{
     inicio.style.display = 'block';
     form.addEventListener('submit', searchPokemon);
     incrementar.addEventListener('click', aumentar);
     decrementar.addEventListener('click', reducir);
     form.addEventListener('submit', submitBtn);
 }
 init();
 