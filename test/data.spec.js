import { search, order, filterByGeneration, filterByType, dpsCalculate,  epsCalculate } from '../src/data.js';
import { data } from './testing-data'
import { dataCalculate } from './testing-data'


// Filter by generation
describe('filterByGeneration', () => {
  it('is a function', () => {
    expect(typeof filterByGeneration).toBe('function');
  });

  it('should return an empty array when search its not matching whith the entered letters', () => {
    expect(filterByGeneration(data, 'xxwe')).toEqual([]);
  });

  it('should return two specific pokemons', () => {
    const searchResult = filterByGeneration(data, 'johto')
    expect(searchResult.length).toEqual(2)
    expect(searchResult[0].name).toEqual('cleffa');
    expect(searchResult[1].name).toEqual('misdreavus');
  });

  it('should have all returned pokemons be from johto region only',()=>{
    const searchResult = filterByGeneration(data, 'johto')
    const regionsFound = searchResult.map(el => el.generation.name)
    const onlyUnique = regionsFound.filter((value, index, self) => {
      return self.indexOf(value) === index;
    })
    expect(onlyUnique).toEqual(['johto']);
  })
})


//Search
describe('search', () => {
  it('is a function', () => {
    expect(typeof search).toBe('function');
  });

  it('should return an empty array when search its not matching whith the entered letters', () => {
    expect(search(data, 'xxwe')).toEqual([]);
  });

  it('should return one specific pokemon for query "bul"', () => {
    const searchResult = search(data, 'bul')
    expect(searchResult.length).toEqual(1)
    expect(searchResult[0].name).toEqual('bulbasaur');
  });

});

// Alphabetical order
describe('order', () => {
  it('is a function', () => {
    expect(typeof order).toBe('function');
  });

  it('should return six specific pokemons in ascendent order for case "A-Z"', () => {
    const searchResult = order(data, 'A-Z')
    expect(searchResult.length).toEqual(6)
    expect(searchResult[0].name).toEqual('arbok'); 
    expect(searchResult[1].name).toEqual('bulbasaur'); 
    expect(searchResult[2].name).toEqual('charmeleon'); 
    expect(searchResult[3].name).toEqual('cleffa'); 
    expect(searchResult[4].name).toEqual('misdreavus'); 
    expect(searchResult[5].name).toEqual('poliwag'); 
  });

  it('should return the same array but reversed for cases "A-Z" and "Z-A"', () => {
    const resultAZ = order(data, 'A-Z')
    const resultZA = order(data, 'Z-A')
    expect(resultAZ).toEqual(resultZA.reverse());
  });

  it('should return data as default' , () => {
    const defaultOrder = order(data)
    expect(defaultOrder).toEqual(data);
  });


});

// Filter by type
describe('filterByType', () => {

  it('is a function', () => {
    expect(typeof filterByType).toBe('function');
  });

  it('should return an empty array when search its not matching whith the entered letters', () => {
    expect(filterByType(data, 'xxwe')).toEqual([]);
  });

  it('should return two specific pokemons', () => {
    const searchResult = filterByType(data, 'poison')
    expect(searchResult.length).toEqual(2)
    expect(searchResult[0].name).toEqual('bulbasaur');
    expect(searchResult[1].name).toEqual('arbok');
  });

  it('should have all returned pokemons be poison type',()=>{
    const searchResult = filterByType(data, 'poison')
    const poisonTypeFound = searchResult.map(el => el.type.includes('poison'))
    const onlyUnique = poisonTypeFound.filter((value, index, self) => {
      return self.indexOf(value) === index;
    })
    expect(onlyUnique).toEqual([true]);
  })
});


// Energy per second
it('is a function', () => {
  expect(typeof epsCalculate).toBe('function');
});

it('should return energy per second result of the selected pokemon', () => {
  expect(epsCalculate(dataCalculate)).toBe('10.0');
});


// Damage per second
it('is a function', () => {
  expect(typeof dpsCalculate).toBe('function');
});

it('should return damage per second result of the second selected pokemon', () => {
  expect(dpsCalculate(dataCalculate, ['fire', 'grass'])).toBe('12.0');
});

