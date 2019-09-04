var pokemonRepository = (function () {

var apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

var repository = [];

  function addListItem(pokemon) {
    var listItem = $('<li class="list-group-item list-group-item-action" data-toggle="modal" data-target="#mymodal"></li>');
    var button = $('<button></button>');
    button.text(pokemon.name);
    button.addClass('btn');
    listItem.append(button);
    $pokemonList.append(listItem);
    listItem.click(function () {
    showDetails(pokemon);
    });
  }



  function add(pokemon) {
    repository.push(pokemon);
  }

  function getAll() {
    return repository;
  }

function loadList() {
  return $.ajax(apiUrl, {dataType: 'json' }).then(function(item) {
  $.each(item.results, function(index, item){
        var pokemon = {
          name: item.name,
          detailsUrl: item.url,
        };
        add(pokemon);
      });
    })
    .catch(function(e) {
      console.error(e);
  });
}

function loadDetails(item) {
  var url = item.detailsUrl;
  return $.ajax(url).then(function(details){
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.type = details.types.map(type => type.type.name);
})
  .catch(function(e) {
      console.error(e);
    });
}

function showDetails(item) {
  pokemonRepository.loadDetails(item).then(function () {
    //showModal(item);
    var modal = $('.modal-body');
    var name = $('.modal-header').text(item.name);
    var height = $('<p class="modal-body"></p>').text('Height: ' + item.height);
    var type = $('<p></p>').text('Type: ' + item.type);
    var image = $('<img>');
    image.attr('src', item.imageUrl);

    if(modal.children().length) {
      modal.children().remove();
    }

    modal.append(image)
         .append(height)
         .append(type);
  });
}

return {
  add: add,
  getAll: getAll,
  addListItem: addListItem,
  showDetails: showDetails,
  loadList: loadList,
  loadDetails: loadDetails,
};
})();

var $pokemonList = $('.pokemon-list');

 pokemonRepository.loadList().then(function() {

 	pokemonRepository.getAll().forEach(function(pokemon) {
 		pokemonRepository.addListItem(pokemon);
 	});

 });
