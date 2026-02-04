

async function buscarPokemons(){
    const request = await fetch("https://pokeapi.co/api/v2/pokemon");
    
    if(!request.ok){
        alert("Houve um problema com dados.");
        return
    }

    const response = await request.json();
    console.log(response.results);
    

}

buscarPokemons();