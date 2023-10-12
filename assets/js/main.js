const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')
const popUpButton = document.getElementById('popup')

const maxRecords = 151
const limit = 10
let offset = 0;

var pokemonAux = [];

function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}"
                     alt="${pokemon.name}"
                     onClick="abrir(${pokemon.number})"
                     onClick="fechar()">
            </div>
            
            </div>
        </li>
    `
}

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        pokemonAux = pokemons;
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
    })
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})

function abrir(num) {
    popUpButton.style.display = "block";
    var aux = document.getElementById("detalhesHabilidades")
    pokemonAux.filter((el) => {
        if(el.number == num){
            aux.innerHTML = `<span class="stats">Hablidedes ${el.name}:</span><br>
                        HP:              ${el.hp} <br>
                        Attack:          ${el.attack} <br>
                        Defense:         ${el.defense} <br>
                        Special-Attack:  ${el.specialAttack} <br>
                        Special-Defense: ${el.specialDefense} <br>
                        Speed:           ${el.speed} <br>`
        }
    }
    )
}           

function fechar() {
    popUpButton.style.display = "none";
}