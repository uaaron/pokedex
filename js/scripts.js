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
    
for (let i = 0; i < pokemonList.length; i++) {
    if (pokemonList[i].height > 0.6) {
        document.write(`<p>${pokemonList[i].name} height: (${pokemonList[i].height}) - Wow, that's big!</p>`);
    } else {
        document.write(`<p>${pokemonList[i].name} height: (${pokemonList[i].height})</p>`);
    }
}