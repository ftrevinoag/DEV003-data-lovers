
export const filterByGeneration = (data, generation) => (data.filter((pokemon) => (
  pokemon.generation.name === generation))
); 


// Esta función sirve buscar pokemones por su nombre 
export const search = (data, inputText) => {
  const lengthText = inputText.length;
  return data.filter(
    (pokemon) => pokemon.name.slice(0, lengthText) === inputText
  )
};

// Esta función sirve para buscar el tipo de pokemon
export const filterByType = (data, typeChose) => {
  return data.filter(
    (pokemon) => pokemon.type.includes(typeChose)
  )
}

// Esta función ordena los pokemones de la 'A-Z', Z-A' y Default
export const order = (data, parameter) => {
  if(parameter === 'A-Z' || parameter === 'Z-A'){
    const sortedArray = data.slice().sort((a, b) => a.name > b.name ? 1 : -1 );
    return parameter === 'Z-A' ? sortedArray.reverse() : sortedArray
  } else { 
    return data
  }
};

// Esta función calcula el daño por segundo
export const dpsCalculate = (quick, pokemonType) => {
  let dps = 0;
  const baseDamage = Number(quick['base-damage']);
  const time = Number(quick['move-duration-seg']);
  dps = (baseDamage / time).toFixed(1);
  for (let i = 0; i < pokemonType.length; i += 1) {
    if (pokemonType[i] === quick.type) {
      let stab = 0;
      stab = baseDamage + ((20 * baseDamage) / 100);
      dps = (stab / time).toFixed(1);
    }
  }
  return dps;
};

// Esta función calcula la enegía por segundo
export const epsCalculate = (quick) => {
  const energy = Number(quick.energy);
  const time = Number(quick['move-duration-seg']);
  return (energy / time).toFixed(1);
};

    




