
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

    function getAll() {
        return pokemonList;
    }

    return { 
        add: add,
        getAll: getAll
    };

})();
    
function listIterator(item) {
    if (item.height > 0.6) {
        document.write(`<p>${item.name} height: (${item.height}) - Wow, that's big!</p>`);
    } else {
        document.write(`<p>${item.name} height: (${item.height})</p>`);
    }
}

pokemonRepository.getAll().forEach(listIterator);