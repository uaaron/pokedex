let pokemonRepository = (function () {
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

    // populate pokemonList array with pokemon objects containing name of pokemon and URL link to more info regarding specific pokemon.
    // use add() function to perform validation before pushing pokemon object to pokemonList
    function loadList() {
        return fetch(apiUrl).then(function (response) {
            return response.json();
        }).then(function (json) {
            json.results.forEach(function (item) {
                let pokemon = {
                    name: item.name,
                    detailsUrl: item.url
                };
                add(pokemon);
            });
        }).catch(function (e) {
            console.error(e);
        })
    }

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

    // will add the pokemon object to each individual list item and add the name of pokemon as the text of <li> and add to pokemonList <ul>
    function addListItem(pokemon) {
        let pokemonList = document.querySelector('ul');
        let listItem = document.createElement('li');
        let button = document.createElement('button');

        listItem.classList.add('list-group-item','bg-warning');

        button.innerText = pokemon.name;
        button.classList.add('btn', 'btn-primary', 'btn-lg', 'btn-block');
        button.setAttribute('data-toggle', 'modal');
        button.setAttribute('data-target', '#modal-container');

        listItem.appendChild(button);
        pokemonList.appendChild(listItem);

        button.addEventListener('click', function () {
            showDetails(pokemon);
        });
    }

    // fetches details from each pokemon's individual URL and loads them when showDetails is called
    function loadDetails(item) {
        let url = item.detailsUrl;
        return fetch(url).then(function (response) {
            return response.json();
        }).then(function (details) {
            item.imageUrlFront = details.sprites.front_default;
            item.imageUrlBack = details.sprites.back_default;
            item.height = details.height;
            item.types = details.types.map(function(type) {
                return type.type.name;
            });
        }).catch(function (e) {
            console.error(e);
        })
    }

    // after selected details have loaded the modal is revealed upon triggering event tied to list items
    function showDetails(pokemon) {
        loadDetails(pokemon).then(() => {
            pokemonModal(pokemon);
        })
    }

    function pokemonModal(pokemon) {
        let modalBody = $('.modal-body');
        let modalTitle = $('.modal-title');

        //clear existing modal content
        modalTitle.empty();
        modalBody.empty();

        let pokemonName = $('<h1>' + pokemon.name + '</h1>');
        let pokemonImgFront = $('<img class="modal-img" style="width:50%">');
        pokemonImgFront.attr("src", pokemon.imageUrlFront);
        let pokemonImgBack = $('<img class="modal-img" style="width:50%">')
        pokemonImgBack.attr("src", pokemon.imageUrlBack);
        let pokemonHeight = $('<p>' + 'Height: ' + pokemon.height + '</p>');
        let pokemonTypes = $('<p>' + 'Types: ' + pokemon.types.join(", ") + '</p>');

        modalTitle.append(pokemonName);
        modalBody.append(pokemonImgFront);
        modalBody.append(pokemonImgBack);
        modalBody.append(pokemonHeight);
        modalBody.append(pokemonTypes);
    }

    return {
        add: add,
        getAll: getAll,
        loadList: loadList,
        loadDetails: loadDetails,
        addListItem: addListItem
    };

})();

pokemonRepository.loadList().then(function () {
    pokemonRepository.getAll().forEach(function (pokemon) {
        pokemonRepository.addListItem(pokemon);
    });
});