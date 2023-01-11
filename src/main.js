import { filterByGeneration, search, order, dpsCalculate, epsCalculate } from './data.js';
import data from './data/pokemon/pokemon.js';

// Ser más específica con lo que se realiza y cambiar el nombre de la función //
// Agregar comentarios (no necesariamente tiene que ser por cada linea) // explicar la funcion del html que esta generando


// Esta función sirve para crear las tarjetas de Pokemon y lleva los botones que contienen dentro modals
const pokemonCardsHtml = (allPokemons) => {
  let dataPokemon = '';
  allPokemons.forEach((eachPokemon) => {
    const pokemon = `
    <div class="pokemon-card">
      <p class="pokemon-number left">${eachPokemon.num}</p>
      <img class="pokemon-image" src="${eachPokemon.img}">
      <p class="pokemon-name">${eachPokemon.name}</p> 
      <div class="button-container">
      <button name="${eachPokemon.name}" class="button-features">Features</button>
      <button name="${eachPokemon.name}" class="button-attacks">Attacks</button>
      </div>
    </div>`;
    dataPokemon += pokemon;
  });
  return dataPokemon;
};

// Esta función contiene el cuerpo del modal que está dentro del botón 'Features'
const modalFeatureslHtml = (pokemon) => {
  return `
  <p id="modal_close">x</p>
<section class="cards">
  <section class="pokemon-name2 green-bg">${pokemon.num} - ${pokemon.name}</section>
  <section class="info-container">
    <div class="sub-container-img">
      <p class="subtitle2">${pokemon['pokemon-rarity']}</p>
      <div class="pokemon-screen green-b">
        <img class="screen-img" src="${pokemon.img}">
      </div>
    </div>
    <div class="sub-container-text">
      <p class="subtitle2">generation</p>
      <p class="p-bottom">N° ${pokemon.generation.num.slice(10).toUpperCase()} - ${pokemon.generation.name}</p>
      <p class="subtitle2">type</p>
      <p class="p-bottom">${pokemon.type.join()}</p>
      <p class="subtitle2">size</p>
      <p >Height: ${pokemon.size.height}</p>
      <p >Weight: ${pokemon.size.weight}</p>
    </div>
  </section>
  <section class="info-container">
    <div class="column">
      <p class="subtitle2 h-stat">Encounter</p>
      <div class="number-data">
        <p>Base flee rate</p>
        <p class="num-cel">${(pokemon.encounter['base-flee-rate'] * 100).toFixed(1)}%</p>
      </div>
      <div class="number-data">
        <p>Base capture rate</p>
        <p class="num-cel">${(pokemon.encounter['base-capture-rate'] * 100).toFixed(1)}%</p>
      </div>
    </div>
    <div class="column">
      <p class="subtitle2 h-stat">Spawn chance</p>
      <p class="num-cel">${(pokemon['spawn-chance'] * 100).toFixed(2)}%</p>
    </div>
  
  `
}

// Esta función contiene el cuerpo del modal que está dentro del botón 'Features'
const modalAttacklHtml = (pokemon) => {
  return `
  <p id="modal_close">x</p>
      <section class="cards">
        <section class="pokemon-name2 red-bg">${pokemon.num} - ${pokemon.name}</section>
        <section class="info-container">
          <div class="sub-container-img">
            <div class="pokemon-screen red-b">
              <img class="screen-img" src="${pokemon.img}">
            </div>
          </div>
          <div class="stats-container">
            <p class="borderRows subtitle2">Stats</p>
            <div class= "name-stats">
              <p>Base attack: ${pokemon.stats['base-attack']}</p>
              <p>Base defense: ${pokemon.stats['base-defense']}</p>
              <p>Base stamina: ${pokemon.stats['base-stamina']}</p>
              <p>Max CP: ${pokemon.stats['max-cp']}</p>
              <p>Max HP: ${pokemon.stats['max-hp']}</p>
            </div>
          </div>
        </section>
        <section class="info-container">
          <div class="column2">
            <p class="borderRows subtitle2">Resistant</p>
            <p>${pokemon.resistant.join()}</p>
          </div>
          <div class="column2">
            <p class="borderRows subtitle2">Weakness</p>
            <p>${pokemon.weaknesses.join()}</p>
          </div>
        </section> 
      </section>  
      <table>
      <thead>
    <tr>
      <th>Name</th>
      <th>Type</th>
      <th>BD</th>
      <th>E</th>
      <th>MD</th>
      <th>DPS</th>
      <th>EPS</th>
    </tr>
  </thead> 
    <tbody>
    ${pokemon['special-attack'].map(function (attack) {
    return `
      <tr>
      <td>
      ${attack.name}
      </td>
      <td>
      ${attack.type}
      </td>
      <td>
      ${attack['base-damage']}
      </td>
      <td>
      ${attack.energy}
      </td>
      <td>
      ${attack['move-duration-seg']}
      </td>
      <td>
      ${dpsCalculate(attack, attack.type)}
      </td>
      <td>
      ${epsCalculate(attack)}
      </td>
      </tr>
      `
  })}
      </table>

  
  `

}

