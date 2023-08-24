let pokemonRepository = (function() {
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

    // populate pokemonList array with pokemon objects containing name of pokemon and URL link to more info regarding specific pokemon.
    // use add() function to perform validation before pushing pokemon object to pokemonList
    function loadList() {
        return fetch(apiUrl).then(function (response) {
            return response.json();
        }).then(function(json) {
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
        button.innerText = pokemon.name;
        button.classList.add('buttons');
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
        }).then(function(details) {
            item.imageUrl = details.sprites.front_default;
            item.height = details.height;
            item.types = details.types;
        }).catch(function (e) {
            console.error(e);
        })
    }

    //

    // listener event that is executed when any of the list items are clicked
    // function showDetails(pokemon) {
    //     loadDetails(pokemon).then(function (){
    //         let modalContainer = document.querySelector('#modal-container');
    //         modalContainer.innerHTML = '';

    //         let modal = document.createElement('div');
    //         modal.classList.add('modal');

    //         let closeButtonElement = document.createElement('button');
    //         closeButtonElement.classList.add('modal-close');
    //         closeButtonElement.innerText = 'Close';
    //         closeButtonElement.addEventListener('click', hideModal);

    //         let pokemonName = document.createElement('h1');
    //         pokemonName.innerText = pokemon.name;

    //         let pokemonHeight = document.createElement('p');
    //         pokemonHeight.innerText = `Height: ${pokemon.height}`;

    //         let pokemonImg = document.createElement('img');
    //         pokemonImg.src = pokemon.imageUrl;

    //         modal.appendChild(closeButtonElement);
    //         modal.appendChild(pokemonName);
    //         modal.appendChild(pokemonHeight);
    //         modal.appendChild(pokemonImg);
    //         modalContainer.appendChild(modal);

    //         modalContainer.classList.add('is-visible');

    //         modalContainer.addEventListener('click', (e) => {
    //             let target = e.target;
    //             if(target === modalContainer) {
    //                 hideModal();
    //             }
    //         })

    //         window.addEventListener('keydown', (e) => {
    //             let modalContainer = document.querySelector('#modal-container');
    //             if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
    //                 hideModal();
    //             }
    //         })

    //     })
    //     function hideModal() {
    //         let modalContainer = document.querySelector('#modal-container');
    //         modalContainer.classList.remove('is-visible');
    //     }


    // }

        function showDetails(pokemon) {
            loadDetails(pokemon).then(() => {
                pokemonModal(pokemon);
            })
        }
        function pokemonModal(pokemon) {
            let modalContainer = document.querySelector('#modal-container');
            modalContainer.innerHTML = '';

            let modal = document.createElement('div');
            modal.classList.add('modal');

            let closeButtonElement = document.createElement('button');
            closeButtonElement.classList.add('modal-close');
            closeButtonElement.innerText = 'Close';
            // closeButtonElement.addEventListener('click', hideModal);

            let pokemonName = document.createElement('h1');
            pokemonName.innerText = pokemon.name;

            let pokemonHeight = document.createElement('p');
            pokemonHeight.innerText = `Height: ${pokemon.height}`;

            let pokemonImg = document.createElement('img');
            pokemonImg.src = pokemon.imageUrl;

            modal.appendChild(closeButtonElement);
            modal.appendChild(pokemonName);
            modal.appendChild(pokemonHeight);
            modal.appendChild(pokemonImg);
            modalContainer.appendChild(modal);

            modalContainer.classList.add('is-visible');

            // modalContainer.addEventListener('click', (e) => {
            //     let target = e.target;
            //     if(target === modalContainer) {
            //         hideModal();
            //     }
            // })

            // window.addEventListener('keydown', (e) => {
            //     let modalContainer = document.querySelector('#modal-container');
            //     if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
            //         hideModal();
            //     }
            // })
        }


    return { 
        add: add,
        getAll: getAll,
        loadList: loadList,
        loadDetails: loadDetails,
        addListItem: addListItem
    };

})();

pokemonRepository.loadList().then(function() {
    pokemonRepository.getAll().forEach(function(pokemon){
      pokemonRepository.addListItem(pokemon);
    });
  });