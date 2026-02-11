let urlAnterior = "";
let urlproximo = "";

async function buscarPokemons(url = "https://pokeapi.co/api/v2/pokemon") {
    carregando(true)
    let anterior = document.querySelector("#anterior");
    const request = await fetch(url);

    if (!request.ok) {
        alert("Houve um problema com dados.");
        return
    }

    carregando(false)

    const response = await request.json();
    urlAnterior = response.previous;
    urlproximo = response.next;

    if (!urlAnterior) {
        anterior.setAttribute("disabled", true);
    } else {
        anterior.removeAttribute("disabled");
    }

    carregarPokemon(response.results);

}

async function buscarPokemonsPortipo(url) {
    carregando(true)
    const request = await fetch(url);

    if (!request.ok) {
        alert("Houve um problema com dados.");
        return
    }

    carregando(false)
    const response = await request.json();

    carregarPokemon(response.pokemon, true);
}

async function buscarUmPokemon() {
    carregando(true)
    let nome = document.querySelector("#nome").value;
    const request = await fetch(`https://pokeapi.co/api/v2/pokemon/${nome}`);

    if (!request.ok) {
        alert("Houve um problema com dados.");
        return
    }

    carregando(false)
    const response = await request.json();

    carregarUmPokemon(response);
}

async function buscarTipos() {

    let tipos = document.querySelector("#tipos");
    const request = await fetch("https://pokeapi.co/api/v2/type/");

    if (!request.ok) {
        alert("Houve um problema com dados.");
        return
    }

    const response = await request.json();
    response.results.map(tipo => {
        tipos.innerHTML += `
            <option value="${tipo.url}">${tipo.name}</option>
        `;
    })
}

async function carregarPokemon(arrayDePokemons, buscaPorTipo = false) {
    let grade = document.querySelector("#grade");

    grade.innerHTML = "";

    const promises = arrayDePokemons.map(async (pokemon) => {
        let request = await fetch(buscaPorTipo ? pokemon.pokemon.url : pokemon.url);

        if (!request.ok) {
            alert("Erro na requisição");
            return;
        }

        let response = await request.json();

        return `
            <div class="bg-white rounded-xl p-4 flex flex-col items-center">
                <img src="${response.sprites.front_default}" alt="" class="w-40">
                <h6 class="text-lg font-bold">${buscaPorTipo ? pokemon.pokemon.name : pokemon.name}</h6>
                <div>
                    ${response.types.map(tipo => `<div>${tipo.type.name}</div>`)}
                </div>
            </div>
        `;
    });

    const results = await Promise.all(promises);
    grade.innerHTML += results.join("");
}

async function carregarUmPokemon(pokemon) {
    let grade = document.querySelector("#grade");

    grade.innerHTML = "";
    grade.innerHTML += `
        <div class="bg-white rounded-xl p-4 flex flex-col items-center">
                <img src="${pokemon.sprites.front_default}" alt="" class="w-40">
                <h6 class="text-lg font-bold">${pokemon.name}</h6>
                <div>
                    ${pokemon.types.map(tipo => `<div>${tipo.type.name}</div>`)}
                </div>
            </div>
    `;
}

function carregando(status) {
    let loading = document.querySelector("#loading");
    if (status) {
        loading.classList.add("flex");
        loading.classList.remove("hidden");
    } else {
        loading.classList.add("hidden");
        loading.classList.remove("flex");
    }
}

buscarPokemons();
buscarTipos();