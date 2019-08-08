var repository = (function () {

var apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

var repository = [];

  function add(pokemon) {
    repository.push(pokemon);
  }

  function getAll() {
    return repository;
  }

var pokemonRepository = (function () {

var apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
var repository = [];


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


//Original js

/*  function addListItem(pokemon) {
    var listItem = document.createElement('li');
    var button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add('button');
    listItem.appendChild(button);
    $pokemonList.appendChild(listItem);
    listItem.addEventListener('click', function () {
    showDetails(pokemon);
    });
  }}
  */

  //JQuery
  function addListItem(pokemon) {
  var $pokemonList = $('.pokemon-list');
  var listItem = $('<li>' + pokemon.name + '</li>');
  var button = $('<button class="button">' + pokemon.name + '</button'>);
  listItem.append(button);
  $pokemonList.append(listItem);
  $listItem.on('click', function(){
    showDetails(pokemon);
  });


function showDetails(item) {
  pokemonRepository.loadDetails(item).then(function () {
    showModal(item);
  });
}


function showModal(item) {
var $modalContainer = $('#modal-container');

// clear all existing modal content
$(#modalContainer).html = '';

// create div element in DOM
var modal = $('<div class= "modal-container"></div>');


//add closing button
var closeButtonElement = $('<button class= "modal-close">close</button>')

closeButtonElement.addEventListener('click', e => hideModal());

// modal name element
var nameElement = $('<h1>' + item.name + '</h1>')


// modal image
var imageElement = $('<img class= "modal-img">')
imageElement.attr('src', item.imageUrl);

// modal height element
var heightElement = $('<p> height: ' + item.height + '</p>');

var typeElement = $('<p> type: ' + item. type + '</p>');

// appending modal content
modal.append(closeButtonElement);
     .append(nameElement);
     .append(imageElement);
     .append(heightElement);
     .append(typeElement);

$modalContainer.append(modal);

$modalContainer.addClass('is-visible');
}

//hide modal with close button
function hideModal() {
  var $modalContainer = $('#modal-container');
  var child = $modalContainer.last();
  while (child) {
    $modalContainer.empty(child);
    child = $modalContainer.last();
  }
  $modalContainer.removeClass('is-visible');
}

// hide modal with ESC
window.addEventListener('keydown', e => {
  var $modalContainer = $('#modal-container');
  if (
    e.key === 'Escape' && $modalContainer.classList.contains('is-visible')
  ) {
    hideModal();
  }
});

// hide modal by clicking outside
var $modalContainer = $('#modal-container');
$modalContainer.addEventListener('click', e => {
  var target = e.target;
  if (target === $modalContainer) {
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

//var $pokemonList = document.querySelector('.pokemon-list');

 pokemonRepository.loadList().then(function() {

 	pokemonRepository.getAll().forEach(function(pokemon) {
 		pokemonRepository.addListItem(pokemon);
 	});
 });

















  });
