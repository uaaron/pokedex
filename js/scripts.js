
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
    
function listIterator(item) {
    if (item.height > 0.6) {
        document.write(`<p>${item.name} height: (${item.height}) - Wow, that's big!</p>`);
    } else {
        document.write(`<p>${item.name} height: (${item.height})</p>`);
    }
}

pokemonList.forEach(listIterator);