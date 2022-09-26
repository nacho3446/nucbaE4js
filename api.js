const baseURL = `https://pokeapi.co/api/v2/pokemon/`

const requestAPI = async(pokemon) =>{
    const conexion = await fetch(baseURL + pokemon)
    .then(Resolve=>Resolve.json())
    .catch(Reject=>console.log(Reject));
    return conexion;
}