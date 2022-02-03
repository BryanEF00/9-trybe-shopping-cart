const localStorageSimulator = require('../mocks/localStorageSimulator');
const getSavedCartItems = require('../helpers/getSavedCartItems');

localStorageSimulator('getItem');

describe('4 - Teste a função getSavedCartItems', () => {
  it('Testa se ao executar a função getSavedCartItems, o método localStorage.getItem é chamado', () => {
    getSavedCartItems();

    expect(localStorage.getItem).toHaveBeenCalled();
  });
  it('Testa se ao executar a função getSavedCartItems, o método localStorage.getItem é chamado corretamente', () => {
    getSavedCartItems();

    expect(localStorage.getItem).toHaveBeenCalledWith('cartItems');
  });
});
