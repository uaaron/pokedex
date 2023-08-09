
let pokemonRepository = (function() {
    let pokemonList = [
        {
            name: "Bulbasaur",
            height: .7,
            type: ["grass", "poison"]
        }, 
        {
            name: "Charmander",
            height: .6,
            type: "fire"
        },
        {
            name: "Squirtle",
            height: .5,
            type: "water"
        }
    ];

    function add(pokemon) {
        if (typeof pokemon === 'object' && pokemon !== null) {
            pokemonList.push(pokemon);
        } else {
            console.error('Invalid input')
        }
    }

    function addListItem(pokemon) {
        let pokemonList = document.querySelector('ul');
        let listItem = document.createElement('li');
        let button = document.createElement('button');
        button.innerText = pokemon.name;
        button.classList.add('buttons');
        listItem.appendChild(button);
        pokemonList.appendChild(listItem);
        button.addEventListener('click', function () {
            showDetails(pokemon);
        });
    }

    function showDetails(pokemon) {
        console.log(pokemon);
    }

    function getAll() {
        return pokemonList;
    }

    return { 
        add: add,
        getAll: getAll,
        addListItem: addListItem
    };

})();
    
function pokemonIterator(item) {
    pokemonRepository.addListItem(item);
}

pokemonRepository.getAll().forEach(pokemonIterator);