// Esta función crea el evento para el botón que se realizará a través de un click
const setupFeaturesBtnsEvents = (pokemonList) => {
  const buttonFeaturesArray = Array.from(document.getElementsByClassName("button-features"))
  buttonFeaturesArray.forEach(function (button) {
    button.addEventListener('click', function (event) {
      const pokemon = pokemonList.find(function (pokemon) {
        return pokemon.name === event.target.name
      })
      // Esta función crea el modal con el markup creado y también hacemos que el modal aparezca y se
      // cierre a través de un click
      const modal = document.getElementById('modal')
      modal.style.display = 'block'
      modal.innerHTML = modalFeatureslHtml(pokemon)
      document.getElementById('modal_close').addEventListener('click', function () {
        document.getElementById('modal').style.display = 'none'
      })
    })
  })
}


// Esta función crea el evento para el botón que se realizará a través de un click
const setupAttackBtnsEvents = (pokemonList) => {
  const buttonAttackArray = Array.from(document.getElementsByClassName("button-attacks"))
  buttonAttackArray.forEach(function (button) {
    button.addEventListener('click', function (event) {
      const pokemon = pokemonList.find(function (pokemon) {
        return pokemon.name === event.target.name
      })

      // Esta función crea el modal con el markup creado y también hacemos que el modal aparezca y se
      // cierre a través de un click
      const modal = document.getElementById('modal')
      modal.style.display = 'block'
      modal.innerHTML = modalAttacklHtml(pokemon)
      document.getElementById('modal_close').addEventListener('click', function () {
        document.getElementById('modal').style.display = 'none'
      })
    })
  })
};



// Esta función inserta las tarjetas y botones en section-content
const updateGenerationList = (pokemonList, sectionContent) => {
  sectionContent.innerHTML = '';
  const cardsContainer = document.createElement('div');
  cardsContainer.className = 'cards-distribution';
  // Creando e insertando cards de pokemones
  cardsContainer.innerHTML += pokemonCardsHtml(pokemonList);
  sectionContent.appendChild(cardsContainer);
  setupFeaturesBtnsEvents(pokemonList)
  setupAttackBtnsEvents(pokemonList)

};

// Se insertó dentro de éste window todas las funciones que quiero que estén presentes
// para cuando se termine de cargar el HTML
window.addEventListener('load', () => {
  const sectionContent = document.querySelector('.content');
  const kantoPokemons = filterByGeneration(data.pokemon, 'kanto')
  updateGenerationList(kantoPokemons, sectionContent);
  const searchInput = document.querySelector('#filter-search');
  setupSearchInputEvent(searchInput, sectionContent, data.pokemon)
  const selectionInput = document.querySelector('#selection');
  setupOrderListEvent(selectionInput, sectionContent, data.pokemon)
  const filter = document.getElementById('filter-by-type');
  setupFilterEvent(filter, sectionContent, data.pokemon)
});


// La función que sirve para buscar pokemones por tipo y que hará que la interfaz del usuario
// se actualice sólo con los pokemones del tipo seleccionado
const setupFilterEvent = (filter, sectionContent, pokemonList) => {
  filter.addEventListener('change', function (event) {
    const selectedTypePokemons = pokemonList.filter(function (pokemon) {
      return pokemon.type.includes(event.target.value.toLowerCase())
    })
    if (event.target.value === 'Default') {
      updateGenerationList(pokemonList, sectionContent)
    } else {
      updateGenerationList(selectedTypePokemons, sectionContent)
    }
  })
}

// La función que busca pokemones a través del input que el usuario ingrese en la interfaz
// Se modificará la interfaz del usuario de acuerdo a las lentras ingresadas
const setupSearchInputEvent = (searchInput, sectionContent, pokemonSearchList) => {
  searchInput.addEventListener('input', () => {
    const inputText = searchInput.value.toLowerCase();
    if (inputText.length > 0) {
      const result = search(pokemonSearchList, inputText);
      result.length > 0 ? updateGenerationList(result, sectionContent) : setupNoResultsList(sectionContent)
    } else {
      updateGenerationList(pokemonSearchList, sectionContent);
    }
  });
}


// La función que sirve para cuando el input del usuario no arroje ningún resultado 
const setupNoResultsList = (sectionContent) => {
  sectionContent.innerHTML = '';
  const cardsContainer = document.createElement('div');
  cardsContainer.className = 'cards-distribution';
  cardsContainer.innerHTML += ' Juguito de uwu ';
  sectionContent.appendChild(cardsContainer);
}

// La función que ordenará a los pokemones de acuerdo al input del usuario y actualizará la interfaz 
const setupOrderListEvent = (selectionInput, sectionContent, pokemonList) => {
  selectionInput.addEventListener('change', () => {
    const chosenOrder = selectionInput.value;
    const orderedPokemons = order(pokemonList, chosenOrder)
    updateGenerationList(orderedPokemons, sectionContent);
  });
}




