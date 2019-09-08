var pokemonRepository = (function () {

var apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

var repository = [];

//fetch data from API
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

//create list items
  function addListItem(pokemon) {
    var listItem = $('<li class="pokemon-list_item list-group-item list-group-item-action text-left" data-toggle="modal" data-target="#mymodal"></li>');
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

//add list tiems to modal
function showDetails(item) {
  pokemonRepository.loadDetails(item).then(function () {
    var modal = $('.modal-body');
    var name = $('.modal-header').text(item.name);
    name.addClass('pokemon-name');
    var height = $('<p class="modal-body"></p><br>').text('height: ' + item.height);
    var type = $('<p></p>').text('type: ' + item.type);
    var image = $('<img class="pokemon-image">');
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

//search function
$(document).ready(function(){
  $('#pokemon-search').on('keyup', function(){
    var value = $(this).val().toLowerCase();
    $('.pokemon-list_item').filter(function(){
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
  });
});

var $pokemonList = $('.pokemon-list');

 pokemonRepository.loadList().then(function() {

 	pokemonRepository.getAll().forEach(function(pokemon) {
 		pokemonRepository.addListItem(pokemon);
 	});

 });
