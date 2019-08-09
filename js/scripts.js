var pokemonRepository = (function () {

var apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

var repository = [];

  function addListItem(pokemon) {
    var listItem = $('<li></li>');
    var button = $('<button></button>');
    button.text(pokemon.name);
    button.addClass('button');
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
    showModal(item);
  });
}

function showModal(item) {
var $modalContainer = $('#modal-container');

// clear all existing modal content
$modalContainer.html('');

// create div element in DOM
var modal = $('<div></div>');
//add class
modal.addClass('modal');

//add closing button
var closeButtonElement = $('<button></button>');
closeButtonElement.addClass('modal-close');
closeButtonElement.text('Close');
closeButtonElement.click( () => hideModal());



// modal name element
var nameElement = $('<h1></h1>');
nameElement.text(item.name);

// modal image
var imageElement = $('<img></img>');
imageElement.addClass('modal-img');
imageElement.attr('src', item.imageUrl);


// modal height element
var heightElement = $('<p></p>');
heightElement.text('height: ' + item.height);

var typeElement = $('<p></p>');
typeElement.text('type: ' + item.type);

// appending modal content
modal.append(closeButtonElement);
modal.append(nameElement);
modal.append(imageElement);
modal.append(heightElement);
modal.append(typeElement);
$modalContainer.append(modal);

$modalContainer.addClass('is-visible');
}

//hide modal with close button
  function hideModal() {
    var $modalContainer = $('#modal-container');
    $modalContainer.removeClass('is-visible')
  }

// hide modal with ESC
window.addEventListener('keydown', e => {
  var $modalContainer = $('#modal-container')[0];
  if (
    e.key === 'Escape' && $modalContainer.classList.contains('is-visible')
  ) {
    hideModal();
  }
});

// hide modal by clicking outside
  var $modalContainer = $('#modal-container')[0];
  $modalContainer.click( e => {
    var target = e.target;
    if (target === $modalContainer[0]) {
      hideModal();
    }
  });


return {
  add: add,
  getAll: getAll,
  addListItem: addListItem,
  showDetails: showDetails,
  loadList: loadList,
  loadDetails: loadDetails,
  showModal: showModal,
  hideModal: hideModal,
};
})();

var $pokemonList = $('.pokemon-list');

 pokemonRepository.loadList().then(function() {

 	pokemonRepository.getAll().forEach(function(pokemon) {
 		pokemonRepository.addListItem(pokemon);
 	});

 });
